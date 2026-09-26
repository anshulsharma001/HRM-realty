import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

type Props = ComponentPropsWithoutRef<typeof Link> & { external?: boolean };

/** Inline link: underline draws from the left on hover, no colour change (§3.2). */
export function TextLink({ className, external, ...rest }: Props) {
  const extra = external ? { target: "_blank", rel: "noopener noreferrer" } : {};
  return <Link {...extra} {...rest} className={cn("link-rule", className)} />;
}
