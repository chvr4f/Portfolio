import MagicBento from '@/components/MagicBento';
import LogoLoop from '@/components/LogoLoop';
import SectionHeading from '@/components/layout/SectionHeading';
import { skills, techStack } from '@/data/content';

// Render the stack as type rather than logo images — no asset wrangling,
// and it keeps the marquee crisp at any resolution.
const techLogos = techStack.map(name => ({
  node: (
    <span className="font-display text-[clamp(1.1rem,2.4vw,1.6rem)] font-medium tracking-tight whitespace-nowrap text-mist-500 transition-colors duration-300 hover:text-mist-100">
      {name}
    </span>
  ),
  title: name,
  ariaLabel: name,
}));

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-24 sm:py-32 lg:pl-44">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04 / Skills"
          title="What I reach for"
          lede="Hover a tile — the grid responds. Everything here is something I have actually shipped with, not just read about."
        />

        <MagicBento
          cards={skills}
          glowColor="82, 39, 255"
          spotlightRadius={340}
          particleCount={10}
          enableStars
          enableSpotlight
          enableBorderGlow
          enableTilt={false}
          enableMagnetism
          clickEffect
          textAutoHide={false}
        />
      </div>

      <div className="mt-20 border-y border-white/6 py-8 sm:mt-28">
        <LogoLoop
          logos={techLogos}
          speed={38}
          direction="left"
          logoHeight={34}
          gap={64}
          pauseOnHover
          scaleOnHover
          fadeOut
          fadeOutColor="#05060a"
          ariaLabel="Technologies I work with"
        />
      </div>
    </section>
  );
}
