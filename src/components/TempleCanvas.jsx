import { Component, Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Stage, Html } from "@react-three/drei";

/* Loads one temple model. Expects a *compressed* GLB — see the README
   for the gltf-transform command to produce these from the raw uploads.
   Path convention: /models/<slug>/model.glb */
function TempleModel({ url, floatSpeed = 0.6, floatHeight = 0.08 }) {
  const { scene } = useGLTF(url);
  const group = useRef(null);

  // A very slow vertical float so the model reads as "alive" even when
  // the user isn't dragging — separate from OrbitControls' auto-orbit.
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.position.y = Math.sin(t * floatSpeed) * floatHeight;
  });

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

function CanvasFallback() {
  // Shown inside the WebGL canvas while the GLB streams in.
  return (
    <Html center>
      <div className="temple-canvas-loading">Loading model…</div>
    </Html>
  );
}

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div className="temple-canvas-placeholder">{this.props.label}</div>;
    }

    return this.props.children;
  }
}

export default function TempleCanvas({
  modelUrl,
  label,
  autoRotateSpeed = 0.8,
  environment = "city",
  intensity = 0.65,
  className = "",
}) {
  const wrapperRef = useRef(null);
  // Don't fetch the (large) GLB until the section is nearly on screen —
  // with three of these on one page, eagerly mounting all of them on
  // load would mean ~180MB fetched before the user scrolls at all.
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || active) return;

    if (!("IntersectionObserver" in window)) {
      setActive(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [active]);

  return (
    <div className={`temple-canvas ${className}`} ref={wrapperRef}>
      {active ? (
        <CanvasErrorBoundary label={label}>
          <Canvas
            dpr={[1, 1.75]}
            camera={{ fov: 40, position: [3.4, 1.8, 4.6] }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          >
            <Suspense fallback={<CanvasFallback />}>
              <Stage environment={environment} intensity={intensity} shadows={false} adjustCamera={1.3}>
                <TempleModel url={modelUrl} />
              </Stage>
            </Suspense>
            <OrbitControls
              makeDefault
              autoRotate
              autoRotateSpeed={autoRotateSpeed}
              enablePan={false}
              enableZoom
              minDistance={2}
              maxDistance={12}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.05}
            />
          </Canvas>
        </CanvasErrorBoundary>
      ) : (
        <div className="temple-canvas-placeholder" aria-hidden="true">
          <span>{label}</span>
        </div>
      )}
    </div>
  );
}
