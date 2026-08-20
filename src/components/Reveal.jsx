import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const VARIANTS = {
  "fade-up": { y: 48, opacity: 0 },
  "fade": { opacity: 0 },
  "mask": { opacity: 0, clipPath: "inset(0 0 100% 0)" },
  "slide-left": { x: -60, opacity: 0 },
  "slide-right": { x: 60, opacity: 0 },
  "scale-up": { scale: 0.92, opacity: 0 },
};

/**
 * Wraps children in a div that animates into place once it enters the
 * viewport. Respects prefers-reduced-motion by skipping straight to the
 * resolved state instead of tweening.
 */
export default function Reveal({
  as: Tag = "div",
  variant = "fade-up",
  delay = 0,
  duration = 0.9,
  className = "",
  children,
  ...rest
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const from = VARIANTS[variant] || VARIANTS["fade-up"];

    if (prefersReduced) {
      gsap.set(el, { opacity: 1, x: 0, y: 0, scale: 1, clipPath: "none" });
      return;
    }

    gsap.set(el, from);
    const tween = gsap.to(el, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      clipPath: "inset(0 0 0% 0)",
      duration,
      delay,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });

    return () => {
      tween.scrollTrigger && tween.scrollTrigger.kill();
      tween.kill();
    };
  }, [variant, delay, duration]);

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}
