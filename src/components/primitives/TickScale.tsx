/** Measured scale bar in the survey style. Labels are cartographic, not copy. */
export function TickScale({ labels = ["0", "5 km", "10 km"], className = "" }: { labels?: [string, string, string]; className?: string }) {
  const ticks = Array.from({ length: 11 }, (_, i) => i);
  return (
    <svg viewBox="-2 0 404 30" className={className} aria-hidden="true">
      <line x1="0" y1="22" x2="400" y2="22" stroke="currentColor" strokeWidth="1" />
      {ticks.map((t) => (
        <line key={t} x1={t * 40} y1={t % 5 === 0 ? 10 : 16} x2={t * 40} y2="22" stroke="currentColor" strokeWidth="1" />
      ))}
      <text x="0" y="5" fontSize="14" fill="currentColor" fontFamily="var(--font-text)">
        {labels[0]}
      </text>
      <text x="200" y="5" fontSize="14" fill="currentColor" fontFamily="var(--font-text)" textAnchor="middle">
        {labels[1]}
      </text>
      <text x="400" y="5" fontSize="14" fill="currentColor" fontFamily="var(--font-text)" textAnchor="end">
        {labels[2]}
      </text>
    </svg>
  );
}
