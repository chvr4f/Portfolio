import { navLinks } from '@/data/content';

type Props = {
  activeIndex: number;
  progress: number;
};

/**
 * Vertical dot rail. At rest it is a ~7px column of dots, so the page keeps
 * almost its full width; the number + label slide out only for the active
 * section and for whichever dot is hovered or focused.
 */
export default function DotRail({ activeIndex, progress }: Props) {
  return (
    <nav aria-label="Section navigation" className="relative">
      {/* Hairline track behind the dots, filled to match scroll progress.
          left-[3px] centres it on the 7px dots. */}
      <span aria-hidden className="absolute top-3 bottom-3 left-[3px] w-px bg-white/10">
        <span
          className="block w-px bg-gradient-to-b from-violet-glow to-cyan-glow transition-[height] duration-300 ease-out"
          style={{ height: `${progress * 100}%` }}
        />
      </span>

      <ul className="relative flex flex-col">
        {navLinks.map((link, i) => {
          const isActive = i === activeIndex;
          return (
            <li key={link.href}>
              <a
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className="group flex items-center py-2.5 focus:outline-none"
              >
                {/* Dot */}
                <span
                  aria-hidden
                  className={`relative z-10 block h-[7px] w-[7px] shrink-0 rounded-full transition-all duration-400 ease-out ${
                    isActive
                      ? 'scale-[1.6] bg-cyan-glow shadow-[0_0_14px_3px_rgba(34,211,238,0.45)]'
                      : 'bg-white/25 group-hover:bg-white/70 group-focus-visible:bg-white/70'
                  }`}
                />

                {/* Label — collapsed to zero width until active/hovered/focused */}
                <span
                  className={`flex items-center overflow-hidden whitespace-nowrap transition-all duration-400 ease-out ${
                    isActive
                      ? 'max-w-[220px] opacity-100'
                      : 'max-w-0 opacity-0 group-hover:max-w-[220px] group-hover:opacity-100 group-focus-visible:max-w-[220px] group-focus-visible:opacity-100'
                  }`}
                >
                  <span
                    aria-hidden
                    className={`ml-2.5 h-px w-2.5 shrink-0 transition-colors duration-400 ${
                      isActive ? 'bg-cyan-glow' : 'bg-white/30'
                    }`}
                  />
                  <span
                    className={`ml-2.5 font-mono text-[10px] tabular-nums transition-colors duration-400 ${
                      isActive ? 'text-cyan-glow' : 'text-mist-500'
                    }`}
                  >
                    {link.num}
                  </span>
                  <span
                    className={`ml-1.5 font-mono text-[10px] tracking-[0.14em] uppercase transition-colors duration-400 ${
                      isActive ? 'text-mist-100' : 'text-mist-300'
                    }`}
                  >
                    {link.label}
                  </span>
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
