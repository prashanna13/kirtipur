import { useEffect, useState } from "react";

/* A brief, fixed-length loading screen. It is not gated on the temple
   GLB downloads (those are large and stream in lazily per-section as
   the user scrolls, each with its own in-canvas fallback) — gating the
   whole site behind 180MB of models would make the first paint feel
   broken. This just covers the font/layout flash on first load. */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const leaveTimer = setTimeout(() => setLeaving(true), 1100);
    const removeTimer = setTimeout(() => setVisible(false), 1700);
    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div className={`loading-screen ${leaving ? "is-leaving" : ""}`} aria-hidden={leaving}>
      <div className="loading-content">
        <span className="loading-kicker">कीर्तिपुर</span>
        <h1>KIRTIPUR</h1>
        <p>Ancient City, Living Heritage</p>
        <div className="loading-bar">
          <span />
        </div>
      </div>
    </div>
  );
}
