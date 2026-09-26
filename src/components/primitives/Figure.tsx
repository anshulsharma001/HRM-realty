import { cn } from "@/lib/cn";

interface FigureProps {
  display: string;
  /** Numeric value behind the display string; enables the count-up. */
  value?: number;
  unit?: string;
  label: string;
  /** 0–1: width of the measure rule relative to the column (log scale, §3.3 ④). */
  ratio: number;
  size?: "xl" | "lg";
  /** Draw the measure rule. Off by default after client review: fewer lines between text. */
  rule?: boolean;
  className?: string;
}

/**
 * A stat: Fraunces display numerals, tabular lining figures, label below and
 * left. The numeral is rendered three times: an invisible sizer that keeps the
 * width stable while the count-up runs, the visible text the animation writes
 * into, and a screen-reader copy of the final value.
 */
export function Figure({ display, value, unit, label, ratio, size = "xl", rule = false, className }: FigureProps) {
  const suffix = display.replace(/^[\d,.\s]+/, "");
  return (
    <div className={cn("flex flex-col", className)} data-figure>
      <p className={cn("tnum", size === "xl" ? "type-display-xl" : "type-display-lg")}>
        {value !== undefined ? (
          <span className="relative inline-block" data-count={value} data-suffix={suffix}>
            <span aria-hidden="true" className="invisible">
              {display}
            </span>
            <span aria-hidden="true" data-count-text className="absolute inset-0">
              {display}
            </span>
            <span className="sr-only">{display}</span>
          </span>
        ) : (
          display
        )}
        {unit ? (
          <span data-figure-unit className="type-h3 ml-3 inline-block align-baseline">
            {unit}
          </span>
        ) : null}
      </p>
      {rule ? (
        <div
          role="presentation"
          className="mt-3 h-px bg-current opacity-60"
          style={{ width: `${Math.round(Math.max(0.08, Math.min(1, ratio)) * 100)}%` }}
        />
      ) : null}
      <p data-figure-label className={cn("type-small max-w-[32ch]", rule ? "mt-3" : "mt-2")}>
        {label}
      </p>
    </div>
  );
}
