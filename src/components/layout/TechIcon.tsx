import type { IconType } from 'react-icons';
import {
  SiAngular,
  SiDocker,
  SiDotnet,
  SiElasticsearch,
  SiGit,
  SiGnubash,
  SiGo,
  SiMysql,
  SiNodedotjs,
  SiOllama,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiSpringboot,
  SiSupabase,
  SiSymfony,
  SiTailwindcss,
  SiThreedotjs,
  SiTypescript,
} from 'react-icons/si';
// Simple Icons removed the C# mark at Microsoft's request; Tabler still has it.
import { TbBrandCSharp } from 'react-icons/tb';
import type { techStack } from '@/data/content';

type TechName = (typeof techStack)[number];

/**
 * Brand mark and colour per technology. Colours are the Simple Icons brand
 * hexes, except where the brand is black (Symfony, Three.js, Ollama), which
 * would vanish on the dark tiles — those are drawn in near-white instead.
 */
const icons: Record<TechName, { Icon: IconType; color: string; url: string }> = {
  Angular: { Icon: SiAngular, color: '#DD0031', url: 'https://angular.dev' },
  TypeScript: { Icon: SiTypescript, color: '#3178C6', url: 'https://www.typescriptlang.org' },
  React: { Icon: SiReact, color: '#61DAFB', url: 'https://react.dev' },
  'C#': { Icon: TbBrandCSharp, color: '#A179DC', url: 'https://learn.microsoft.com/dotnet/csharp/' },
  '.NET': { Icon: SiDotnet, color: '#7B5CF0', url: 'https://dotnet.microsoft.com' },
  Go: { Icon: SiGo, color: '#00ADD8', url: 'https://go.dev' },
  Python: { Icon: SiPython, color: '#4B8BBE', url: 'https://www.python.org' },
  'Spring Boot': { Icon: SiSpringboot, color: '#6DB33F', url: 'https://spring.io/projects/spring-boot' },
  Symfony: { Icon: SiSymfony, color: '#E8E8EE', url: 'https://symfony.com' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E', url: 'https://nodejs.org' },
  'Three.js': { Icon: SiThreedotjs, color: '#E8E8EE', url: 'https://threejs.org' },
  Supabase: { Icon: SiSupabase, color: '#3FCF8E', url: 'https://supabase.com' },
  PostgreSQL: { Icon: SiPostgresql, color: '#4169E1', url: 'https://www.postgresql.org' },
  MySQL: { Icon: SiMysql, color: '#4479A1', url: 'https://www.mysql.com' },
  Redis: { Icon: SiRedis, color: '#FF4438', url: 'https://redis.io' },
  Elasticsearch: { Icon: SiElasticsearch, color: '#00BFB3', url: 'https://www.elastic.co/elasticsearch' },
  Docker: { Icon: SiDocker, color: '#2496ED', url: 'https://www.docker.com' },
  Ollama: { Icon: SiOllama, color: '#E8E8EE', url: 'https://ollama.com' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4', url: 'https://tailwindcss.com' },
  Git: { Icon: SiGit, color: '#F05032', url: 'https://git-scm.com' },
  Shell: { Icon: SiGnubash, color: '#4EAA25', url: 'https://www.gnu.org/software/bash/' },
};

/**
 * One technology in the Skills marquee: a tile linking to the project's site,
 * with its name in a tooltip above. `cursor-target` is what TargetCursor locks
 * onto — the tile itself, so the frame hugs the tile's rounded box.
 */
export default function TechTile({ name }: { name: TechName }) {
  const { Icon, color, url } = icons[name];
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={name}
      className="group/icon relative block shrink-0 cursor-pointer hover:z-20"
    >
      <span className="cursor-target flex h-16 w-16 items-center justify-center rounded-xl border border-gray-700/50 bg-gray-800/50 p-3 transition-colors duration-200 hover:border-gray-500/50 hover:bg-gray-700/50">
        <Icon aria-hidden className="h-full w-full" style={{ color }} />
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute -top-10 left-1/2 z-10 -translate-x-1/2 rounded-lg border border-gray-700/50 bg-gray-900/95 px-2.5 py-1 text-xs whitespace-nowrap text-white opacity-0 shadow-lg backdrop-blur-sm transition-opacity duration-200 group-hover/icon:opacity-100"
      >
        {name}
      </span>
    </a>
  );
}
