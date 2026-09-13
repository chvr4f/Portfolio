/**
 * ────────────────────────────────────────────────────────────────
 *  EDIT YOUR PORTFOLIO HERE
 *  This is the only file you need to touch to make the site yours.
 * ────────────────────────────────────────────────────────────────
 */

export const profile = {
  name: 'Charaf',
  /** Cycled through the highlighted "I'm a ___" line in the hero. */
  roles: ['Full-Stack Developer', 'AI & ML Enthusiast', 'Front-End Specialist'],
  location: 'Jakarta, Indonesia',
  /** Short line directly under the name. */
  tagline:
    'Obsessed with building web experiences that feel fast, look sharp, and work for everyone. I turn rough ideas into polished products that leave a mark.',
  /** 2–3 sentences. Shown in the About section with a scroll reveal. */
  bio: `I'm a computer science student who fell for the front end — the part where a
  layout stops being a mockup and starts responding to you. I care about motion that
  explains something, interfaces that stay quick on a mid-range phone, and code the
  next person can actually read. Right now I'm looking for an internship or junior
  role where I can keep learning in public.`,
  email: 'charaf2322004@gmail.com',
  resumeUrl: '/resume.pdf',
} as const;

export const stats = [
  { label: 'Projects shipped', value: 12, suffix: '' },
  { label: 'GitHub contributions', value: 840, suffix: '+' },
  { label: 'Hackathons', value: 4, suffix: '' },
  { label: 'Coffee per week', value: 21, suffix: '' },
];

/** `icon` keys into the brand marks in components/layout/SocialIcon.tsx. */
export const socials = [
  { label: 'GitHub', href: 'https://github.com/chvr4f', icon: 'github' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/charafalwan/', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:charaf2322004@gmail.com', icon: 'email' },
  // `as const` keeps `icon` as its literal type so it still satisfies
  // SocialIcon's union instead of widening to plain string.
] as const;

/** Skill tiles for the MagicBento grid. Exactly 6 reads best. */
export const skills = [
  {
    color: '#0e1018',
    label: 'Core',
    title: 'Languages',
    description: 'TypeScript, JavaScript, Python, and enough Go to be dangerous.',
  },
  {
    color: '#0e1018',
    label: 'Front-end',
    title: 'React & friends',
    description: 'React 19, Next.js, Vite, Tailwind, and component-driven architecture.',
  },
  {
    color: '#0e1018',
    label: 'Motion',
    title: 'Animation',
    description: 'GSAP, Motion, and WebGL via OGL — used sparingly and on purpose.',
  },
  {
    color: '#0e1018',
    label: 'Back-end',
    title: 'APIs & data',
    description: 'Node, REST and tRPC, Postgres with Prisma, a little Redis.',
  },
  {
    color: '#0e1018',
    label: 'Craft',
    title: 'Testing & CI',
    description: 'Vitest, Playwright, GitHub Actions, and reviewable pull requests.',
  },
  {
    color: '#0e1018',
    label: 'Design',
    title: 'Interface design',
    description: 'Figma, type systems, and accessibility that is not bolted on later.',
  },
];

/** Tech names for the scrolling marquee. */
export const techStack = [
  'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Node.js',
  'GSAP', 'WebGL', 'Postgres', 'Prisma', 'Vitest', 'Figma', 'Git',
];

export type Project = {
  title: string;
  blurb: string;
  tags: string[];
  year: string;
  href?: string;
  repo?: string;
  /** Two hex colors used to generate the card artwork. */
  gradient: [string, string];
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: 'Ledgerline',
    blurb:
      'A budgeting app for students that turns a messy bank CSV into a plain-language monthly story. Offline-first, installable, and fast on cheap phones.',
    tags: ['Next.js', 'TypeScript', 'Postgres', 'PWA'],
    year: '2026',
    href: 'https://example.com',
    repo: 'https://github.com/chvr4f/ledgerline',
    gradient: ['#5227ff', '#22d3ee'],
    featured: true,
  },
  {
    title: 'Studio Kiln',
    blurb:
      'A WebGL portfolio template for ceramicists. Real-time glaze preview on a 3D vessel, with a CMS an artist can actually use.',
    tags: ['React', 'WebGL', 'GLSL', 'Sanity'],
    year: '2025',
    href: 'https://example.com',
    repo: 'https://github.com/chvr4f/studio-kiln',
    gradient: ['#f472b6', '#5227ff'],
    featured: true,
  },
  {
    title: 'Commuter',
    blurb: 'Live transit board for my campus, built from a scrappy GTFS parser and a 90-line service worker.',
    tags: ['React', 'GTFS', 'Service Worker'],
    year: '2025',
    repo: 'https://github.com/chvr4f/commuter',
    gradient: ['#22d3ee', '#34d399'],
  },
  {
    title: 'Fret',
    blurb: 'Guitar-scale trainer that listens through the mic and scores you in real time using the Web Audio API.',
    tags: ['TypeScript', 'Web Audio', 'Canvas'],
    year: '2025',
    repo: 'https://github.com/chvr4f/fret',
    gradient: ['#fbbf24', '#f472b6'],
  },
  {
    title: 'Tinybench',
    blurb: 'A zero-config CLI that benchmarks any HTTP endpoint and prints a readable histogram in the terminal.',
    tags: ['Node.js', 'CLI', 'Go'],
    year: '2024',
    repo: 'https://github.com/chvr4f/tinybench',
    gradient: ['#a78bfa', '#22d3ee'],
  },
  {
    title: 'Overgrown',
    blurb: 'Game-jam entry: a puzzle platformer about a vine that grows where you have already walked. 48 hours, 2nd place.',
    tags: ['Godot', 'GDScript', 'Game jam'],
    year: '2024',
    href: 'https://example.com',
    gradient: ['#34d399', '#0ea5e9'],
  },
];

export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  description: string;
  kind: 'education' | 'experience';
};

export const timeline: TimelineEntry[] = [
  {
    period: '2023 — 2027',
    title: 'BSc Computer Science',
    org: 'Your University',
    description:
      'Focus on systems and human–computer interaction. Teaching assistant for the first-year web development course.',
    kind: 'education',
  },
  {
    period: 'Summer 2026',
    title: 'Front-end Intern',
    org: 'Some Studio',
    description:
      'Rebuilt the marketing site component library, cut the largest bundle by 38%, and shipped a design-token pipeline.',
    kind: 'experience',
  },
  {
    period: '2025 — present',
    title: 'Freelance developer',
    org: 'Self-employed',
    description:
      'Built and maintained sites for four small businesses, handling design, build, and deployment end to end.',
    kind: 'experience',
  },
  {
    period: '2024',
    title: 'Open-source contributor',
    org: 'Various',
    description:
      'Merged accessibility and documentation fixes into several React ecosystem libraries. First PRs, first reviews, steep learning curve.',
    kind: 'education',
  },
];

/**
 * Side-rail navigation. Keep these in section order — the rail resolves each
 * one by the matching `id` on a <section> in App.tsx.
 */
export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];
