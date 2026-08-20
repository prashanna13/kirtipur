import Reveal from "../components/Reveal.jsx";

const cards = [
  {
    kicker: "01",
    title: "A City on a Ridge",
    text: "Founded on twin hilltops above the valley, Kirtipur has stayed a fortress town in spirit long after the walls came down.",
    href: "#history",
  },
  {
    kicker: "02",
    title: "Newar Heritage",
    text: "Three sacred sites — Bagh Bhairab, Uma Maheshwor and Chilancho — anchor a living Hindu and Buddhist tradition.",
    href: "#heritage",
  },
  {
    kicker: "03",
    title: "Streets Worth Walking",
    text: "Brick lanes, carved windows and a lake at the edge of town — a short list of places worth the climb.",
    href: "#explore",
  },
];

export default function IntroSection() {
  return (
    <section className="intro-strip" aria-label="Kirtipur overview">
      {cards.map((card, i) => (
        <Reveal key={card.kicker} variant="fade-up" delay={i * 0.12} className="intro-card">
          <span className="intro-kicker">{card.kicker}</span>
          <h3>{card.title}</h3>
          <p>{card.text}</p>
          <a href={card.href}>Read more →</a>
        </Reveal>
      ))}
    </section>
  );
}
