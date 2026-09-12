import TiltedCard from '@/components/TiltedCard';
import SpotlightCard from '@/components/SpotlightCard';
import AnimatedContent from '@/components/AnimatedContent';
import SectionHeading from '@/components/layout/SectionHeading';
import { projects, type Project } from '@/data/content';
import { projectCover } from '@/lib/cover';

export default function Work() {
  const featured = projects.filter(p => p.featured);
  const rest = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="relative px-6 py-24 sm:py-32 lg:pl-64">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03 / Projects"
          title="Selected projects"
          lede="A mix of coursework that outgrew the brief, freelance builds, and things I made because I wanted them to exist."
        />

        {/* Featured — 3D tilt cards */}
        <div className="grid gap-8 sm:gap-10 lg:grid-cols-2">
          {featured.map((project, i) => (
            <AnimatedContent
              key={project.title}
              className="h-full"
              distance={70}
              duration={1}
              delay={i * 0.12}
              threshold={0.12}
            >
              <FeaturedCard project={project} />
            </AnimatedContent>
          ))}
        </div>

        {/* Everything else — spotlight cards */}
        <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-2 lg:grid-cols-2">
          {rest.map((project, i) => (
            <AnimatedContent
              key={project.title}
              className="h-full"
              distance={50}
              duration={0.85}
              delay={i * 0.08}
              threshold={0.1}
            >
              <SmallCard project={project} />
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  const link = project.href ?? project.repo;

  return (
    <article className="group flex h-full flex-col">
      <TiltedCard
        imageSrc={projectCover(project.gradient, project.title)}
        altText={`${project.title} — project artwork`}
        containerHeight="clamp(260px, 38vw, 380px)"
        containerWidth="100%"
        imageHeight="clamp(260px, 38vw, 380px)"
        imageWidth="100%"
        rotateAmplitude={9}
        scaleOnHover={1.04}
        showMobileWarning={false}
        showTooltip={false}
        displayOverlayContent
        overlayContent={
          <div className="flex h-full w-full flex-col justify-between p-6">
            <div className="flex items-start justify-between gap-4">
              <span className="glass rounded-full px-3 py-1 font-mono text-[10px] tracking-[0.16em] text-white uppercase ring-1 ring-white/20">
                Featured
              </span>
              <span className="font-mono text-[11px] tracking-wider text-white/75">{project.year}</span>
            </div>
            <h3 className="font-display text-[clamp(1.6rem,4vw,2.4rem)] leading-none font-bold tracking-tight text-white drop-shadow-lg">
              {project.title}
            </h3>
          </div>
        }
      />

      <div className="mt-5 flex flex-1 flex-col px-0.5">
        <p className="max-w-lg text-[14.5px] leading-relaxed text-mist-300">{project.blurb}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
          <TagList tags={project.tags} />
        </div>

        <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 pt-4">
          {project.href && <LinkOut href={project.href} label="Live site" />}
          {project.repo && <LinkOut href={project.repo} label="Source" />}
          {!link && <span className="font-mono text-[11px] text-mist-500 uppercase">Private</span>}
        </div>
      </div>
    </article>
  );
}

function SmallCard({ project }: { project: Project }) {
  return (
    <SpotlightCard
      className="!hairline group h-full !rounded-2xl !border-white/8 !bg-ink-900/60 !p-6"
      spotlightColor="rgba(82, 39, 255, 0.18)"
    >
      <div className="flex h-full flex-col">
        <div className="mb-4 flex items-start justify-between gap-4">
          <h3 className="font-display text-xl leading-tight font-semibold tracking-tight text-mist-100">
            {project.title}
          </h3>
          <span
            aria-hidden
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${project.gradient[0]}, ${project.gradient[1]})`,
            }}
          />
        </div>

        <p className="flex-1 text-[14px] leading-relaxed text-mist-500">{project.blurb}</p>

        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
          <TagList tags={project.tags} />
          <span className="font-mono text-[11px] text-mist-500">{project.year}</span>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {project.href && <LinkOut href={project.href} label="Live" />}
          {project.repo && <LinkOut href={project.repo} label="Source" />}
        </div>
      </div>
    </SpotlightCard>
  );
}

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tags.map(tag => (
        <li
          key={tag}
          className="rounded-md bg-white/5 px-2 py-1 font-mono text-[10.5px] tracking-wide text-mist-300"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function LinkOut({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group/l inline-flex items-center gap-1.5 font-mono text-[11px] tracking-[0.12em] text-mist-300 uppercase transition-colors hover:text-cyan-glow"
    >
      {label}
      <span aria-hidden className="transition-transform duration-300 group-hover/l:translate-x-0.5">
        →
      </span>
    </a>
  );
}
