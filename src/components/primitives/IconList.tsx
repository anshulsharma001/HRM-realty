import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { iconFor } from "@/content/icons";
import type { IconName } from "@/lib/icons";
import { LineIcon } from "./LineIcon";

type Size = "h2" | "h3" | "lead" | "body";

export interface IconListItem {
  label: string;
  description?: ReactNode;
  icon?: IconName;
}

interface IconListProps {
  items: readonly IconListItem[];
  size?: Size;
  columns?: 1 | 2;
  /** Colour of the icons; soil on paper, wheat on ink. */
  iconClassName?: string;
  className?: string;
}

const labelClass: Record<Size, string> = { h2: "type-h2", h3: "type-h3", lead: "type-lead", body: "type-body" };
const iconSize: Record<Size, string> = { h2: "mt-1 h-9 w-9", h3: "mt-0.5 h-7 w-7", lead: "mt-0.5 h-6 w-6", body: "mt-0.5 h-5 w-5" };
const rowGap: Record<Size, string> = { h2: "gap-y-6", h3: "gap-y-5", lead: "gap-y-4", body: "gap-y-3" };

/** A list measured by spacing, each line led by one of the site's line icons. */
export function IconList({ items, size = "h3", columns = 1, iconClassName = "text-soil", className }: IconListProps) {
  return (
    <ul className={cn("grid grid-cols-1 gap-x-8", rowGap[size], columns === 2 && "sm:grid-cols-2", className)}>
      {items.map((item) => (
        <li key={item.label} className="flex items-start gap-4">
          <LineIcon name={item.icon ?? iconFor(item.label)} className={cn("shrink-0", iconSize[size], iconClassName)} />
          <div className="min-w-0">
            <p className={labelClass[size]}>{item.label}</p>
            {item.description ? <p className="type-body mt-1.5 text-steel-dk">{item.description}</p> : null}
          </div>
        </li>
      ))}
    </ul>
  );
}
