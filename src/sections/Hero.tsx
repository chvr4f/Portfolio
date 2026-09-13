import { lazy, Suspense } from 'react';
import GlitchText from '@/components/GlitchText';
import RotatingText from '@/components/RotatingText';
import AnimatedContent from '@/components/AnimatedContent';
import DecryptedText from '@/components/DecryptedText';
import StarBorder from '@/components/StarBorder';
import CanvasBoundary from '@/components/layout/CanvasBoundary';
import { profile, socials } from '@/data/content';

// ogl is ~70 kB of WebGL runtime and purely decorative — keep it off the
// critical path so the headline paints first.
const DarkVeil = lazy(() => import('@/components/DarkVeil'));

export default function Hero() {
  return (
    <section
      id="home"
      className="grain relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden px-6 lg:pl-52 xl:pl-72"
    >
      {/* DarkVeil (WebGL). Wrapped in a boundary because a failed GL context
          throws during init and would otherwise blank the entire page. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <CanvasBoundary fallback={<Backdrop />}>
          <Suspense fallback={<Backdrop />}>
            <DarkVeil speed={0.4} hueShift={12} warpAmount={0.6} noiseIntensity={0.02} resolutionScale={1} />
          </Suspense>
        </CanvasBoundary>
      </div>

      {/* Fade the aurora into the page so the section seam disappears */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-64 bg-gradient-to-b from-transparent to-ink-950"
      />

      <div className="mx-auto w-full max-w-6xl pt-24 pb-20">
        {/* GlitchText renders a <div>, which cannot live inside an <h1>, so the
            heading is carried by a visually-hidden one for semantics and SEO. */}
        <h1 className="sr-only">{profile.name} — front-end developer</h1>

        <AnimatedContent distance={30} duration={0.8}>
          <p className="mb-2 font-display text-[clamp(1.35rem,3vw,1.9rem)] font-medium text-mist-300">
            Hello, I&apos;m
          </p>
        </AnimatedContent>
        <GlitchText
          speed={1}
          enableShadows
          className="glitch bg-gradient-to-r from-blue-400 via-purple-500 to-blue-600 bg-clip-text font-display text-[clamp(2.75rem,10vw,7rem)] leading-[0.9] font-bold tracking-[-0.035em] text-transparent"
        >
          {profile.name}
        </GlitchText>

        <div className="mt-7 max-w-2xl">
          <div className="flex flex-col items-start gap-2 font-display text-[1.25rem] font-semibold text-gray-200 sm:text-[1.45rem] md:flex-row md:items-center md:gap-3 md:text-[1.7rem]">
            <span>I&apos;m a</span>
            <RotatingText
              texts={[...profile.roles]}
              mainClassName="inline-block overflow-hidden rounded-lg bg-cyan-glow px-2.5 py-0.5 text-ink-950 shadow-[0_0_28px_rgba(34,211,238,0.32)]"
              splitLevelClassName="inline-flex overflow-hidden"
              splitBy="characters"
              staggerFrom="first"
              staggerDuration={0.008}
              rotationInterval={3000}
              // Left on the default 'wait' mode: 'sync' keeps both the outgoing
              // and incoming word mounted, and because they sit in normal flow
              // the highlight box doubles in height.
              exit={{ y: '-110%', opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Scrambles through random glyphs and resolves into the real copy. */}
        <p className="mt-6 max-w-xl text-[clamp(1rem,2.2vw,1.4rem)] leading-relaxed text-gray-400">
          <DecryptedText
            text={profile.tagline}
            animateOn="view"
            sequential
            revealDirection="start"
            // ~160 chars revealed sequentially: keep this low or the intro
            // paragraph stays unreadable for several seconds.
            speed={11}
            maxIterations={10}
            encryptedClassName="text-cyan-glow/60"
          />
        </p>

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

    </section>
  );
}

/**
 * Static stand-in for DarkVeil: layered radial glows in the site palette,
 * shown while `ogl` loads and kept permanently if WebGL is unavailable.
 */
function Backdrop() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="absolute -top-1/3 left-1/2 h-[75vh] w-[125vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,#5227ff_0%,transparent_62%)] opacity-55 blur-3xl" />
      <div className="absolute -top-1/4 left-[24%] h-[58vh] w-[72vw] -translate-x-1/2 rounded-[50%] bg-[radial-gradient(ellipse_at_center,#22d3ee_0%,transparent_66%)] opacity-40 blur-3xl" />
      <div className="absolute top-[8%] right-[-10%] h-[45vh] w-[55vw] rounded-[50%] bg-[radial-gradient(ellipse_at_center,#7c3aed_0%,transparent_70%)] opacity-30 blur-3xl" />
    </div>
  );
}
