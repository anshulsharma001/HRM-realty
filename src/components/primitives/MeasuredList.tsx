import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type Size = "h2" | "h3" | "lead" | "body";

const sizeClass: Record<Size, string> = { h2: "type-h2", h3: "type-h3", lead: "type-lead", body: "type-body" };

interface MeasuredListProps {
  items: readonly ReactNode[];
  size?: Size;
  /** Inline row for short category lists. */
  inline?: boolean;
  ordered?: boolean;
  /** Hairlines between items. Off by default: spacing does the measuring. */
  rules?: boolean;
  className?: string;
  itemClassName?: string;
}

/** A list measured by spacing, never bullets, chips or middle dots. Rules are opt-in. */
export function MeasuredList({ items, size = "h3", inline = false, ordered = false, rules = false, className, itemClassName }: MeasuredListProps) {
  const Tag = ordered ? "ol" : "ul";
  if (inline) {
    return (
      <Tag className={cn("flex flex-wrap gap-x-8 gap-y-2 lg:gap-x-10", className)}>
        {items.map((item, i) => (
          <li key={i} className={cn(sizeClass[size], "py-1", rules && "border-t border-tone pr-6", itemClassName)}>
            {item}
          </li>
        ))}
      </Tag>
    );
  }
  return (
    <Tag className={cn(rules && "border-t border-tone", className)}>
      {items.map((item, i) => (
        <li key={i} className={cn(sizeClass[size], rules ? "border-b border-tone py-4 lg:py-5" : "py-2.5 lg:py-3", itemClassName)}>
          {item}
        </li>
      ))}
    </Tag>
  );
}
