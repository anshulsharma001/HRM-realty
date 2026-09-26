import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { TickScale } from "@/components/primitives/TickScale";

/**
 * Hand-traced Sonipat district in survey style: district boundary, the Yamuna
 * on the east, NH 44 north–south, the Gohana road and the KMP expressway.
 * Labels are cartographic. viewBox 0 0 600 720; roughly 1 unit ≈ 100 m.
 */
export const MAP_VIEWBOX = "0 0 600 720";

const TOWNS: Array<{ name: string; x: number; y: number; major?: boolean }> = [
  { name: "Sonipat", x: 430, y: 420, major: true },
  { name: "Murthal", x: 446, y: 366 },
  { name: "Ganaur", x: 456, y: 150 },
  { name: "Rai", x: 470, y: 520 },
  { name: "Kundli", x: 490, y: 602 },
  { name: "Kharkhoda", x: 300, y: 598 },
  { name: "Gohana", x: 150, y: 262 },
];

export function SonipatOutline({ className, children, compact = false }: { className?: string; children?: ReactNode; compact?: boolean }) {
  const s = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };
  return (
    <svg viewBox={MAP_VIEWBOX} className={cn("block h-auto w-full", className)} role="img" aria-label="Map of Sonipat district">
      {/* Boundary */}
      <path
        {...s}
        d="M150 60 L260 40 L380 55 L470 45 L500 90 Q520 150 505 210 L520 270 Q540 330 515 390 L528 450 Q510 520 530 580 L505 640 L430 665 L340 700 L260 680 L180 640 L120 600 L90 520 L110 440 L70 380 L95 300 L60 240 L90 160 Z"
      />
      {/* Yamuna, dashed, just inside the eastern boundary */}
      <path
        {...s}
        strokeDasharray="4 4"
        d="M492 92 Q510 150 496 210 Q508 260 512 300 Q528 340 508 392 Q520 450 512 500 Q500 545 522 582 Q514 620 498 646"
      />
      {/* NH 44 */}
      <path {...s} d="M462 46 L455 150 L446 366 L452 420 L470 520 L490 602 L500 662" />
      {/* Gohana road */}
      <path {...s} strokeDasharray="1 3" d="M430 420 L300 360 L150 262" />
      {/* KMP expressway */}
      <path {...s} strokeDasharray="6 3" d="M490 602 L380 612 L300 598 L200 640 L130 636" />
      {/* Grid ticks along the frame */}
      <g {...s} opacity="0.5">
        {[100, 200, 300, 400, 500].map((x) => (
          <path key={`x${x}`} d={`M${x} 0 L${x} 8 M${x} 712 L${x} 720`} />
        ))}
        {[100, 200, 300, 400, 500, 600].map((y) => (
          <path key={`y${y}`} d={`M0 ${y} L8 ${y} M592 ${y} L600 ${y}`} />
        ))}
      </g>
      {/* Towns */}
      <g>
        {TOWNS.map((t) => (
          <g key={t.name}>
            {t.major ? (
              <rect x={t.x - 5} y={t.y - 5} width="10" height="10" fill="none" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            ) : (
              <path d={`M${t.x - 4} ${t.y} L${t.x + 4} ${t.y} M${t.x} ${t.y - 4} L${t.x} ${t.y + 4}`} stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
            )}
            {!compact || t.major ? (
              <text x={t.x + 10} y={t.y + 4} fontSize={t.major ? 13 : 11} fill="currentColor" fontFamily="var(--font-text)" fontWeight={t.major ? 500 : 400}>
                {t.name}
              </text>
            ) : null}
          </g>
        ))}
        {!compact ? (
          <>
            <text x="536" y="330" fontSize="10" fill="currentColor" fontFamily="var(--font-text)" transform="rotate(80 536 330)" opacity="0.8">
              Yamuna
            </text>
            <text x="424" y="250" fontSize="10" fill="currentColor" fontFamily="var(--font-text)" transform="rotate(-84 424 250)" opacity="0.8">
              NH 44
            </text>
          </>
        ) : null}
      </g>
      {/* North arrow */}
      <g {...s}>
        <path d="M40 680 L40 640 M34 648 L40 640 L46 648" />
        <text x="40" y="700" fontSize="10" fill="currentColor" fontFamily="var(--font-text)" textAnchor="middle" stroke="none">
          N
        </text>
      </g>
      {children}
    </svg>
  );
}

export function MapScale({ className }: { className?: string }) {
  return <TickScale labels={["0", "5 km", "10 km"]} className={cn("w-56 text-steel lg:w-64", className)} />;
}
