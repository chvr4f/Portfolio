import { useEffect, useRef, useState } from 'react';
import OptionWheel from '@/components/OptionWheel';
import { StaggeredMenu } from '@/components/StaggeredMenu';
import { navLinks, socials } from '@/data/content';
import { asset } from '@/lib/asset';

/**
 * Navigation is two presentations of the same list:
 *  - lg and up: React Bits' OptionWheel as a fixed rail, turned by scroll
 *    position rather than by the pointer.
 *  - below lg: React Bits' StaggeredMenu as a slide-in panel, since a fixed
 *    rail has nowhere to live on a narrow screen.
 */
export default function SideNav() {
  // Fractional index across the sections: 2.4 means 40% of the way from
  // Projects to Skills. The wheel reads this directly so it can slide and
  // crossfade continuously instead of snapping at section boundaries.
  const [position, setPosition] = useState(0);
  const frame = useRef<number | null>(null);

  useEffect(() => {
    const sections = navLinks
      .map(l => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const measure = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      const tops = sections.map(s => s.offsetTop);
      const last = tops.length - 1;

      let next = 0;
      if (mid <= tops[0]) {
        next = 0;
      } else if (mid >= tops[last]) {
        next = last;
      } else {
        for (let i = 0; i < last; i++) {
          if (mid >= tops[i] && mid < tops[i + 1]) {
            const span = tops[i + 1] - tops[i];
            const raw = span > 0 ? (mid - tops[i]) / span : 0;

            // Interpolating linearly would read as the *next* section while
            // you are still at the top of this one, because the viewport
            // midpoint already sits well into it. Hold the wheel on this
            // section for the first stretch, then ease across to the next.
            const HOLD = 0.45;
            const t = Math.min(1, Math.max(0, (raw - HOLD) / (1 - HOLD)));
            next = i + t * t * (3 - 2 * t); // smoothstep
            break;
          }
        }
      }

      // The final section is often too short to pull the midpoint onto it.
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) {
        next = last;
      }
      setPosition(next);
    };

    const onScroll = () => {
      if (frame.current != null) return;
      frame.current = requestAnimationFrame(() => {
        frame.current = null;
        measure();
      });
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (frame.current != null) cancelAnimationFrame(frame.current);
    };
  }, []);

  return (
    <>
      {/* ── Desktop: option wheel ────────────────────────────────────── */}
      {/* Pointer-transparent apart from the labels, so the rail can sit over
          the hero without stealing its clicks. */}
      <div className="pointer-events-none fixed top-1/2 left-0 z-50 hidden h-[26rem] w-64 -translate-y-1/2 lg:block xl:w-72">
        {/* The active option always sits at the vertical centre, so the
            highlight is a static band rather than anything that has to track
            it. Same treatment as the rail it replaced. */}
        <div
          aria-hidden
          className="absolute top-1/2 left-0 h-[52px] w-full -translate-y-1/2 rounded-r-lg"
          style={{
            background:
              'linear-gradient(90deg, #291ca7 0%, rgba(41,28,167,0.55) 46%, transparent 86%)',
          }}
        />
        <OptionWheel
          items={navLinks.map(l => l.label)}
          position={position}
          onUserSelect={i => {
            const el = document.getElementById(navLinks[i].href.slice(1));
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
          // Scroll drives the wheel, so it must not swallow the scroll that
          // drives it — and dragging would fight the page for the same gesture.
          captureScroll={false}
          draggable={false}
          side="left"
          inset={34}
          fontSize={1.7}
          spacing={1.55}
          curve={1}
          tilt={7}
          // Opacity is max(minOpacity, 1 - dist * fade). A gentler falloff plus
          // a higher floor keeps the off-centre labels legible while they still
          // read as receding.
          fade={0.17}
          minOpacity={0.32}
          blur={0.9}
          textColor="#8b92a4"
          // Light tint of the band's own hue: #291ca7 on #291ca7 measured
          // 1.75:1 against the page and vanished into its own highlight.
          activeColor="#ded9ff"
          className="relative pointer-events-auto"
        />
      </div>

      {/* ── Mobile / tablet: StaggeredMenu panel ─────────────────────── */}
      <div className="lg:hidden">
        <StaggeredMenu
          isFixed
          className="sm-dark"
          position="left"
          items={navLinks.map(l => ({
            label: l.label,
            ariaLabel: `Go to ${l.label} section`,
            link: l.href,
          }))}
          socialItems={socials.map(s => ({ label: s.label, link: s.href }))}
          displaySocials
          logoUrl={asset('/mark.svg')}
          accentColor="#22d3ee"
          colors={['#1b1436', '#0e1018']}
          menuButtonColor="#eceef5"
          openMenuButtonColor="#eceef5"
          changeMenuColorOnOpen={false}
          closeOnClickAway
        />
      </div>
    </>
  );
}
