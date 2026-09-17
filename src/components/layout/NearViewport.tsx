import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Shown while the box is far from the viewport. */
  fallback?: ReactNode;
  className?: string;
  /** How far outside the viewport to start mounting. */
  rootMargin?: string;
};

/**
 * Mounts its children only while the box is on, or near, the screen.
 *
 * For the WebGL backdrops that draw every frame no matter where they are:
 * browsers pause requestAnimationFrame for a hidden tab, not for a canvas
 * scrolled out of sight, so without this the hero and Skills shaders keep
 * rendering for the whole visit. Unmounting releases the GL context too.
 * The margin mounts them a screen early, so they are drawn before they
 * arrive.
 */
export default function NearViewport({
  children,
  fallback = null,
  className,
  rootMargin = '400px 0px',
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), { rootMargin });
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className}>
      {near ? children : fallback}
    </div>
  );
}
