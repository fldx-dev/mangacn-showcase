"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";

/**
 * The landing page's motion, in one place and on one clock (GSAP's ticker): panels slam in,
 * headings are wiped in like a brush stroke, the hero title slides apart as it scrolls away, a
 * ship sails the story's route, and the hero's focus lines keep breathing at rest. Runs only when
 * `<html>` carries `motion` (set before paint unless the visitor asks for reduced motion), so
 * without it every element stays as rendered.
 */
export function HomeMotion() {
  useEffect(() => {
    if (!document.documentElement.classList.contains("motion")) return;
    gsap.registerPlugin(ScrollTrigger);

    // Keyboard focus never lands on something still waiting for its reveal.
    const onFocus = (event: FocusEvent) => {
      const waiting = (event.target as Element | null)?.closest?.("[data-reveal]");
      if (waiting) {
        gsap.killTweensOf(waiting);
        gsap.set(waiting, { opacity: 1, scale: 1, y: 0 });
      }
    };
    document.addEventListener("focusin", onFocus);

    const ctx = gsap.context(() => {
      // Panels and props slam in, in reading order.
      const reveals = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      gsap.set(reveals, { opacity: 0, scale: 1.05, y: 28 });
      ScrollTrigger.batch(reveals, {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.07,
            overwrite: true,
            clearProps: "transform",
          }),
      });

      // The title is painted from the first frame (it is the largest thing on a phone), so it
      // lands with one hard cut in scale instead of a fade, then its two words slide apart as
      // the hero scrolls away.
      if (document.querySelector("[data-hero]")) gsap.from("[data-hero] h1 [data-slot=sfx-text]", {
        scale: 1.2,
        transformOrigin: "0% 100%",
        duration: 0.6,
        ease: "power4.out",
        stagger: 0.08,
      });
      for (const word of gsap.utils.toArray<HTMLElement>("[data-title]")) {
        gsap.to(word, {
          xPercent: Number(word.dataset.title) * 8,
          ease: "none",
          scrollTrigger: { trigger: "[data-hero]", start: "top top", end: "bottom top", scrub: true },
        });
      }

      // Section headings are wiped in from the left, like a brush loaded with ink.
      for (const heading of gsap.utils.toArray<HTMLElement>("[data-wipe]")) {
        gsap.fromTo(
          heading,
          { clipPath: "inset(-10% 100% -10% 0%)", x: -24 },
          {
            clipPath: "inset(-10% -5% -10% 0%)",
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: heading, start: "top 85%", once: true },
          },
        );
      }

      // Depth: the hero's props drift at their own rates as the panel scrolls away.
      for (const el of gsap.utils.toArray<HTMLElement>("[data-depth]")) {
        gsap.to(el, {
          y: () => Number(el.dataset.depth) * -window.innerHeight * 0.6,
          ease: "none",
          scrollTrigger: {
            trigger: "[data-hero]",
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }

      // Idle: the focus lines breathe while the hero is on screen.
      const lines = document.querySelector("[data-hero] [data-slot=focus-lines-svg]");
      if (lines) {
        const breathe = gsap.to(lines, {
          scale: 1.1,
          transformOrigin: "30% 45%",
          duration: 2.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
        ScrollTrigger.create({
          trigger: "[data-hero]",
          onToggle: (self) => (self.isActive ? breathe.play() : breathe.pause()),
        });
      }

      // The voyage: the ship follows the route as the timeline scrolls, and the Going Merry
      // hands over to the Thousand Sunny after Water 7.
      const voyage = document.querySelector<HTMLElement>("[data-voyage]");
      const route = voyage?.querySelector<SVGPathElement>("[data-voyage-path]");
      const ship = voyage?.querySelector<HTMLElement>("[data-voyage-ship]");
      const sailed = voyage?.querySelector<SVGElement>("[data-voyage-sailed]");
      if (voyage && route && ship && sailed) {
        const chart = route.ownerSVGElement as SVGSVGElement;
        const length = route.getTotalLength();
        const state = { progress: 0 };
        const place = () => {
          const at = state.progress * length;
          const point = route.getPointAtLength(at);
          const ahead = route.getPointAtLength(Math.min(length, at + 6));
          const box = chart.getBoundingClientRect();
          const host = voyage.getBoundingClientRect();
          const heading = ((ahead.x - point.x) / 100) * box.width;
          gsap.set(ship, {
            x: box.left - host.left + (point.x / 100) * box.width,
            y: (point.y / 600) * box.height,
            rotation: gsap.utils.clamp(-12, 12, heading * 0.5),
          });
          if (Math.abs(heading) > 0.5) ship.dataset.heading = heading < 0 ? "left" : "right";
          ship.dataset.ship = point.y > 380 ? "sunny" : "merry";
          sailed.style.clipPath = `inset(0 0 ${100 - point.y / 6}% 0)`;
        };
        place();
        gsap.to(state, {
          progress: 1,
          ease: "none",
          onUpdate: place,
          scrollTrigger: {
            trigger: voyage,
            start: "top 55%",
            end: "bottom 60%",
            scrub: 0.7,
            onRefresh: place,
          },
        });
      }

      // A timeline's line inks in as its stages scroll past.
      for (const line of gsap.utils.toArray<HTMLElement>("[data-ink-line]")) {
        gsap.fromTo(
          line,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: "50% 0%",
            ease: "none",
            scrollTrigger: {
              trigger: line.parentElement,
              start: "top 65%",
              end: "bottom 65%",
              scrub: 0.6,
            },
          },
        );
      }

      // Gauges fill from empty when they arrive.
      for (const fill of gsap.utils.toArray<HTMLElement>("[data-slot=power-gauge-fill]")) {
        gsap.from(fill, {
          scaleX: 0,
          transformOrigin: "0% 50%",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: fill, start: "top 92%", once: true },
        });
      }

      // The closing scene: the sun comes up over the sea as the panel scrolls in.
      for (const sun of gsap.utils.toArray<HTMLElement>("[data-sun]")) {
        gsap.from(sun, {
          yPercent: 70,
          ease: "none",
          scrollTrigger: {
            trigger: sun.closest("[data-sea]"),
            start: "top 85%",
            end: "bottom 75%",
            scrub: 0.6,
          },
        });
      }

      // Real figures count up once, when their row arrives.
      for (const el of gsap.utils.toArray<HTMLElement>("[data-count]")) {
        // The figure is kept in an attribute: the text is overwritten while counting, and this
        // effect can run more than once on the same element.
        el.dataset.countTo ??= el.textContent ?? "";
        const match = el.dataset.countTo.match(/^([\d,]+)(.*)$/);
        if (!match) continue;
        const end = Number(match[1].replaceAll(",", ""));
        const suffix = match[2];
        const state = { value: 0 };
        const write = () => {
          el.textContent = Math.round(state.value).toLocaleString("en-US") + suffix;
        };
        write();
        gsap.to(state, {
          value: end,
          duration: 1.6,
          ease: "power3.out",
          onUpdate: write,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      }
    });

    return () => {
      document.removeEventListener("focusin", onFocus);
      ctx.revert();
    };
  }, []);

  return null;
}
