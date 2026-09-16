import { useEffect, useRef } from 'react';
import type { Project } from '@/data/content';

type Props = {
  project: Project;
  onClose: () => void;
};

/**
 * The full write-up for one project, over the page.
 *
 * Built on the native <dialog>, which hands us the focus trap, the Escape
 * key, inertness of the page behind, and a ::backdrop — all things a div
 * would have to reimplement, usually badly. The one thing it does not do is
 * stop the page behind from scrolling, so that is locked by hand below.
 *
 * Mounted only while a project is selected: `showModal()` therefore runs once,
 * on mount, and unmounting is what closes it.
 */
export default function ProjectDialog({ project, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    ref.current?.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <dialog
      ref={ref}
      // `close` fires for Escape and for the form-method close alike, so this
      // is the single exit that keeps React's state in step with the element.
      onClose={onClose}
      // The dialog box fills the element, so a click that lands on the element
      // itself came from the backdrop around it.
      onClick={e => {
        if (e.target === ref.current) ref.current?.close();
      }}
      aria-labelledby="project-dialog-title"
      className="project-dialog m-auto w-[min(46rem,92vw)] max-w-none overflow-hidden rounded-2xl border border-white/10 bg-ink-950 p-0 text-white shadow-[0_24px_80px_rgba(0,0,0,0.6)]"
      style={{ '--accent': project.accent } as React.CSSProperties}
    >
      <div className="max-h-[85vh] overflow-y-auto overscroll-contain">
        <div className="relative">
          {project.image && (
            <img
              src={project.image}
              alt=""
              className="aspect-[19/10] w-full object-cover"
            />
          )}
          {/* Sink the image into the panel so the title sits on darkness. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink-950 to-transparent"
          />
          <button
            type="button"
            onClick={() => ref.current?.close()}
            aria-label="Close"
            className="absolute top-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-black/55 text-white/80 backdrop-blur-sm transition-colors hover:bg-black/75 hover:text-white focus-visible:bg-black/75 focus-visible:text-white"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="px-6 pt-5 pb-7 sm:px-8 sm:pb-8">
          <h2
            id="project-dialog-title"
            className="m-0 font-display text-2xl leading-tight font-bold sm:text-3xl"
          >
            {project.title}
          </h2>
          <span
            aria-hidden
            className="mt-3 mb-5 block h-[2px] w-16 rounded-full"
            style={{ background: 'var(--accent)' }}
          />

          {/* gap, not space-y: the paragraphs carry `m-0`, which wins against
              the margin space-y-* would set on them. */}
          <div className="flex flex-col gap-4">
            {project.details.map((paragraph, i) => (
              <p key={i} className="m-0 leading-relaxed text-gray-300">
                {paragraph}
              </p>
            ))}
          </div>

          {project.tech.length > 0 && (
            <ul className="mt-6 flex flex-wrap gap-2">
              {project.tech.map(t => (
                <li
                  key={t}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-gray-300"
                >
                  {t}
                </li>
              ))}
            </ul>
          )}

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold text-ink-950 transition-transform duration-300 hover:scale-[1.03]"
              style={{ background: 'var(--accent)' }}
            >
              Visit site
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17 17 7M9 7h8v8" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </dialog>
  );
}
