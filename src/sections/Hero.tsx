import { lazy, Suspense } from 'react';
import GlitchText from '@/components/GlitchText';
import RotatingText from '@/components/RotatingText';
import AnimatedContent from '@/components/AnimatedContent';
import DecryptedText from '@/components/DecryptedText';
import SpecularButton from '@/components/SpecularButton';
import CanvasBoundary from '@/components/layout/CanvasBoundary';
import useAppLoaded from '@/hooks/useAppLoaded';
import SocialIcon from '@/components/layout/SocialIcon';
import { profile, socials } from '@/data/content';

// ogl is ~70 kB of WebGL runtime and purely decorative — keep it off the
// critical path so the headline paints first.
const DarkVeil = lazy(() => import('@/components/DarkVeil'));

export default function Hero() {
  // The decrypt is the one hero animation long enough to be wasted behind the
  // boot overlay, so it waits for the handoff instead of starting at mount.
  const loaded = useAppLoaded();

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

        {/* Scrambles through random glyphs and resolves into the real copy.

            The hidden copy underneath reserves the box. Random glyphs are wider
            than the real ones, so without it the scrambled text wrapped to an
            extra line — and in a vertically-centred section that rocked the
            name up and the buttons down by 18px for the whole animation.
            `useOriginalCharsOnly` draws the scramble from the tagline's own
            characters instead of a set full of wide symbols, which keeps the
            wrapping close to the finished text. It can still run one line long
            mid-scramble; that line falls into the gap above the buttons and
            nothing below it moves, because the box is fixed. */}
        <div className="relative mt-6 max-w-xl text-[clamp(1rem,2.2vw,1.4rem)] leading-relaxed">
          <p aria-hidden className="invisible">
            {profile.tagline}
          </p>
          <p className="absolute inset-0 text-gray-400">
            {loaded && (
              <DecryptedText
                text={profile.tagline}
                animateOn="view"
                sequential
                revealDirection="start"
                useOriginalCharsOnly
                // 150 chars revealed one per tick, so this is ms-per-character:
                // ~3.7s end to end.
                speed={25}
                maxIterations={10}
                encryptedClassName="text-cyan-glow/60"
              />
            )}
          </p>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          {/* Both carry an href, so they render as anchors rather than the
              component's default <button> — see the note on SpecularButton. */}
          <SpecularButton
            href="#projects"
            lineColor="#22d3ee"
            baseColor="#3b2f7a"
            intensity={1.15}
            className="font-mono text-[12px] tracking-wide uppercase"
          >
            View my work
          </SpecularButton>

          <SpecularButton
            href={`mailto:${profile.email}`}
            lineColor="#a78bfa"
            baseColor="#3f3f46"
            intensity={0.85}
            textColor="#c9cbd6"
            className="font-mono text-[12px] tracking-wide uppercase"
          >
            Say hello
          </SpecularButton>
        </div>

        {/* Icon-only, so each link carries its name for screen readers. The
            44px box is the pointer target — the mark itself is smaller. */}
        <ul className="mt-12 -ml-3 flex flex-wrap items-center gap-1">
          {socials.map(s => (
            <li key={s.label}>
              <a
                href={s.href}
                target={s.href.startsWith('http') ? '_blank' : undefined}
                rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                aria-label={s.label}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-mist-500 transition-all duration-300 hover:bg-white/5 hover:text-cyan-glow focus-visible:bg-white/5 focus-visible:text-cyan-glow"
              >
                <SocialIcon name={s.icon} className="h-5 w-5" />
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
