import { useCallback, useEffect, useState } from 'react';
import LineSidebar from '@/components/LineSidebar';
import { StaggeredMenu } from '@/components/StaggeredMenu';
import { navLinks, profile, socials } from '@/data/content';

const labels = navLinks.map(l => l.label);

/**
 * Navigation is two presentations of the same list:
 *  - lg and up: React Bits' LineSidebar as a fixed rail, with its active item
 *    driven by scroll position rather than by clicks alone.
 *  - below lg: React Bits' StaggeredMenu as a slide-in panel, since a fixed
 *    rail has nowhere to live on a narrow screen.
 */
export default function SideNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  // Which section owns the middle of the viewport?
  useEffect(() => {
    const sections = navLinks
      .map(l => document.getElementById(l.href.slice(1)))
      .filter((el): el is HTMLElement => el !== null);

    if (!sections.length) return;

    const pick = () => {
      const mid = window.scrollY + window.innerHeight / 2;
      let current = 0;
      sections.forEach((s, i) => {
        if (s.offsetTop <= mid) current = i;
      });

      // The last section can be too short to reach the midpoint, so claim it
      // explicitly once we've hit the bottom of the page.
      const atBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 2;
      setActiveIndex(atBottom ? sections.length - 1 : current);
    };

    pick();
    window.addEventListener('scroll', pick, { passive: true });
    window.addEventListener('resize', pick);
    return () => {
      window.removeEventListener('scroll', pick);
      window.removeEventListener('resize', pick);
    };
  }, []);

  const goToSection = useCallback((index: number) => {
    const target = document.getElementById(navLinks[index].href.slice(1));
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <>
      {/* Brand mark — keeps the site identified now that the top bar is gone */}
      <a
        href="#home"
        className="fixed top-8 left-8 z-50 hidden font-display text-[15px] font-bold tracking-tight text-mist-100 lg:block"
      >
        {profile.name}
        <span className="text-violet-glow">.</span>
      </a>

      {/* ── Desktop: LineSidebar rail ────────────────────────────────── */}
      <div className="fixed top-1/2 left-8 z-50 hidden -translate-y-1/2 lg:block">
        <LineSidebar
          items={labels}
          defaultActive={activeIndex}
          onItemClick={goToSection}
          accentColor="#22d3ee"
          textColor="#7b8199"
          markerColor="#4b5563"
          showIndex
          showMarker
          scaleTick
          markerLength={50}
          markerGap={8}
          tickScale={0.5}
          maxShift={30}
          itemGap={28}
          fontSize={1.1}
          proximityRadius={100}
          falloff="smooth"
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
          displayItemNumbering
          logoUrl="/mark.svg"
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
