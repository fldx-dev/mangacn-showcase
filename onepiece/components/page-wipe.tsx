"use client";

import { gsap } from "gsap";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { ThousandSunny } from "@/components/ship-icons";

/** Twelve crests across; the strip is twice the screen wide so it can slide as it rises. */
const CREST = `M0 30${"q25 -26 50 0t50 0".repeat(12)}V60H0Z`;

/**
 * The cut between pages: a wave of ink rises over the screen with the Thousand Sunny riding its
 * crest, the next page loads underneath, and the sea drops away again as the ship sails on.
 * Internal links to another path only; hash links, new tabs, modified clicks and back/forward
 * are left alone, and so is everything under reduced motion.
 */
export function PageWipe() {
  const router = useRouter();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    let busy = false;

    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const link = (event.target as Element).closest("a");
      if (!link || (link.target && link.target !== "_self") || link.hasAttribute("download")) return;
      const url = new URL(link.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname === window.location.pathname) return;
      const el = panel.current;
      if (!el) return;
      event.preventDefault();
      if (busy) return;
      busy = true;

      const href = url.pathname + url.search + url.hash;
      router.prefetch(href);
      const sea = el.querySelector("[data-wipe-sea]");
      const ship = el.querySelector("[data-wipe-ship]");
      const crest = el.querySelector("[data-wipe-crest]");
      gsap.set(el, { visibility: "visible" });
      gsap.set(sea, { yPercent: 100 });
      gsap.fromTo(crest, { xPercent: 0 }, { xPercent: -25, duration: 1.6, ease: "none" });
      gsap.fromTo(ship, { left: "12%" }, { left: "46%", duration: 0.55, ease: "power1.in" });
      gsap.to(sea, {
        yPercent: 0,
        duration: 0.55,
        ease: "power2.in",
        onComplete: () => {
          router.push(href);
          const started = performance.now();
          // Drop once the new path has committed; never hold the visitor past 2.5 s.
          const wait = () => {
            const arrived = window.location.pathname === url.pathname;
            if (!arrived && performance.now() - started < 2500) return;
            gsap.ticker.remove(wait);
            gsap.to(ship, { left: "84%", duration: 0.65, delay: 0.12, ease: "power1.out" });
            gsap.to(sea, {
              yPercent: 100,
              duration: 0.65,
              delay: 0.12,
              ease: "power2.out",
              onComplete: () => {
                gsap.set(el, { visibility: "hidden" });
                busy = false;
              },
            });
          };
          gsap.ticker.add(wait);
        },
      });
    };

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [router]);

  return (
    <div ref={panel} aria-hidden="true" className="page-wipe">
      <div data-wipe-sea className="page-wipe__sea">
        <svg
          data-wipe-crest
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
          className="page-wipe__crest"
        >
          <path d={CREST} fill="currentColor" />
        </svg>
        <span data-wipe-ship className="page-wipe__ship">
          <ThousandSunny className="size-full" />
        </span>
      </div>
    </div>
  );
}
