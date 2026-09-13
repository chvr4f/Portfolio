import ElectricBorder from '@/components/ElectricBorder';
import StarBorder from '@/components/StarBorder';
import AnimatedContent from '@/components/AnimatedContent';
import SocialIcon from '@/components/layout/SocialIcon';
import { profile, socials } from '@/data/content';

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-24 sm:py-32 lg:pl-52 xl:pl-72">
      <div className="mx-auto max-w-4xl">
        <AnimatedContent distance={60} duration={1} threshold={0.15}>
          <ElectricBorder color="#5227ff" speed={0.9} chaos={0.1} borderRadius={28}>
            <div className="grain relative overflow-hidden rounded-[28px] bg-ink-900/70 px-6 py-14 text-center sm:px-12 sm:py-20">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[34rem] max-w-[130%] -translate-x-1/2 rounded-full bg-violet-glow/22 blur-[90px]"
              />

              <p className="mb-5 font-mono text-[11px] tracking-[0.2em] text-mist-500 uppercase">
                05 / Contact
              </p>

              <h2 className="mx-auto max-w-2xl font-display text-[clamp(2rem,6vw,3.5rem)] leading-[1.03] font-bold tracking-tight text-balance">
                Let's build something
                <span className="text-violet-glow">.</span>
              </h2>

              <p className="mx-auto mt-5 max-w-md text-[15px] leading-relaxed text-mist-500">
                I'm looking for an internship or junior front-end role. If you're hiring — or just
                want to talk shop — my inbox is open.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <StarBorder
                  as="a"
                  href={`mailto:${profile.email}`}
                  color="#5227ff"
                  speed="4.5s"
                  thickness={1.5}
                  backgroundColor="#05060a"
                  className="font-mono text-[12px] tracking-wide uppercase"
                >
                  {profile.email}
                </StarBorder>

                <a
                  href={profile.resumeUrl}
                  className="rounded-[20px] px-6 py-[17px] font-mono text-[12px] tracking-wide text-mist-300 uppercase ring-1 ring-white/12 transition-colors duration-300 hover:bg-white/5 hover:text-mist-100"
                >
                  Résumé
                </a>
              </div>
            </div>
          </ElectricBorder>
        </AnimatedContent>

        <footer className="mt-16 flex flex-col items-center justify-between gap-5 border-t border-white/6 pt-8 sm:flex-row">
          <p className="font-mono text-[11px] tracking-wide text-mist-500">
            © {new Date().getFullYear()} {profile.name}. Built with React &amp; React Bits.
          </p>
          <ul className="flex items-center gap-1">
            {socials.map(s => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target={s.href.startsWith('http') ? '_blank' : undefined}
                  rel={s.href.startsWith('http') ? 'noreferrer' : undefined}
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-mist-500 transition-colors hover:text-cyan-glow focus-visible:text-cyan-glow"
                >
                  <SocialIcon name={s.icon} className="h-[17px] w-[17px]" />
                </a>
              </li>
            ))}
          </ul>
        </footer>
      </div>
    </section>
  );
}
