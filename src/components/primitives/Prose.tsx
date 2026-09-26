import { cn } from "@/lib/cn";

/** Body paragraphs. Empty strings are skipped; renders nothing when none remain. */
export function Prose({ paragraphs, className, size = "body" }: { paragraphs: readonly string[]; className?: string; size?: "body" | "lead" }) {
  const live = paragraphs.filter((p) => p.trim().length > 0);
  if (live.length === 0) return null;
  return (
    <div className={cn("flex flex-col gap-5", className)}>
      {live.map((p, i) => (
        <p key={i} className={size === "lead" ? "type-lead" : "type-body"}>
          {p}
        </p>
      ))}
    </div>
  );
}
