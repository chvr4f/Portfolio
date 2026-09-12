import { useEffect, useState } from 'react';
import { navLinks, profile } from '@/data/content';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently occupying the middle of the viewport.
  useEffect(() => {
    const ids = navLinks.map(l => l.href.slice(1));
    const sections = ids
      .map(id => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      entries => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 transition-all duration-500 sm:px-5 ${
          scrolled ? 'glass hairline py-2.5 shadow-2xl shadow-black/40' : 'py-2.5'
        }`}
        style={{ marginInline: 'max(1rem, calc((100% - 72rem) / 2))' }}
      >
        <a
          href="#top"
          className="font-display text-[15px] font-bold tracking-tight text-mist-100"
        >
          {profile.name}
          <span className="text-violet-glow">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map(link => {
            const isActive = active === link.href;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative block rounded-full px-3.5 py-1.5 font-mono text-[12px] tracking-wide uppercase transition-colors duration-300 ${
                    isActive ? 'text-mist-100' : 'text-mist-500 hover:text-mist-300'
                  }`}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
                    />
                  )}
                  <span className="relative">{link.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href="#contact"
            className="hidden rounded-full bg-mist-100 px-4 py-2 font-mono text-[12px] font-medium tracking-wide text-ink-950 uppercase transition-transform duration-300 hover:scale-[1.04] sm:block"
          >
            Get in touch
          </a>

          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
            className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-white/12 md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-mist-100 transition-transform duration-300 ${
                  open ? 'top-[5px] rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-4 bg-mist-100 transition-transform duration-300 ${
                  open ? 'top-[5px] -rotate-45' : 'top-[10px]'
                }`}
              />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={`mx-4 overflow-hidden transition-all duration-500 md:hidden ${
          open ? 'mt-2 max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <ul className="glass hairline space-y-1 rounded-3xl p-3">
          {navLinks.map(link => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 font-display text-lg text-mist-300 transition-colors hover:bg-white/5 hover:text-mist-100"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
