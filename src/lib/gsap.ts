"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

let registered = false;
if (typeof window !== "undefined" && !registered) {
  registered = true;
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);
  gsap.defaults({ ease: "power3.out", duration: 1 });
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export const prefersReduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let pending: number | null = null;
/**
 * Debounced, frame-deferred ScrollTrigger refresh.
 * Refreshing synchronously (or from several places at once) while triggers are
 * being created/reverted is the classic source of internal ScrollTrigger errors.
 */
export function refreshScroll(delay = 0) {
  if (typeof window === "undefined") return;
  if (pending) window.clearTimeout(pending);
  pending = window.setTimeout(() => {
    pending = null;
    requestAnimationFrame(() => {
      if ((ScrollTrigger as unknown as { isRefreshing?: boolean }).isRefreshing) return;
      try { ScrollTrigger.refresh(); } catch { /* triggers torn down mid-refresh */ }
    });
  }, delay);
}

export { gsap, ScrollTrigger };
