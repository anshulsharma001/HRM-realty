"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { mountLenis, useLenis } from "@/lib/lenis";
import { DUR, EASE } from "@/lib/motion";

/**
 * Mounted once in the root layout (§4.2): GSAP defaults, the Lenis instance,
 * and ScrollTrigger refreshes after fonts load and on route change.
 */
export function Providers({ children }: { children: ReactNode }) {
  const lenis = useLenis();
  const pathname = usePathname();
  const isFirstRoute = useRef(true);

  useEffect(() => {
    gsap.defaults({ ease: EASE.reveal, duration: DUR.reveal });
    ScrollTrigger.config({ ignoreMobileResize: true }); // §4.3 #4
    const unmount = mountLenis();
    let cancelled = false;
    document.fonts.ready.then(() => {
      if (!cancelled) ScrollTrigger.refresh(); // §4.3 #1
    });
    return () => {
      cancelled = true;
      unmount();
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (isFirstRoute.current) {
      isFirstRoute.current = false;
      return;
    }
    if (!window.location.hash) lenis.scrollTo(0, { immediate: true, force: true });
    const id = requestAnimationFrame(() => ScrollTrigger.refresh()); // §4.3 #3
    return () => cancelAnimationFrame(id);
  }, [pathname, lenis]);

  return <>{children}</>;
}
