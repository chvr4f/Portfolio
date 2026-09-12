import { lazy, Suspense } from 'react';
import SplitText from '@/components/SplitText';
import TextType from '@/components/TextType';
import ShinyText from '@/components/ShinyText';
import StarBorder from '@/components/StarBorder';
import CanvasBoundary from '@/components/layout/CanvasBoundary';
import { profile, socials } from '@/data/content';

// ogl is ~70 kB of WebGL runtime and purely decorative — keep it out of the
// critical path so the headline paints immediately.
const Aurora = lazy(() => import('@/components/Aurora'));

export default function Hero() {
  return (
    <section
      id="home"
      className="grain relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 lg:pl-64"
    >
      {/* WebGL aurora, pinned behind everything and non-interactive */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 animate-[fade-in_1.2s_ease-out_both] opacity-70"
      >
        <CanvasBoundary fallback={<AuroraFallback />}>
          <Suspense fallback={<AuroraFallback />}>
            <Aurora colorStops={['#5227ff', '#22d3ee', '#5227ff']} amplitude={1.1} blend={0.55} speed={0.7} />
          </Suspense>
        </CanvasBoundary>
      </div>

      {/* Fade the aurora into the page so the section seam disappears */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-b from-transparent to-ink-950"
      />

      <div className="mx-auto w-full max-w-6xl pt-24 pb-20">
        <p className="mb-6 flex items-center gap-2.5 font-mono text-[11px] tracking-[0.18em] text-mist-500 uppercase">
          <span className="relative grid h-1.5 w-1.5 place-items-center">
            <span className="absolute h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="absolute h-1.5 w-1.5 animate-ping rounded-full bg-emerald-400" />
          </span>
          Open to internships &amp; junior roles
        </p>

        <SplitText
          tag="h1"
          text={profile.name}
          className="font-display text-[clamp(3.5rem,15vw,11rem)] leading-[0.86] font-bold tracking-[-0.04em]"
          textAlign="left"
          splitType="chars"
          delay={60}
          duration={1.1}
          ease="power4.out"
          from={{ opacity: 0, y: 90, rotateX: -70 }}
          to={{ opacity: 1, y: 0, rotateX: 0 }}
          threshold={0.05}
          rootMargin="0px"
        />

        <div className="mt-7 max-w-2xl space-y-5">
          <TextType
            as="p"
            text={[...profile.roles]}
            className="font-display text-[clamp(1.15rem,3.4vw,1.9rem)] font-medium tracking-tight text-mist-100"
            cursorClassName="text-cyan-glow"
            typingSpeed={55}
            deletingSpeed={28}
            pauseDuration={2200}
          />

          <ShinyText
            text={profile.tagline}
            speed={4}
            color="#7b8199"
            shineColor="#eceef5"
            spread={110}
            className="block max-w-xl text-[15px] leading-relaxed sm:text-base"
          />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <StarBorder
            as="a"
            href="#projects"
            color="#22d3ee"
            speed="5s"
            thickness={1.5}
            backgroundColor="#0a0b12"
            className="font-mono text-[12px] tracking-wide uppercase"
          >
            View my work
          </StarBorder>

          <a
            href={`mailto:${profile.email}`}
            className="rounded-[20px] px-6 py-[17px] font-mono text-[12px] tracking-wide text-mist-300 uppercase ring-1 ring-white/12 transition-colors duration-300 hover:bg-white/5 hover:text-mist-100"
          >
            Say hello
          </a>
        </div>

        <ul className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-2">
          {socials.map(s => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                className="group inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.14em] text-mist-500 uppercase transition-colors hover:text-mist-100"
              >
                {s.label}
                <span aria-hidden className="transition-transform duration-300 group-hover:translate-x-0.5">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-mist-500 transition-colors hover:text-mist-100 sm:flex"
      >
        <span className="font-mono text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <span aria-hidden className="h-8 w-px bg-gradient-to-b from-mist-500 to-transparent" />
      </a>
    </section>
  );
}

/**
 * Static stand-in for the WebGL aurora: shown while `ogl` loads, and kept
 * permanently if the GL context is unavailable. Same palette, no canvas.
 */
function AuroraFallback() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 h-[70vh] w-[120vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,#5227ff_0%,transparent_62%)] blur-3xl" />
      <div className="absolute -top-1/4 left-[22%] h-[55vh] w-[70vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,#22d3ee_0%,transparent_66%)] opacity-70 blur-3xl" />
    </div>
  );
}
