"use client";

import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { NavLinks } from "./NavLinks";
import { useLenis } from "@/lib/lenis";

/** Phone navigation: a button that opens a full-screen list of routes. */
export function NavMenu() {
  const [open, setOpen] = useState(false);
  const id = useId();
  const pathname = usePathname();
  const lenis = useLenis();

  // Close on route change: derived-state reset during render, not in an effect.
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!lenis) return;
    if (open) lenis.stop();
    else lenis.start();
    return () => lenis.start();
  }, [open, lenis]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="link-rule type-small font-medium"
      >
        {open ? "Close" : "Menu"}
      </button>
      <div id={id} hidden={!open} className="fixed inset-x-0 bottom-0 top-16 z-40 tone-paper overflow-y-auto" data-lenis-prevent>
        <div className="container-site py-10">
          <NavLinks className="flex flex-col gap-6" itemClassName="type-h2" onNavigate={() => setOpen(false)} />
        </div>
      </div>
    </div>
  );
}
