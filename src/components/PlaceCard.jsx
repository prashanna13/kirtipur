export default function PlaceCard({ name, tag, blurb, image }) {
  return (
    <article className="place-card">
      <div className="place-card-media">
        <img src={image} alt={name} />
        <span className="place-card-tag">{tag}</span>
      </div>
      <div className="place-card-body">
        <h3>{name}</h3>
        <p>{blurb}</p>
        <span className="place-card-arrow">
          Explore <i aria-hidden="true">→</i>
        </span>
      </div>
    </article>
  );
}
