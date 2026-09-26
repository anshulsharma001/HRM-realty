import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

/**
 * Navigation link. In the motion pass this fires the exit animation before
 * navigating; for now it is a plain Next link so the API is stable.
 */
export function TransitionLink(props: ComponentPropsWithoutRef<typeof Link>) {
  return <Link {...props} />;
}
