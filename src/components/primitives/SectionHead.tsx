import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SectionHeadProps {
  title: ReactNode;
  lead?: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: "display-xl" | "display-lg" | "h2";
  /** Grid placement classes for the head block. */
  className?: string;
  leadClassName?: string;
  id?: string;
}

/** Rule, heading, optional lead. Left-aligned; placement is the caller's. */
export function SectionHead({ title, lead, as: Tag = "h2", size = "h2", className, leadClassName, id }: SectionHeadProps) {
  return (
    <header className={cn("grid-site", className)}>
      <div className="col-span-12 lg:col-start-2 lg:col-span-7">
        <Tag id={id} className={`type-${size}`}>
          {title}
        </Tag>
        {lead ? <p className={cn("type-lead mt-5 text-steel-dk", leadClassName)}>{lead}</p> : null}
      </div>
    </header>
  );
}
