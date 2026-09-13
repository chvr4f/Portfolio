import { navLinks } from '@/data/content';

/** Height of one slot in the wheel, in px. The frame shows three. */
const ITEM_H = 62;
const VISIBLE = 3;

/** Height of the highlight band behind the focused row. */
const HIGHLIGHT_H = 42;

/** Spacing between minor ticks, in section units (8 ticks per section). */
const TICK_STEP = 0.125;

/**
 * The tick ring is a flourish and costs ~58px of gutter, so it only appears at
 * xl and up; below that the viewfinder stands alone and the gutter tightens.
 */

/**
 * Fisheye strength for the tick ring. Positions are warped through tanh, so
 * ticks near the focus sit at their true spacing and progressively compress
 * toward the ends — the way marks on a lens barrel bunch up as it curves away.
 */
const LENS_K = 1.9;

type Props = {
  /** Continuous scroll position across sections, e.g. 2.4 = 40% from Projects to Skills. */
  position: number;
};

type Tick = { v: number; kind: 'major' | 'half' | 'minor' };

/** One tick per TICK_STEP across the whole range, plus half a section of overrun. */
const TICKS: Tick[] = (() => {
  const out: Tick[] = [];
  const last = navLinks.length - 1;
  for (let v = -0.5; v <= last + 0.5 + 1e-9; v += TICK_STEP) {
    const nearest = Math.round(v);
    const kind =
      Math.abs(v - nearest) < 1e-6 ? 'major' : Math.abs(v - nearest) === 0.5 ? 'half' : 'minor';
    out.push({ v: +v.toFixed(3), kind });
  }
  return out;
})();

export default function CameraNav({ position }: Props) {
  const frameH = ITEM_H * VISIBLE;
  const half = frameH / 2;
  const activeIndex = Math.round(position);

  return (
    <nav aria-label="Section navigation" className="flex items-stretch gap-4">
      {/* ── Lens barrel: magnified tick ring ───────────────────────────── */}
      <div
        aria-hidden
        className="relative hidden w-[42px] overflow-hidden xl:block"
        style={{
          height: frameH,
          maskImage: 'linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, #000 18%, #000 82%, transparent)',
        }}
      >
        {TICKS.map(({ v, kind }) => {
          const offset = v - position;
          if (Math.abs(offset) > 3) return null;

          // Fisheye: linear near the focus, compressing toward the edges.
          const y = half + LENS_K * Math.tanh(offset / LENS_K) * ITEM_H;
          if (y < -8 || y > frameH + 8) return null;

          // Magnification falls off smoothly with distance from the focus.
          const mag = 1 / Math.cosh(offset * 0.95);
          const base = kind === 'major' ? 20 : kind === 'half' ? 13 : 7;
          const len = base * (0.4 + mag);
          const isFocus = kind === 'major' && Math.abs(offset) < 0.12;

          return (
            <span
              key={v}
              className="absolute right-0 rounded-full"
              style={{
                top: `${y}px`,
                width: `${len}px`,
                height: kind === 'major' ? 1.5 : 1,
                background: isFocus ? 'var(--color-cyan-glow)' : '#ffffff',
                opacity:
                  (kind === 'major' ? 0.3 + 0.7 * mag : kind === 'half' ? 0.2 + 0.5 * mag : 0.12 + 0.35 * mag),
                boxShadow: isFocus ? '0 0 10px 1px rgba(34,211,238,0.7)' : undefined,
                transform: 'translateY(-50%)',
              }}
            />
          );
        })}
      </div>

      {/* ── Viewfinder ─────────────────────────────────────────────────── */}
      <div className="relative" style={{ height: frameH, width: 150 }}>
        {/* Highlight behind the focused row. Sits under the wheel (which is a
            later, positioned sibling) so the label stays fully legible. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 z-0 rounded-lg"
          style={{
            // Deliberately shorter than a full slot so the highlight hugs the
            // label instead of floating around it.
            top: (frameH - HIGHLIGHT_H) / 2,
            height: HIGHLIGHT_H,
            background:
              'linear-gradient(90deg, rgba(34,211,238,0.20) 0%, rgba(34,211,238,0.07) 46%, transparent 86%)',
          }}
        />

        {/* The wheel */}
        <div
          className="relative z-10 h-full overflow-hidden"
          style={{
            maskImage: 'linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)',
            WebkitMaskImage:
              'linear-gradient(to bottom, transparent, #000 20%, #000 80%, transparent)',
          }}
        >
          <ul className="absolute inset-x-0 top-0">
            {navLinks.map((link, i) => {
              const d = Math.abs(i - position);
              const isActive = i === activeIndex;
              return (
                <li
                  key={link.href}
                  className="absolute inset-x-0 flex items-center"
                  style={{
                    height: ITEM_H,
                    top: `${half - ITEM_H / 2 + (i - position) * ITEM_H}px`,
                    opacity: Math.max(0, 1 - d * 0.62),
                    transform: `scale(${1 - Math.min(d, 2) * 0.12})`,
                    transformOrigin: 'left center',
                  }}
                >
                  <a
                    href={link.href}
                    aria-current={isActive ? 'page' : undefined}
                    className="flex items-center px-4 focus:outline-none"
                    tabIndex={d > 1.5 ? -1 : 0}
                  >
                    <span
                      className={`font-display text-[15px] font-medium tracking-[0.12em] whitespace-nowrap uppercase transition-colors duration-300 ${
                        isActive ? 'text-mist-100' : 'text-mist-300'
                      }`}
                    >
                      {link.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </nav>
  );
}
