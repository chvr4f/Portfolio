import { lazy, Suspense } from 'react';
import AnimatedContent from '@/components/AnimatedContent';
import CanvasBoundary from '@/components/layout/CanvasBoundary';
import GradientHeading from '@/components/layout/GradientHeading';
import SocialIcon from '@/components/layout/SocialIcon';
import { SiGmail } from 'react-icons/si';
import { profile, socials } from '@/data/content';

// WebGL and purely decorative, like the other section backdrops.
const Plasma = lazy(() => import('@/components/Plasma'));

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative isolate overflow-hidden px-6 py-24 sm:py-32 lg:pl-52 xl:pl-72"
    >
      {/* Not pointer-events-none, unlike the page's other backdrops: Plasma
          listens for mousemove on its own container. It sits at -z-10 with no
          click handlers, so it only takes events that would have hit the page
          background anyway. Boundary-wrapped because ogl throws outright
          without a GL context. */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <CanvasBoundary fallback={null}>
          <Suspense fallback={null}>
            <Plasma
              color="#7C3AED"
              speed={1}
              direction="forward"
              scale={1}
              opacity={1}
              mouseInteractive
              iterations={60}
              renderScale={0.55}
              targetFps={60}
              maxDpr={1.5}
            />
          </Suspense>
        </CanvasBoundary>
      </div>
      {/* Blend the plasma into the section above instead of starting on a
          hard edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink-950 to-transparent"
      />

      <div className="mx-auto max-w-4xl">
        {/* The title is softened a touch — it sits right over the brightest
            part of the plasma and was pulling focus from the card. */}
        <GradientHeading
          titleClassName="opacity-80"
          lede="Ready to bring your ideas to life? Let's collaborate and create something amazing together."
        >
          Get In Touch
        </GradientHeading>

        <AnimatedContent distance={50} duration={0.9} threshold={0.15}>
          <div className="rounded-3xl border border-white/10 bg-[#0f172a]/80 p-8 backdrop-blur-xl">
            <h3 className="mb-6 text-center font-display text-2xl font-bold text-white">
              Let&apos;s Connect
            </h3>
            <p className="mb-8 text-center leading-relaxed text-gray-300">
              I&apos;m always excited to discuss new opportunities, creative projects, or just chat
              about technology. Whether you have a specific project in mind or want to explore
              possibilities, I&apos;d love to hear from you.
            </p>

            <div className="mb-8 flex justify-center">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl">
                  <SiGmail aria-hidden className="h-6 w-6 text-[#EA4335]" />
                </div>
                <div>
                  <p className="m-0 text-sm font-medium text-white">Gmail</p>
                  <a
                    href={`mailto:${profile.email}`}
                    className="text-sm text-gray-400 transition-colors hover:text-blue-400"
                  >
                    {profile.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="mb-4 font-medium text-white">Follow Me</p>
              <ul className="flex justify-center gap-4">
                {/* Email is already the row above; only the profiles here. */}
                {socials
                  .filter(s => s.icon !== 'email')
                  .map(s => (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        title={s.label}
                        className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-700/50 text-gray-300 transition-all duration-300 hover:scale-110 hover:border-gray-500/50 hover:bg-gray-700/50 hover:text-white"
                      >
                        <SocialIcon name={s.icon} className="h-5 w-5" />
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </AnimatedContent>

        <p className="mt-10 text-center font-mono text-[11px] tracking-wide text-mist-500">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </section>
  );
}
