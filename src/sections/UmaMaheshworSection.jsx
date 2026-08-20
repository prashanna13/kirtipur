import Reveal from "../components/Reveal.jsx";
import TempleCanvas from "../components/TempleCanvas.jsx";

export default function UmaMaheshworSection() {
  return (
    <section className="temple-section temple-section--stacked">
      <Reveal variant="scale-up" className="temple-model temple-model--stacked">
        <TempleCanvas
          modelUrl="/models/uma-maheshwor/model.glb"
          label="Uma Maheshwor"
          autoRotateSpeed={1}
          environment="sunset"
        />
      </Reveal>

      <Reveal variant="fade-up" delay={0.15} as="h2" className="temple-stacked-title">
        Uma Maheshwor
      </Reveal>
      <Reveal variant="fade-up" delay={0.25} as="p" className="temple-stacked-sub">
        A three-storey hilltop temple dedicated to Shiva and Parvati, standing near
        Kirtipur's old Malla-era palace grounds. On a clear day, the terrace below
        opens onto the whole Kathmandu Valley.
      </Reveal>
      <Reveal variant="fade-up" delay={0.35} as="a" href="#explore" className="temple-stacked-link">
        Explore Kirtipur →
      </Reveal>
    </section>
  );
}
