import Reveal from "../components/Reveal.jsx";
import TempleCanvas from "../components/TempleCanvas.jsx";

export default function BaghBhairabSection() {
  return (
    <section id="heritage" className="temple-section temple-section--split">
      <Reveal variant="slide-left" className="temple-copy">
        <span className="section-eyebrow">The Guardian of Kirtipur</span>
        <h2>Bagh Bhairab</h2>
        <p>
          Bagh Bhairab is one of Kirtipur's most important sacred temples — a
          three-storey pagoda dedicated to Bhairab in the form of a tiger, and a
          powerful symbol of the town's religious and cultural identity.
        </p>
        <p>
          Residents believe the temple protects Kirtipur itself. Weapons captured
          during the town's 1768 resistance still hang from its upper balconies,
          kept in place as a record of that history rather than a display of it.
        </p>
        <p className="temple-hint">Drag to look around · scroll to continue</p>
      </Reveal>

      <Reveal variant="scale-up" delay={0.15} className="temple-model">
        <TempleCanvas
          modelUrl={`${import.meta.env.BASE_URL}models/bagh-bhairab/model.glb`}
          label="Bagh Bhairab"
          autoRotateSpeed={0.7}
          environment="city"
        />
      </Reveal>
    </section>
  );
}
