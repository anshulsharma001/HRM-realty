import { cn } from "@/lib/cn";

/**
 * Sonipat skyline in survey linework: three depth layers at different
 * opacities (the hero's rise animation targets them later), a continuous
 * horizon rule, and boundary pegs in the foreground. 1px strokes throughout.
 */
export function Skyline({ className }: { className?: string }) {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1, vectorEffect: "non-scaling-stroke" as const };
  // Sawtooth factory roofs for the mid layer.
  const saw = (x0: number, n: number, w: number, h: number, base: number) => {
    let d = `M${x0} ${base}`;
    for (let i = 0; i < n; i++) {
      const x = x0 + i * w;
      d += ` L${x} ${base - h} L${x + w * 0.62} ${base - h * 1.7} L${x + w} ${base - h}`;
    }
    d += ` L${x0 + n * w} ${base}`;
    return d;
  };
  const pegs = [140, 330, 520, 760, 980, 1210, 1440];
  return (
    <svg viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice" className={cn("block", className)} aria-hidden="true">
      {/* far: chimneys, transmission towers, a water tank */}
      <g data-layer="far" opacity="0.32" {...stroke}>
        <path d="M0 330 L120 330 L120 300 L180 300 L180 330 L420 330 L420 310 L470 310 L470 330 L700 330 L700 320 L760 320 L760 330 L1050 330 L1050 296 L1110 296 L1110 330 L1600 330" />
        <path d="M232 330 L232 236 L246 236 L246 330" />
        <path d="M1188 330 L1188 216 L1200 216 L1200 330" />
        <path d="M840 330 L860 240 L900 240 L920 330 M850 300 L910 300 M846 270 L914 270" />
        <path d="M1372 330 L1372 262 L1420 262 L1420 330 M1364 262 L1428 262 L1428 244 L1364 244 Z" />
        <path d="M560 260 L600 200 L640 260 M580 260 L580 330 M620 260 L620 330 M600 200 L600 330" />
        <path d="M1480 268 L1520 208 L1560 268 M1500 268 L1500 330 M1540 268 L1540 330 M1520 208 L1520 330" />
        <path d="M640 236 Q1080 220 1500 236" strokeDasharray="3 6" />
      </g>
      {/* mid: sawtooth sheds, a shikhara, blocks with window ticks */}
      <g data-layer="mid" opacity="0.6" {...stroke}>
        <path d={saw(60, 6, 46, 18, 360)} />
        <path d={saw(1120, 5, 52, 20, 360)} />
        <path d="M470 360 L470 300 L560 300 L560 360" />
        <path d="M486 316 L486 322 M504 316 L504 322 M522 316 L522 322 M540 316 L540 322 M486 336 L486 342 M504 336 L504 342 M522 336 L522 342 M540 336 L540 342" />
        <path d="M700 360 L700 250 Q720 190 740 250 L740 360 M708 250 L732 250 M712 226 L728 226 M720 190 L720 178" />
        <path d="M770 360 L770 318 L860 318 L860 360 M790 318 L790 300 L840 300 L840 318" />
        <path d="M900 360 L900 270 L1010 270 L1010 360 M920 290 L920 296 M944 290 L944 296 M968 290 L968 296 M992 290 L992 296 M920 314 L920 320 M944 314 L944 320 M968 314 L968 320 M992 314 L992 320 M920 338 L920 344 M944 338 L944 344 M968 338 L968 344 M992 338 L992 344" />
        <path d="M1420 360 L1420 330 L1510 330 L1510 360" />
        <path d="M0 360 L1600 360" />
      </g>
      {/* near: boundary wall with pillars, a gate, trees, survey pegs */}
      <g data-layer="near" opacity="1" {...stroke}>
        <path d="M0 392 L1600 392" />
        <path d="M0 384 L360 384 M360 380 L368 380 L368 392 M360 392 L360 380 M600 380 L608 380 L608 392 L600 392 Z M608 384 L1000 384 M1000 380 L1008 380 L1008 392 L1000 392 Z M1240 380 L1248 380 L1248 392 L1240 392 Z M1248 384 L1600 384" />
        <path d="M368 392 L368 376 L600 376 L600 392" strokeDasharray="4 5" />
        <path d="M1090 392 L1090 350 Q1082 320 1104 314 Q1128 312 1124 342 Q1140 356 1116 364 L1116 392" />
        <path d="M1104 392 L1104 364" />
        <path d="M212 392 L212 358 Q200 336 222 330 Q246 326 240 352 Q252 366 230 370 L230 392" />
        {pegs.map((x) => (
          <path key={x} d={`M${x} 404 L${x} 420 M${x - 6} 412 L${x + 6} 412`} />
        ))}
      </g>
    </svg>
  );
}
