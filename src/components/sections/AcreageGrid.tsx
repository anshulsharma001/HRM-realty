"use client";

import { useEffect, useRef } from "react";
import { Prose } from "@/components/primitives/Prose";
import { FOUNDER } from "@/content";

const COLS = 40;
const ROWS = 25;
const TOTAL = COLS * ROWS; // 1,000 squares for 1,000 acres

/** Deterministic shuffle so the scrubbed fill (later) always follows the same order. */
function order(seed = 1994): number[] {
  const idx = Array.from({ length: TOTAL }, (_, i) => i);
  let s = seed >>> 0;
  const rand = () => {
    s += 0x6d2b79f5;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t ^= t + Math.imul(t ^ (t >>> 7), 61 | t);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  for (let i = idx.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [idx[i], idx[j]] = [idx[j], idx[i]];
  }
  return idx;
}

/**
 * 1,000 squares on a canvas (not 1,000 DOM nodes). `fill` is the fraction
 * drawn; static at 1 for this pass, driven by scroll in the motion pass.
 */
export function AcreageGrid({ fill = 1 }: { fill?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const sequence = order();

    const draw = () => {
      const cssWidth = canvas.clientWidth;
      const gap = Math.max(1, Math.round(cssWidth / 400));
      const cell = (cssWidth - gap * (COLS - 1)) / COLS;
      const cssHeight = Math.round(cell * ROWS + gap * (ROWS - 1));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(cssWidth * dpr);
      canvas.height = Math.round(cssHeight * dpr);
      canvas.style.height = `${cssHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssWidth, cssHeight);

      const styles = getComputedStyle(canvas);
      const ink = styles.getPropertyValue("--color-steel-dk").trim() || "#333B42";
      const faint = styles.getPropertyValue("--color-rule").trim() || "rgba(18,16,13,0.16)";
      const count = Math.round(Math.max(0, Math.min(1, fill)) * TOTAL);

      ctx.strokeStyle = faint;
      ctx.lineWidth = 1;
      for (let i = 0; i < TOTAL; i++) {
        const x = (i % COLS) * (cell + gap);
        const y = Math.floor(i / COLS) * (cell + gap);
        ctx.strokeRect(x + 0.5, y + 0.5, cell - 1, cell - 1);
      }
      ctx.fillStyle = ink;
      for (let k = 0; k < count; k++) {
        const i = sequence[k];
        const x = (i % COLS) * (cell + gap);
        const y = Math.floor(i / COLS) * (cell + gap);
        ctx.fillRect(x, y, cell, cell);
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(canvas);
    return () => ro.disconnect();
  }, [fill]);

  return (
    <section aria-labelledby="impact" className="mt-14 lg:mt-20">
      <h2 id="impact" className="type-h2">
        {FOUNDER.impact.heading}
      </h2>
      <canvas ref={canvasRef} className="mt-8 block w-full" role="img" aria-label={FOUNDER.impact.paragraphs[0]} />
      <Prose paragraphs={FOUNDER.impact.paragraphs} size="lead" className="mt-6" />
    </section>
  );
}
