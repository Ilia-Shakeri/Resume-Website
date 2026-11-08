"use client";

import { type RefObject, useEffect, useState, useSyncExternalStore } from "react";

const subscribeToHydration = () => () => {};

/** Enables controls only after their event handlers have mounted. */
export function useIsHydrated(): boolean {
  return useSyncExternalStore(subscribeToHydration, () => true, () => false);
}

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
const subscribeToReducedMotion = (notify: () => void) => {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
};

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeToReducedMotion,
    () => window.matchMedia(reducedMotionQuery).matches,
    () => true,
  );
}

/** True while the element is on screen and the tab is visible. */
export function useIsActive(ref: RefObject<Element | null>): boolean {
  const hydrated = useIsHydrated();
  const [onScreen, setOnScreen] = useState(false);
  const [tabVisible, setTabVisible] = useState(true);

  useEffect(() => {
    const element = ref.current;
    if (!element || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting), { threshold: 0.2 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);

  useEffect(() => {
    const update = () => setTabVisible(document.visibilityState === "visible");
    update();
    document.addEventListener("visibilitychange", update);
    return () => document.removeEventListener("visibilitychange", update);
  }, []);

  return (onScreen || (hydrated && !("IntersectionObserver" in window))) && tabVisible;
}
