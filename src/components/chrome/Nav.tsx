import Image from "next/image";
import { TransitionLink } from "./TransitionLink";
import { NavLinks } from "./NavLinks";
import { NavMenu } from "./NavMenu";
import { SITE } from "@/content";

/**
 * Fixed sheet header carrying the client's logo lockup (HRM with the gold R,
 * REALTY beneath). The link keeps a stable id: it is the Flip target for the
 * name reveal in the motion pass.
 */
export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 tone-paper">
      <nav aria-label="Primary" className="container-site flex h-16 items-center justify-between">
        <TransitionLink id="hrm-monogram" href="/" className="flex items-center" aria-label={SITE.name}>
          <Image src="/brand/hrm-wordmark-dark.png" alt="" width={1200} height={444} priority className="h-9 w-auto lg:h-11" />
        </TransitionLink>
        <NavLinks className="hidden items-center gap-7 lg:flex" itemClassName="type-small" />
        <NavMenu />
      </nav>
    </header>
  );
}
