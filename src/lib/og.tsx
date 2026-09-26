import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SITE } from "@/content";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

const PAPER = "#E4E1D6";
const INK = "#12100D";
const STEEL = "#56606A";
const RULE = "rgba(18,16,13,0.16)";

async function fonts() {
  const dir = join(process.cwd(), "src/fonts/og");
  const [display, text] = await Promise.all([readFile(join(dir, "Fraunces-Display.ttf")), readFile(join(dir, "Switzer-Regular.ttf"))]);
  return [
    { name: "Fraunces", data: display, style: "normal" as const, weight: 400 as const },
    { name: "Switzer", data: text, style: "normal" as const, weight: 400 as const },
  ];
}

/** The client's mark as a data URL; the OG renderer cannot fetch relative paths. */
async function markDataUrl() {
  const png = await readFile(join(process.cwd(), "public/brand/hrm-mark-dark.png"));
  return `data:image/png;base64,${png.toString("base64")}`;
}

/** Branded Open Graph card: survey sheet, rule, title in Fraunces, one line beneath. */
export async function ogCard({ title, subtitle, footer = SITE.tagline }: { title: string; subtitle?: string; footer?: string | null }) {
  const long = title.length > 40;
  const [fontData, mark] = await Promise.all([fonts(), markDataUrl()]);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px 56px",
          background: PAPER,
          color: INK,
          fontFamily: "Switzer",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 22, color: STEEL }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={mark} alt="" width={140} height={40} style={{ width: 140, height: 40 }} />
          <span>Realty</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ width: "100%", height: 1, background: RULE }} />
          <div style={{ fontFamily: "Fraunces", fontSize: long ? 64 : 84, lineHeight: 1.02, letterSpacing: "-0.015em", maxWidth: 1000 }}>{title}</div>
          {subtitle ? <div style={{ fontSize: 30, color: STEEL, maxWidth: 900, lineHeight: 1.3 }}>{subtitle}</div> : null}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 20, color: STEEL }}>
          <span>{footer ?? ""}</span>
          <span style={{ display: "flex", gap: 8 }}>
            {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
              <span key={i} style={{ width: 1, height: i % 4 === 0 ? 16 : 8, background: STEEL, alignSelf: "flex-end" }} />
            ))}
          </span>
        </div>
      </div>
    ),
    { ...OG_SIZE, fonts: fontData },
  );
}
