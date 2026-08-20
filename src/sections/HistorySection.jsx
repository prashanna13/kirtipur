import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { timeline } from "../data/timeline.js";
import Reveal from "../components/Reveal.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function HistorySection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mm = gsap.matchMedia();

    // Desktop/tablet-landscape: pin the section and translate the track
    // horizontally as the user scrolls vertically — a standard GSAP
    // horizontal-scroll recipe.
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const distance = () => track.scrollWidth - section.offsetWidth;

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      return () => tween.scrollTrigger && tween.scrollTrigger.kill();
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="history" className="history-section" ref={sectionRef}>
      <div className="history-heading">
        <Reveal as="span" variant="fade" className="section-eyebrow">
          A City With Centuries of History
        </Reveal>
        <Reveal as="h2" variant="fade-up" delay={0.1}>
          Ancient Roots to Kirtipur Today
        </Reveal>
      </div>

      <div className="history-track" ref={trackRef}>
        {timeline.map((item, i) => (
          <Reveal key={item.id} variant="fade-up" delay={i * 0.08} className="history-item">
            <span className="history-period">{item.period}</span>
            <h3>{item.kicker}</h3>
            <p>{item.text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
