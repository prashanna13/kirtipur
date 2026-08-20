import { useEffect, useState } from "react";

const links = [
  { href: "#hero", label: "Home" },
  { href: "#history", label: "History" },
  { href: "#heritage", label: "Heritage" },
  { href: "#explore", label: "Places" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "is-solid" : ""} ${menuOpen ? "menu-open" : ""}`}>
      <a className="navbar-logo" href="#hero" onClick={() => setMenuOpen(false)}>
        KIRTIPUR
      </a>

      <nav className="navbar-links" aria-label="Main menu">
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        className={`navbar-toggle ${menuOpen ? "is-open" : ""}`}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && (
        <nav className="navbar-mobile" aria-label="Mobile menu">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
