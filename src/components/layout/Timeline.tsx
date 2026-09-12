import AnimatedContent from '@/components/AnimatedContent';
import { timeline } from '@/data/content';

/**
 * Education + experience. Lives inside the About section rather than owning a
 * top-level section, so every scroll position maps to one of the five rail items.
 */
export default function Timeline() {
  return (
    <div className="mt-20 sm:mt-28">
      <AnimatedContent distance={40} duration={0.9} threshold={0.15}>
        <h3 className="mb-10 font-mono text-[11px] tracking-[0.2em] text-mist-500 uppercase">
          Education &amp; experience
        </h3>
      </AnimatedContent>

      <ol className="relative">
        {/* Spine */}
        <span
          aria-hidden
          className="absolute top-2 bottom-2 left-[7px] w-px bg-gradient-to-b from-violet-glow/60 via-white/10 to-transparent sm:left-[calc(9rem+7px)]"
        />

        {timeline.map((entry, i) => (
          <li key={`${entry.title}-${entry.period}`}>
            <AnimatedContent distance={45} duration={0.85} delay={i * 0.08} threshold={0.15}>
              <div className="relative flex flex-col gap-1.5 pb-14 pl-9 last:pb-0 sm:flex-row sm:gap-8 sm:pl-0">
                <span className="shrink-0 pt-0.5 font-mono text-[11px] tracking-[0.1em] text-mist-500 uppercase sm:w-36 sm:pr-8 sm:text-right">
                  {entry.period}
                </span>

                {/* Node */}
                <span
                  aria-hidden
                  className={`absolute top-1.5 left-0 grid h-[15px] w-[15px] place-items-center rounded-full ring-4 ring-ink-950 sm:left-36 ${
                    entry.kind === 'experience' ? 'bg-violet-glow' : 'bg-ink-600'
                  }`}
                >
                  <span className="h-1 w-1 rounded-full bg-ink-950/70" />
                </span>

                <div className="sm:pl-8">
                  <h4 className="font-display text-lg leading-snug font-semibold tracking-tight text-mist-100 sm:text-xl">
                    {entry.title}
                  </h4>
                  <p className="mt-0.5 text-sm text-violet-glow">{entry.org}</p>
                  <p className="mt-2.5 max-w-xl text-[14.5px] leading-relaxed text-mist-500">
                    {entry.description}
                  </p>
                </div>
              </div>
            </AnimatedContent>
          </li>
        ))}
      </ol>
    </div>
  );
}
