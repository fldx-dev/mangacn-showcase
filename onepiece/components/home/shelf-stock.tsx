"use client";

import { useEffect, useRef } from "react";

/**
 * Marks the shelf it sits in as stocked once it scrolls into view; app/home.css then drops the
 * volumes onto it in order. Without the `motion` class on `<html>` the shelf is never emptied.
 */
export function ShelfStock() {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const shelf = ref.current?.parentElement;
    if (!shelf) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        shelf.classList.add("is-stocked");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -15% 0px" },
    );
    observer.observe(shelf);
    return () => observer.disconnect();
  }, []);

  return <span ref={ref} hidden />;
}
