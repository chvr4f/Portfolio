import AnimatedContent from '@/components/AnimatedContent';
import GlareHover from '@/components/GlareHover';
import GradientHeading from '@/components/layout/GradientHeading';
import { timeline } from '@/data/content';

/**
 * Education + experience. Lives inside the About section rather than owning a
 * top-level section, so every scroll position maps to one of the five rail items.
 *
 * Each entry is a glass card with a diagonal glare sweep on hover (React Bits
 * GlareHover), matching the About card above it. The spine and nodes stay: they
 * are what makes this read as a chronology rather than a pile of cards.
 */
export default function Timeline() {
  return (
    <div className="mt-20 sm:mt-28">
      <GradientHeading as="h3" size="sub">
        Education &amp; Experience
      </GradientHeading>

      <ol className="relative">
        {/* Spine */}
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-violet-glow/60 via-white/10 to-transparent sm:left-[calc(9rem+7px)]"
        />

        {/* The spacing sits on the <li>, not on the inner div: that div is the
            only child of its AnimatedContent wrapper, so `last:pb-0` there
            matched every entry and flattened the gap between all of them. An
            <li> is a real last-child of the <ol>. */}
        {timeline.map((entry, i) => (
          <li key={`${entry.title}-${entry.period}`} className="pb-10 last:pb-0">
            <AnimatedContent distance={45} duration={0.85} delay={i * 0.08} threshold={0.15}>
              <div className="relative flex flex-col gap-2 pl-9 sm:flex-row sm:gap-8 sm:pl-0">
                <span className="shrink-0 pt-4 font-mono text-[11px] tracking-[0.1em] text-mist-500 uppercase sm:w-36 sm:pr-8 sm:text-right">
                  {entry.period}
                </span>

                {/* Node */}
                <span
                  aria-hidden
                  className={`absolute top-5 left-0 grid h-[15px] w-[15px] place-items-center rounded-full ring-4 ring-ink-950 sm:left-36 ${
                    entry.kind === 'experience' ? 'bg-violet-glow' : 'bg-ink-600'
                  }`}
                >
                  <span className="h-1 w-1 rounded-full bg-ink-950/70" />
                </span>

                <div className="min-w-0 flex-1 sm:pl-8">
                  <GlareHover
                    width="100%"
                    height="auto"
                    borderRadius="16px"
                    background={
                      entry.kind === 'experience'
                        ? 'rgba(82, 39, 255, 0.07)'
                        : 'rgba(255, 255, 255, 0.035)'
                    }
                    borderColor={
                      entry.kind === 'experience'
                        ? 'rgba(82, 39, 255, 0.28)'
                        : 'rgba(255, 255, 255, 0.10)'
                    }
                    glareColor="#22d3ee"
                    glareOpacity={0.18}
                    glareSize={220}
                    transitionDuration={750}
                    // These go through `style` rather than className because the
                    // component's own classes set `grid place-items-center` and
                    // `cursor-pointer`: inline wins, and a text card needs to
                    // flow left-aligned and not pretend to be clickable.
                    //
                    // `justifyItems` is the non-obvious one. Chrome applies box
                    // alignment to block layout, not just grid, so the
                    // `place-items-center` class kept centring every child as a
                    // shrink-to-fit box even with `display: block` — titles and
                    // chips sat centred while wrapped paragraphs looked
                    // left-aligned. `stretch` is the block default.
                    style={{ display: 'block', justifyItems: 'stretch', cursor: 'default' }}
                    className="p-5 backdrop-blur-sm transition-colors duration-500 hover:border-white/25 sm:p-6"
                  >
                    <h4 className="font-display text-lg leading-snug font-semibold tracking-tight text-mist-100 sm:text-xl">
                      {entry.title}
                    </h4>
                    <p className="mt-1 text-sm text-violet-glow">{entry.org}</p>

                    {entry.description && (
                      <p className="mt-3 text-[14.5px] leading-relaxed text-mist-500">
                        {entry.description}
                      </p>
                    )}

                    {entry.highlights && (
                      <ul className="mt-3 space-y-1.5">
                        {entry.highlights.map(point => (
                          <li
                            key={point}
                            className="relative pl-4 text-[14.5px] leading-relaxed text-mist-500 before:absolute before:top-[0.7em] before:left-0 before:h-1 before:w-1 before:rounded-full before:bg-cyan-glow/70"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}

                    {entry.tech && (
                      <ul className="mt-4 flex flex-wrap gap-1.5">
                        {entry.tech.map(t => (
                          <li
                            key={t}
                            className="rounded-full border border-cyan-glow/25 bg-cyan-glow/10 px-2.5 py-0.5 font-mono text-[10.5px] tracking-[0.08em] text-cyan-glow/90 uppercase"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </GlareHover>
                </div>
              </div>
            </AnimatedContent>
          </li>
        ))}
      </ol>
    </div>
  );
}
