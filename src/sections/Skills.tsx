import { lazy, Suspense, useState } from 'react';
import LogoLoop from '@/components/LogoLoop';
import AnimatedContent from '@/components/AnimatedContent';
import GradientHeading from '@/components/layout/GradientHeading';
import CanvasBoundary from '@/components/layout/CanvasBoundary';
import TechTile from '@/components/layout/TechIcon';
import { learning, techStack } from '@/data/content';

// WebGL and purely decorative, like the hero's DarkVeil and About's LightRays.
const SoftAurora = lazy(() => import('@/components/SoftAurora'));
// gsap-driven and pointer-only, so it is no use until the page is interactive.
const TargetCursor = lazy(() => import('@/components/TargetCursor'));

const techLogos = techStack.map(name => ({
  node: <TechTile name={name} />,
  title: name,
  ariaLabel: name,
}));

export default function Skills() {
  const [cursorOnLoop, setCursorOnLoop] = useState(false);

  return (
    <section
      id="skills"
      className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:pl-52 xl:pl-72"
    >
      <div className="mx-auto max-w-6xl">
        <GradientHeading lede="Crafting digital experiences with cutting-edge technologies and proven expertise.">
          Skills &amp; Expertise
        </GradientHeading>
      </div>

      <div className="relative">
        {/* The aurora glows under the tiles and bleeds behind the card.
            Much wider than this column so it runs the full width of the
            window, sidebar included — the section's overflow-hidden trims it.
            Its ribbon draws across the middle of the canvas, so the canvas is
            pulled up until that line sits just below the tiles, and a mask
            fades the top and bottom so no edge of the canvas ever shows.

            Not pointer-events-none, unlike the page's other backdrops:
            SoftAurora listens for mousemove on its own canvas. It sits at
            -z-10 with no click handlers, so the only events it takes are ones
            that would have hit the page background anyway. Boundary-wrapped
            because ogl throws outright without a GL context. */}
        <div
          aria-hidden
          className="absolute top-[-13rem] left-1/2 -z-10 h-[44rem] w-[160vw] -translate-x-1/2 [mask-image:linear-gradient(to_bottom,transparent,black_30%,black_70%,transparent)]"
        >
          <CanvasBoundary fallback={null}>
            <Suspense fallback={null}>
              {/* Stock React Bits settings, except the band: bandSpread is
                  the rate the glow falls off either side of the ribbon, so
                  halving it roughly doubles how wide the shading spreads.
                  That also halves the peak, which brightness buys back. */}
              <SoftAurora
                speed={0.6}
                scale={1.5}
                brightness={1.5}
                color1="#f7f7f7"
                color2="#e100ff"
                noiseFrequency={2.5}
                noiseAmplitude={1}
                bandHeight={0.5}
                bandSpread={0.5}
                octaveDecay={0.1}
                layerOffset={0}
                colorSpeed={1}
                enableMouseInteraction
                mouseInfluence={0.25}
              />
            </Suspense>
          </CanvasBoundary>
        </div>

        {/* TargetCursor hides the window's cursor for as long as it is
            mounted, which would be the whole page — so it is mounted only
            while the pointer is over the marquee, and its cleanup puts the
            cursor back on the way out. */}
        <div
          id="tech-loop"
          className="py-4"
          onPointerEnter={e => e.pointerType === 'mouse' && setCursorOnLoop(true)}
          onPointerLeave={() => setCursorOnLoop(false)}
        >
          {cursorOnLoop && (
            <Suspense fallback={null}>
              <TargetCursor targetSelector="#tech-loop .cursor-target" spinDuration={2.4} cursorColor="#3B82F6" />
            </Suspense>
          )}
          {/* No fadeOut: its edge gradients are solid page colour, which would
              paint dark blocks over the aurora glowing behind. */}
          {/* LogoLoop clips on the x axis, which clips y as well, so the
              tooltips above the tiles need room inside it: the padding makes
              that room and the negative margin gives the space back.
              No scaleOnHover — it grew the tile after the cursor had framed
              it. */}
          <LogoLoop
            logos={techLogos}
            speed={38}
            direction="left"
            logoHeight={64}
            gap={18}
            pauseOnHover
            className="-my-12 py-12"
            ariaLabel="Technologies I work with"
          />
        </div>

        <AnimatedContent distance={50} duration={0.9} threshold={0.15}>
          <div className="mx-auto mt-24 max-w-4xl rounded-3xl border border-white/10 bg-ink-950/55 px-6 py-10 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md sm:mt-28 sm:px-12 sm:py-12">
            <h3 className="m-0 font-display text-2xl font-bold text-white sm:text-3xl">
              {learning.title}
            </h3>
            <p className="mx-auto mt-5 max-w-3xl leading-relaxed text-gray-300 sm:text-lg">
              {learning.text}
            </p>
            <ul className="mt-8 flex flex-wrap justify-center gap-3">
              {learning.topics.map(topic => (
                <li
                  key={topic}
                  className="rounded-full border border-blue-400/25 bg-blue-500/10 px-4 py-2 text-sm text-blue-200/90"
                >
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        </AnimatedContent>
      </div>
    </section>
  );
}
