#!/usr/bin/env node
/**
 * Screenshot a page with headless Chrome over the DevTools Protocol.
 * Emulates real device metrics (so 400px is really 400px), waits for fonts and
 * the load sequence, captures fold and full page, and reports horizontal
 * overflow. Node 22+ only (built-in fetch and WebSocket); no dependencies.
 *
 * Usage: node scripts/shots.mjs <url> <outdir> <name> [--reduced] [--only=desktop|mobile] [--segments=<px>] [--eval=<js>] [--settle=<ms>]
 * --settle overrides the wait after fonts are ready (default 2800ms), e.g. to catch a load sequence mid-flight.
 * --eval runs a JS expression after load (for example to scroll a strip) before capturing.
 * --segments also writes exact viewport-width slices of the page, <px> tall, for review.
 * Exit code 2 when any viewport scrolls horizontally.
 */
import { spawn } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const [url, outdir = "shots", name = "page", ...flags] = process.argv.slice(2);
if (!url) {
  console.error("usage: node scripts/shots.mjs <url> <outdir> <name> [--reduced] [--only=desktop|mobile]");
  process.exit(1);
}
const reduced = flags.includes("--reduced");
const only = flags.find((f) => f.startsWith("--only="))?.split("=")[1];
const segments = Number(flags.find((f) => f.startsWith("--segments="))?.split("=")[1] ?? 0);
const evalExpr = flags.find((f) => f.startsWith("--eval="))?.slice("--eval=".length);
const settle = Number(flags.find((f) => f.startsWith("--settle="))?.split("=")[1] ?? 2800);
const MAX_HEIGHT = 16000;

const desktopWidth = Number(flags.find((f) => f.startsWith("--desktop-width="))?.split("=")[1] ?? 1440);
const mobileWidth = Number(flags.find((f) => f.startsWith("--mobile-width="))?.split("=")[1] ?? 400);
const VIEWPORTS = [
  { key: "desktop", width: desktopWidth, height: 900, mobile: false },
  { key: "mobile", width: mobileWidth, height: 860, mobile: true },
].filter((v) => !only || v.key === only);

const port = 9300 + Math.floor(Math.random() * 500);
const profile = `/tmp/hrm-shots-${port}`;
const chrome = spawn(
  CHROME,
  ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--no-first-run", `--remote-debugging-port=${port}`, `--user-data-dir=${profile}`, "about:blank"],
  { stdio: "ignore" },
);

async function waitForChrome() {
  for (let i = 0; i < 100; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${port}/json/version`);
      if (r.ok) return;
    } catch {}
    await sleep(100);
  }
  throw new Error("Chrome did not start");
}

class Session {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.waiters = new Map();
    ws.addEventListener("message", (m) => {
      const msg = JSON.parse(m.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        if (msg.error) reject(new Error(`${msg.error.message}`));
        else resolve(msg.result);
      } else if (msg.method && this.waiters.has(msg.method)) {
        const w = this.waiters.get(msg.method);
        this.waiters.delete(msg.method);
        w(msg.params);
      }
    });
  }
  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }
  once(method, ms = 20000) {
    return Promise.race([
      new Promise((resolve) => this.waiters.set(method, resolve)),
      sleep(ms).then(() => {
        throw new Error(`timeout waiting for ${method}`);
      }),
    ]);
  }
  async eval(expression) {
    const r = await this.send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (r.exceptionDetails) throw new Error(r.exceptionDetails.text);
    return r.result.value;
  }
}

async function openPage() {
  const r = await fetch(`http://127.0.0.1:${port}/json/new?about:blank`, { method: "PUT" });
  const target = await r.json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.addEventListener("open", res);
    ws.addEventListener("error", rej);
  });
  return { session: new Session(ws), close: () => fetch(`http://127.0.0.1:${port}/json/close/${target.id}`).catch(() => {}) };
}

async function shoot(vp) {
  const { session: s, close } = await openPage();
  await s.send("Page.enable");
  await s.send("Runtime.enable");
  await s.send("Emulation.setDeviceMetricsOverride", { width: vp.width, height: vp.height, deviceScaleFactor: 1, mobile: vp.mobile });
  if (vp.mobile) await s.send("Emulation.setTouchEmulationEnabled", { enabled: true });
  if (reduced) await s.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-motion", value: "reduce" }] });
  const loaded = s.once("Page.loadEventFired");
  await s.send("Page.navigate", { url });
  await loaded;
  // Fonts, then the ~2.4s load sequence, then a settle.
  await s.eval(`document.fonts.ready.then(() => new Promise(r => setTimeout(r, ${settle})))`);
  if (evalExpr) {
    const out = await s.eval(evalExpr);
    console.log(`eval: ${JSON.stringify(out)}`);
    await sleep(600);
  }
  const m = await s.eval(
    "({ innerWidth, clientWidth: document.documentElement.clientWidth, scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight, reduced: matchMedia('(prefers-reduced-motion: reduce)').matches })",
  );
  const suffix = reduced ? "-reduced" : "";
  const fold = await s.send("Page.captureScreenshot", { format: "png" });
  writeFileSync(`${outdir}/${name}-${vp.key}${suffix}-fold.png`, Buffer.from(fold.data, "base64"));
  const height = Math.min(m.scrollHeight, MAX_HEIGHT);
  const full = await s.send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: { x: 0, y: 0, width: vp.width, height, scale: 1 },
  });
  writeFileSync(`${outdir}/${name}-${vp.key}${suffix}-full.png`, Buffer.from(full.data, "base64"));
  if (segments > 0) {
    for (let i = 0, y = 0; y < m.scrollHeight; i++, y += segments) {
      const h = Math.min(segments, m.scrollHeight - y);
      const seg = await s.send("Page.captureScreenshot", { format: "png", captureBeyondViewport: true, clip: { x: 0, y, width: vp.width, height: h, scale: 1 } });
      writeFileSync(`${outdir}/${name}-${vp.key}${suffix}-s${i}.png`, Buffer.from(seg.data, "base64"));
    }
  }
  const overflow = m.scrollWidth > m.clientWidth;
  console.log(
    `${vp.key}${suffix}: viewport ${m.innerWidth}px, page ${m.scrollHeight}px tall${height < m.scrollHeight ? ` (captured ${height})` : ""}, reduced-motion=${m.reduced}, ${
      overflow ? `HORIZONTAL OVERFLOW ${m.scrollWidth}px > ${m.clientWidth}px` : "no horizontal overflow"
    }`,
  );
  await close();
  return overflow;
}

mkdirSync(outdir, { recursive: true });
let anyOverflow = false;
try {
  await waitForChrome();
  for (const vp of VIEWPORTS) anyOverflow = (await shoot(vp)) || anyOverflow;
} finally {
  const exited = new Promise((r) => chrome.once("exit", r));
  chrome.kill();
  await Promise.race([exited, sleep(3000)]);
  rmSync(profile, { recursive: true, force: true, maxRetries: 5, retryDelay: 200 });
}
process.exit(anyOverflow ? 2 : 0);
