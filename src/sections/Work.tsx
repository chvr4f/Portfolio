import { useState } from 'react';
import ChromaGrid, { type ChromaItem } from '@/components/ChromaGrid';
import AnimatedContent from '@/components/AnimatedContent';
import GradientHeading from '@/components/layout/GradientHeading';
import ProjectDialog from '@/components/layout/ProjectDialog';
import { projects } from '@/data/content';
import { projectCover } from '@/lib/cover';

export default function Work() {
  // Index rather than the project itself: the grid reports the card position,
  // and null is simply "nothing open".
  const [selected, setSelected] = useState<number | null>(null);

  const items: ChromaItem[] = projects.map(p => ({
    image: p.image ?? projectCover([p.accent, '#0a0b12'], p.title),
    title: p.title,
    subtitle: p.blurb,
    tech: p.tech,
    borderColor: p.accent,
    gradient: p.gradient,
    url: p.url,
  }));

  return (
    <section id="projects" className="relative px-6 py-24 sm:py-32 lg:pl-52 xl:pl-72">
      <div className="mx-auto max-w-6xl">
        <GradientHeading lede="Explore my latest work and creative solutions. Each project represents a unique challenge solved with modern technologies.">
          Featured Projects
        </GradientHeading>

        <AnimatedContent distance={60} duration={0.9} threshold={0.1}>
          {/* The card opens the write-up instead of the link — the link lives
              inside the dialog, where there is room to label it. */}
          <ChromaGrid items={items} desaturate={false} onCardSelect={setSelected} />
        </AnimatedContent>
      </div>

      {/* Mounted only while open, so <dialog> opens on mount and closing is an
          unmount — no stale element left in the top layer. */}
      {selected !== null && (
        <ProjectDialog project={projects[selected]} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}
