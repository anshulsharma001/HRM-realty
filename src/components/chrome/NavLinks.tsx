"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "./TransitionLink";
import { NAV } from "@/content";
import { cn } from "@/lib/cn";

export function NavLinks({ className, itemClassName, onNavigate }: { className?: string; itemClassName?: string; onNavigate?: () => void }) {
  const pathname = usePathname();
  return (
    <ul className={className}>
      {NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <TransitionLink
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={cn("link-rule", itemClassName)}
              onClick={onNavigate}
            >
              {item.label}
            </TransitionLink>
          </li>
        );
      })}
    </ul>
  );
}
