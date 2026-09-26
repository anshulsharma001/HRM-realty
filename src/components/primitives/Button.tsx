import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

interface Variant {
  /** Use on ink surfaces: paper fill, ink text on hover. */
  inverted?: boolean;
}

type ButtonProps = Variant & ComponentPropsWithoutRef<"button">;
type ButtonLinkProps = Variant & ComponentPropsWithoutRef<typeof Link>;

/**
 * Outlined button whose background fills from the bottom edge on hover (§3.2).
 * No lift, no shadow, no arrow glyph.
 */
export function Button({ inverted, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} {...rest} className={cn("btn", inverted && "btn-inv", className)} />;
}

/** The same primitive as a Next link. */
export function ButtonLink({ inverted, className, ...rest }: ButtonLinkProps) {
  return <Link {...rest} className={cn("btn", inverted && "btn-inv", className)} />;
}
