import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export interface ChromaItem {
  image: string;
  title: string;
  subtitle: string;
  handle?: string;
  location?: string;
  borderColor?: string;
  gradient?: string;
  url?: string;
  /**
   * LOCAL ADDITION. Stack shown under the description as a dot-separated line.
   * Upstream only has `handle`/`location`, which are short labels.
   */
  tech?: string[];
}

export interface ChromaGridProps {
  items?: ChromaItem[];
  className?: string;
  radius?: number;
  damping?: number;
  fadeOut?: number;
  ease?: string;
  /**
   * LOCAL ADDITION. Upstream greys out everything outside a circle around the
   * pointer — and everything, until the pointer arrives. Off, every card stays
   * in full colour and only the per-card spotlight and accent border react.
   */
  desaturate?: boolean;
  /**
   * LOCAL ADDITION. When given, a card reports its index instead of opening
   * `url` — the caller decides what a click means (here: open the dialog).
   */
  onCardSelect?: (index: number) => void;
}

type SetterFn = (v: number | string) => void;

const ChromaGrid: React.FC<ChromaGridProps> = ({
  items,
  className = '',
  radius = 300,
  damping = 0.45,
  fadeOut = 0.6,
  ease = 'power3.out',
  desaturate = true,
  onCardSelect
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);
  const setX = useRef<SetterFn | null>(null);
  const setY = useRef<SetterFn | null>(null);
  const pos = useRef({ x: 0, y: 0 });

  const demo: ChromaItem[] = [
    {
      image: 'https://i.pravatar.cc/300?img=8',
      title: 'Alex Rivera',
      subtitle: 'Full Stack Developer',
      handle: '@alexrivera',
      borderColor: '#4F46E5',
      gradient: 'linear-gradient(145deg,#4F46E5,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=11',
      title: 'Jordan Chen',
      subtitle: 'DevOps Engineer',
      handle: '@jordanchen',
      borderColor: '#10B981',
      gradient: 'linear-gradient(210deg,#10B981,#000)',
      url: 'https://linkedin.com/in/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=3',
      title: 'Morgan Blake',
      subtitle: 'UI/UX Designer',
      handle: '@morganblake',
      borderColor: '#F59E0B',
      gradient: 'linear-gradient(165deg,#F59E0B,#000)',
      url: 'https://dribbble.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=16',
      title: 'Casey Park',
      subtitle: 'Data Scientist',
      handle: '@caseypark',
      borderColor: '#EF4444',
      gradient: 'linear-gradient(195deg,#EF4444,#000)',
      url: 'https://kaggle.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=25',
      title: 'Sam Kim',
      subtitle: 'Mobile Developer',
      handle: '@thesamkim',
      borderColor: '#8B5CF6',
      gradient: 'linear-gradient(225deg,#8B5CF6,#000)',
      url: 'https://github.com/'
    },
    {
      image: 'https://i.pravatar.cc/300?img=60',
      title: 'Tyler Rodriguez',
      subtitle: 'Cloud Architect',
      handle: '@tylerrod',
      borderColor: '#06B6D4',
      gradient: 'linear-gradient(135deg,#06B6D4,#000)',
      url: 'https://aws.amazon.com/'
    }
  ];

  const data = items?.length ? items : demo;

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    setX.current = gsap.quickSetter(el, '--x', 'px') as SetterFn;
    setY.current = gsap.quickSetter(el, '--y', 'px') as SetterFn;
    const { width, height } = el.getBoundingClientRect();
    pos.current = { x: width / 2, y: height / 2 };
    setX.current(pos.current.x);
    setY.current(pos.current.y);
  }, []);

  const moveTo = (x: number, y: number) => {
    gsap.to(pos.current, {
      x,
      y,
      duration: damping,
      ease,
      onUpdate: () => {
        setX.current?.(pos.current.x);
        setY.current?.(pos.current.y);
      },
      overwrite: true
    });
  };

  const handleMove = (e: React.PointerEvent) => {
    const r = rootRef.current!.getBoundingClientRect();
    moveTo(e.clientX - r.left, e.clientY - r.top);
    if (fadeRef.current) gsap.to(fadeRef.current, { opacity: 0, duration: 0.25, overwrite: true });
  };

  const handleLeave = () => {
    if (!fadeRef.current) return;
    gsap.to(fadeRef.current, {
      opacity: 1,
      duration: fadeOut,
      overwrite: true
    });
  };

  // LOCAL: with a select handler the card opens the dialog; without one it
  // falls back to upstream's behaviour of opening the link.
  const handleCardClick = (index: number, url?: string) => {
    if (onCardSelect) onCardSelect(index);
    else if (url) window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCardMove: React.MouseEventHandler<HTMLElement> = e => {
    const c = e.currentTarget as HTMLElement;
    const rect = c.getBoundingClientRect();
    c.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    c.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      ref={rootRef}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      // LOCAL: upstream is a centred flex-wrap of fixed 300px cards, so rows
      // come out ragged. A grid gives equal columns and, because grid items
      // stretch, equal card heights along each row.
      className={`relative grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 ${className}`}
      style={
        {
          '--r': `${radius}px`,
          '--x': '50%',
          '--y': '50%'
        } as React.CSSProperties
      }
    >
      {data.map((c, i) => (
        <article
          key={i}
          onMouseMove={handleCardMove}
          onClick={() => handleCardClick(i, c.url)}
          // LOCAL: a card that does something is reachable by keyboard and
          // announces itself; upstream leaves it a plain div with an onClick.
          {...(onCardSelect || c.url
            ? {
                role: 'button',
                tabIndex: 0,
                'aria-haspopup': onCardSelect ? ('dialog' as const) : undefined,
                onKeyDown: (e: React.KeyboardEvent) => {
                  if (e.key !== 'Enter' && e.key !== ' ') return;
                  e.preventDefault();
                  handleCardClick(i, c.url);
                }
              }
            : {})}
          // LOCAL: upstream hardcodes cursor-pointer and wires the click either
          // way, so a card with no url invites a click that does nothing.
          className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0d1224]/85 transition-colors duration-300 hover:border-[var(--card-border)] focus-visible:border-[var(--card-border)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--card-border)] ${
            onCardSelect || c.url ? 'cursor-pointer' : 'cursor-default'
          }`}
          style={
            {
              '--card-border': c.borderColor || 'rgba(255,255,255,0.2)',
              '--spotlight-color': 'rgba(255,255,255,0.14)'
            } as React.CSSProperties
          }
        >
          {/* LOCAL: upstream paints the gradient as the whole card background,
              which washes the text in colour. Here it is a faint hover tint. */}
          {c.gradient && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-[0.14]"
              style={{ background: c.gradient }}
            />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{
              background:
                'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 70%)'
            }}
          />
          <div className="relative z-10 p-3">
            <img
              src={c.image}
              alt={c.title}
              loading="lazy"
              className="aspect-[19/10] w-full rounded-xl object-cover"
            />
          </div>
          {/* LOCAL: every text block below is clamped AND floored to the same
              height, so the title, the description and the stack each start on
              the same line in every card — with or without a neighbour whose
              title runs to two lines. mt-auto then pins the whole block to the
              bottom, which keeps the images level too. */}
          <footer className="relative z-10 mt-auto flex flex-col gap-2 px-5 pt-2 pb-5 text-white">
            <div className="flex items-baseline justify-between gap-3">
              {/* No height floor here on purpose. The footer is pinned to the
                  bottom, so the blocks below already line up across cards; a
                  two-line floor would only open an empty line under every
                  single-line title. */}
              <h3 className="m-0 line-clamp-2 font-display text-xl leading-tight font-bold">
                {c.title}
              </h3>
              {c.handle && <span className="shrink-0 text-sm text-white/60">{c.handle}</span>}
            </div>
            {/* Clipped visually only — the full text stays in the DOM for
                screen readers and search. */}
            <p className="m-0 line-clamp-3 min-h-[4.27rem] text-sm leading-relaxed text-gray-400">
              {c.subtitle}
            </p>
            {c.location && <span className="text-sm text-gray-400">{c.location}</span>}
            {c.tech && (
              <p className="m-0 line-clamp-2 min-h-[2.44rem] text-xs leading-relaxed text-gray-500">
                {c.tech.join(' · ')}
              </p>
            )}
            {onCardSelect && (
              <span
                aria-hidden
                className="mt-1 inline-flex items-center gap-1.5 text-xs font-semibold tracking-wide text-[var(--card-border)] opacity-70 transition-opacity duration-300 group-hover:opacity-100"
              >
                Read more
                <svg viewBox="0 0 24 24" className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            )}
          </footer>
        </article>
      ))}
      {desaturate && (
        <>
          <div
            className="absolute inset-0 pointer-events-none z-30"
            style={{
              backdropFilter: 'grayscale(1) brightness(0.78)',
              WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
              background: 'rgba(0,0,0,0.001)',
              maskImage:
                'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)',
              WebkitMaskImage:
                'radial-gradient(circle var(--r) at var(--x) var(--y),transparent 0%,transparent 15%,rgba(0,0,0,0.10) 30%,rgba(0,0,0,0.22)45%,rgba(0,0,0,0.35)60%,rgba(0,0,0,0.50)75%,rgba(0,0,0,0.68)88%,white 100%)'
            }}
          />
          <div
            ref={fadeRef}
            className="absolute inset-0 pointer-events-none transition-opacity duration-[250ms] z-40"
            style={{
              backdropFilter: 'grayscale(1) brightness(0.78)',
              WebkitBackdropFilter: 'grayscale(1) brightness(0.78)',
              background: 'rgba(0,0,0,0.001)',
              maskImage:
                'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
              WebkitMaskImage:
                'radial-gradient(circle var(--r) at var(--x) var(--y),white 0%,white 15%,rgba(255,255,255,0.90)30%,rgba(255,255,255,0.78)45%,rgba(255,255,255,0.65)60%,rgba(255,255,255,0.50)75%,rgba(255,255,255,0.32)88%,transparent 100%)',
              opacity: 1
            }}
          />
        </>
      )}
    </div>
  );
};

export default ChromaGrid;
