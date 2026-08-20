import Reveal from "../components/Reveal.jsx";
import TempleCanvas from "../components/TempleCanvas.jsx";

export default function ChilanchoSection() {
  return (
    <section className="temple-section temple-section--immersive">
      <Reveal variant="fade-up" duration={1.2} className="temple-model temple-model--immersive">
        <TempleCanvas
          modelUrl="/models/chilancho/model.glb"
          label="Chilancho Stupa"
          autoRotateSpeed={0.5}
          environment="dawn"
        />
      </Reveal>

      <div className="temple-immersive-copy">
        <Reveal variant="fade" as="span" className="section-eyebrow">
          A Symbol of Kirtipur's Buddhist Heritage
        </Reveal>
        <Reveal variant="slide-right" delay={0.1} as="h2">
          Chilancho
        </Reveal>
        <Reveal variant="slide-right" delay={0.2} as="p">
          On Kirtipur's southern ridge stands a weathered stupa ringed by four
          smaller chaityas, its inscriptions pointing back to the medieval period.
          It remains a quiet, active site of Buddhist devotion alongside the
          town's Hindu temples — two traditions sharing one hill.
        </Reveal>
      </div>
    </section>
  );
}
