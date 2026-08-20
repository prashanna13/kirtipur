export default function Footer() {
  return (
    <footer className="site-footer" id="footer">
      <div className="footer-top">
        <span className="footer-wordmark">KIRTIPUR</span>
        <p>Where History Lives Above the Valley</p>
      </div>

      <nav className="footer-links" aria-label="Footer menu">
        <a href="#hero">Home</a>
        <a href="#history">History</a>
        <a href="#heritage">Heritage</a>
        <a href="#explore">Places</a>
      </nav>

      <div className="footer-bottom">
        <span>© 2026 Kirtipur Experience</span>
        <span className="footer-note">A cultural tribute site — not an official tourism authority</span>
      </div>
    </footer>
  );
}
