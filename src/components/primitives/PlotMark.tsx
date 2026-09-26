/** Plot-demarcation mark: a surveyed quadrilateral with corner crosses, 1px. */
export function PlotMark({ className = "w-24" }: { className?: string }) {
  const corners: Array<[number, number]> = [
    [12, 108],
    [28, 14],
    [118, 10],
    [148, 98],
  ];
  return (
    <svg viewBox="0 0 160 120" className={className} aria-hidden="true">
      <path d="M12 108 L28 14 L118 10 L148 98 Z" fill="none" stroke="currentColor" strokeWidth="1" />
      <path d="M28 14 L148 98" stroke="currentColor" strokeWidth="1" strokeDasharray="2 3" />
      {corners.map(([x, y]) => (
        <g key={`${x}-${y}`} stroke="currentColor" strokeWidth="1">
          <line x1={x - 5} y1={y} x2={x + 5} y2={y} />
          <line x1={x} y1={y - 5} x2={x} y2={y + 5} />
        </g>
      ))}
    </svg>
  );
}
