import { cn } from "@/lib/cn";

/** Hairline rule that adapts to the chapter tone. */
export function Rule({ className, vertical = false }: { className?: string; vertical?: boolean }) {
  return <div role="presentation" className={cn(vertical ? "rule-v" : "rule", className)} />;
}
