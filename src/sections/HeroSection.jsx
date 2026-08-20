import { useEffect, useRef } from "react";
import gsap from "gsap";
import Reveal from "../components/Reveal.jsx";

/* No supplied asset actually depicts Kirtipur (the bundled "bridge"
   model is a Mostar/Neretva scene from the reference project and
   would be geographically misleading here), so the hero background is
   a procedural layered-silhouette scene evoking the Kathmandu Valley
   ridge Kirtipur sits on, with mouse/scroll parallax on each layer. */
export default function HeroSection() {
  const heroRef = useRef(null);
  const layersRef = useRef([]);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const setters = layersRef.current.map((el) =>
      el
        ? { x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }), depth: Number(el.dataset.depth || 0) }
        : null
    );

    function onMove(event) {
      const { innerWidth, innerHeight } = window;
      const relX = (event.clientX / innerWidth - 0.5) * 2;
      const relY = (event.clientY / innerHeight - 0.5) * 2;
      setters.forEach((setter) => {
        if (!setter) return;
        setter.x(relX * setter.depth);
      });
      void relY;
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true">
        <div className="hero-layer hero-sky" />
        <svg
          className="hero-layer hero-mountains-far"
          ref={(el) => (layersRef.current[0] = el)}
          data-depth="8"
          viewBox="0 0 1600 500"
          preserveAspectRatio="xMidYMax slice"
        >
          <path d="M0,500 L0,300 L180,180 L360,280 L520,140 L700,260 L900,120 L1100,270 L1300,160 L1480,290 L1600,220 L1600,500 Z" />
        </svg>
        <svg
          className="hero-layer hero-mountains-near"
          ref={(el) => (layersRef.current[1] = el)}
          data-depth="18"
          viewBox="0 0 1600 500"
          preserveAspectRatio="xMidYMax slice"
        >
          <path d="M0,500 L0,380 L140,300 L300,370 L460,260 L620,360 L800,240 L980,350 L1180,270 L1360,360 L1600,300 L1600,500 Z" />
        </svg>
        <svg
          className="hero-layer hero-town"
          ref={(el) => (layersRef.current[2] = el)}
          data-depth="34"
          viewBox="0 0 1600 420"
          preserveAspectRatio="xMidYMax slice"
        >
          {/* stylised pagoda-roof skyline, standing in for Kirtipur's ridge */}
          <path d="M0,420 L0,340 L60,340 L60,300 L100,300 L100,270 L140,270 L140,300 L180,300 L180,340 L260,340 L260,310 L300,270 L340,310 L340,340 L420,340 L420,290 L470,250 L520,290 L520,340 L640,340 L640,300 L700,300 L700,260 L740,260 L740,300 L800,300 L800,340 L920,340 L920,280 L980,230 L1040,280 L1040,340 L1160,340 L1160,300 L1220,300 L1220,260 L1260,260 L1260,300 L1320,300 L1320,340 L1440,340 L1440,300 L1500,300 L1500,340 L1600,340 L1600,420 Z" />
        </svg>
        <div className="hero-vignette" />
      </div>

      <div className="hero-copy">
        <Reveal as="span" variant="fade" delay={0.1} className="hero-eyebrow">
          Kathmandu Valley, Nepal
        </Reveal>
        <Reveal as="h1" variant="mask" delay={0.2} className="hero-title">
          KIRTIPUR
        </Reveal>
        <Reveal as="p" variant="fade-up" delay={0.4} className="hero-tagline">
          WHERE HISTORY LIVES ABOVE THE VALLEY
        </Reveal>
        <Reveal as="p" variant="fade-up" delay={0.5} className="hero-sub">
          Explore the ancient hilltop city of Kirtipur — Newar temples, stone-paved
          streets and centuries of living heritage above the Kathmandu Valley.
        </Reveal>
        <Reveal as="div" variant="fade-up" delay={0.65} className="hero-ctas">
          <a className="btn btn-primary" href="#history">
            Explore Kirtipur
          </a>
          <a className="btn btn-ghost" href="#heritage">
            Discover Heritage
          </a>
        </Reveal>
      </div>

      <div className="scroll-cue" aria-hidden="true">
        <span />
      </div>
    </section>
  );
}
