"use client";

import { useSyncExternalStore } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* Shared Lenis instance behind a tiny external store, so any client component
 * can read it without the provider calling setState inside an effect. */
let current: Lenis | null = null;
const listeners = new Set<() => void>();

function publish(next: Lenis | null) {
  current = next;
  listeners.forEach((fn) => fn());
}

function subscribe(fn: () => void) {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** The shared Lenis instance, or null before mount (always null on the server). */
export function useLenis(): Lenis | null {
  return useSyncExternalStore(subscribe, () => current, () => null);
}

/**
 * Create Lenis, drive it from gsap.ticker with lagSmoothing(0), and forward
 * scroll to ScrollTrigger (§4.1, §4.3 #5). Returns a cleanup function.
 */
export function mountLenis(): () => void {
  const instance = new Lenis({
    autoRaf: false,
    syncTouch: false, // never hijack momentum scroll on mobile
    lerp: 0.1,
    smoothWheel: true,
    anchors: true,
    stopInertiaOnNavigate: true,
    respectReducedMotion: true,
  });
  const off = instance.on("scroll", () => ScrollTrigger.update());
  const tick = (time: number) => instance.raf(time * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  publish(instance);
  return () => {
    off();
    gsap.ticker.remove(tick);
    instance.destroy();
    publish(null);
  };
}
