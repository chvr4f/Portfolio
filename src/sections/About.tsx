import { lazy, Suspense } from 'react';
import AnimatedContent from '@/components/AnimatedContent';
import ProfileCard from '@/components/ProfileCard';
import CanvasBoundary from '@/components/layout/CanvasBoundary';
import AboutCard from '@/components/layout/AboutCard';
import GradientHeading from '@/components/layout/GradientHeading';
import Timeline from '@/components/layout/Timeline';
import { profile } from '@/data/content';

// WebGL, and purely decorative — same treatment as the hero's DarkVeil.
const LightRays = lazy(() => import('@/components/LightRays'));

export default function About() {
  return (
    <section id="about" className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:pl-52 xl:pl-72">
      {/* Rays rake down across the section. Boundary-wrapped because ogl throws
          outright when a GL context is unavailable, which would take the whole
          page with it. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <CanvasBoundary fallback={null}>
          <Suspense fallback={null}>
            {/* Stock React Bits defaults — top-center origin, followMouse is
                already on by default at mouseInfluence 0.1. */}
            <LightRays />
          </Suspense>
        </CanvasBoundary>
      </div>
      {/* Keep the rays from colliding with the section seams above and below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-ink-950 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-ink-950 to-transparent"
      />

      <div className="mx-auto max-w-6xl">
        {/* Centred heading — this section reads as its own title page, so it
            drops the numbered index the other sections carry. */}
        <GradientHeading lede="Discover my journey and passion for technology">
          About Me
        </GradientHeading>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-16">
          {/* `pc-fit` (index.css) makes the card size from this column's width
              rather than from its own height — see the note there. */}
          <div className="mx-auto w-full max-w-[24rem] lg:mx-0 lg:sticky lg:top-24">
            <ProfileCard
              className="pc-fit"
              // Luminance mask for the holographic shine — without it the sheen
              // washes flat, because the component's default iconUrl is a
              // placeholder string that resolves to `none`.
              iconUrl="/card-icons.svg"
              avatarUrl="/subject.png"
              miniAvatarUrl="/subject.png"
              name={profile.name}
              title={profile.roles[0]}
              handle="chvr4f"
              status="Open to work"
              contactText="Say hello"
              onContactClick={() => {
                window.location.href = `mailto:${profile.email}`;
              }}
            />
          </div>

          <AnimatedContent direction="horizontal" distance={60} duration={0.9} threshold={0.15}>
            <AboutCard />
          </AnimatedContent>
        </div>

        <Timeline />
      </div>
    </section>
  );
}
