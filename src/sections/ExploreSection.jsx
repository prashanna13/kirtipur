import Reveal from "../components/Reveal.jsx";
import PlaceCard from "../components/PlaceCard.jsx";
import { places } from "../data/places.js";

export default function ExploreSection() {
  return (
    <section id="explore" className="explore-section">
      <div className="explore-heading">
        <Reveal as="span" variant="fade" className="section-eyebrow">
          Explore Kirtipur
        </Reveal>
        <Reveal as="h2" variant="fade-up" delay={0.1}>
          The Soul of Kirtipur
        </Reveal>
        <Reveal as="p" variant="fade-up" delay={0.18} className="explore-lede">
          Temples, a stupa, a lake and streets that have stayed themselves for
          centuries — a short list of what makes the climb worth it.
        </Reveal>
      </div>

      <div className="explore-grid">
        {places.map((place, i) => (
          <Reveal key={place.id} variant="fade-up" delay={(i % 3) * 0.1}>
            <PlaceCard {...place} />
          </Reveal>
        ))}
      </div>

      <Reveal variant="fade-up" className="final-cta">
        <h2>
          Kirtipur is not just a place.
          <br />
          It is a story.
          <br />
          Come experience it.
        </h2>
        <a className="btn btn-primary" href="#hero">
          Explore Kirtipur
        </a>
      </Reveal>
    </section>
  );
}
