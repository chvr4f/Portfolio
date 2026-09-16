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
  location: 'Oujda, Morocco',
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

/** GitHub handle — the About card pulls its live stats from this account. */
export const githubUser = 'chvr4f';

/**
 * Total projects, shown as "15+" on the About card.
 *
 * Set by hand because the live fetch cannot see private repos — it reads 9
 * (5 owned + 4 shared). The card takes whichever is larger, so this is a floor:
 * if the public count ever passes it, the real number wins automatically.
 * `npm run sync:github` with a token replaces this with a verified figure.
 */
export const projectsCount = 15;

/**
 * Languages shown under the stats on the About card.
 *
 * Hand-set for the same reason as `projectsCount`: ranking by public repo count
 * gives PHP, C#, TypeScript, which reflects only what is visible and weights
 * every repo equally regardless of how much work is in it.
 */
export const topLanguages = ['C#', 'TypeScript', 'Shell'] as const;

/**
 * Years of professional experience.
 *
 * Set this by hand: nothing on GitHub can tell us. The account dates from 2025,
 * which says when you started pushing there, not when you started building.
 * THIS IS A PLACEHOLDER — change it to your real number.
 */
export const yearsExperience = 2;

/** Chips under "What I Love" on the About card. */
export const interests = [
  'Clean Code',
  'AI / ML',
  'Problem Solving',
  'Web Performance',
  'Open Source',
  'Design Systems',
] as const;

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
  /** One or two lines for the card. Keep it under ~145 characters: the card
   *  clamps it to three lines and anything longer is cut mid-sentence. */
  blurb: string;
  /** The long version, one string per paragraph, shown in the card's dialog. */
  details: string[];
  tech: string[];
  /**
   * Screenshot path, e.g. '/images/projects/launchpad.webp' (file goes in
   * public/). Without one the card gets generated artwork from `accent`.
   */
  image?: string;
  /** Card accent: the hover border colour, and the seed for generated artwork. */
  accent: string;
  /** CSS gradient painted behind the card. */
  gradient: string;
  /** Live site or repo. Shown as a button inside the dialog. */
  url?: string;
};

export const projects: Project[] = [
  {
    title: 'Whispiy',
    blurb:
      'Turns meeting audio into transcripts, AI summaries and tracked action items. An Angular SPA over .NET 9 microservices.',
    details: [
      'Whispiy turns meeting audio into transcripts, AI summaries and tracked action items, so the decisions taken in a meeting outlast the meeting.',
      'The platform is an Angular single-page application over .NET 9 microservices, migrated from the original Next.js monolith.',
    ],
    tech: ['Angular', 'TypeScript', '.NET 9', 'C#', 'SCSS', 'Docker'],
    image: '/images/projects/whispiy.jpg',
    accent: '#06B6D4',
    gradient: 'linear-gradient(145deg, #06B6D4, transparent)',
    url: 'https://whispiy.com',
  },
  {
    title: 'AET Flight Deck',
    blurb:
      'An interactive Boeing 737 NG cockpit trainer. Trainees run real procedures against a 3D flight deck; instructors get a scored record.',
    details: [
      'An interactive Boeing 737 NG cockpit trainer for AET Aviation Training & Consulting GmbH. Trainees learn the flight deck by running real procedures against a 3D model — challenge and response, flows, and memory items — and their instructors get the record of how it went.',
      'Trains. Thirty-two procedures across three areas — Normal, Non-Normal and Memory Items — taken from AET’s own syllabus and the Basic Manual B737NG. Each step names a control, the trainee finds it on the flight deck, and the runner scores whether they got it right and whether they needed a hint.',
      'Measures. Every finished run is recorded: how correctly the procedure was applied, how quickly, and which individual steps cost the trainee. Runs are written to the device first and synced afterwards, because the most likely moment for a request to fail is a simulator bay on hotel wifi — and it is also the moment the work matters most.',
      'Administers. A school’s administrator manages their own accounts, roles and retention period. AET manages the syllabus itself: the fleet, the areas of each type’s syllabus, the procedures listed under them, and the steps inside each procedure.',
      'The whole product is an Angular single-page application plus a Supabase project, with no server of our own beyond one Edge Function. It speaks English and German throughout — except the switches. A control is named in English whatever language the interface is in, because that is what is printed on the panel.',
    ],
    tech: ['Angular', 'TypeScript', 'Three.js', 'Supabase', 'PostgreSQL', 'i18n'],
    image: '/images/projects/aet-flight-deck.jpg',
    accent: '#F59E0B',
    gradient: 'linear-gradient(145deg, #F59E0B, transparent)',
  },
  {
    title: 'Echo-System',
    blurb:
      'A decentralised local AI mesh. Ollama nodes register with an orchestrator that routes each request to the best node.',
    details: [
      'Echo-System is a decentralised, local AI mesh network. It lets several Ollama instances running across different machines — or locally, for testing — talk to each other through a central orchestrator.',
      'The orchestrator distributes AI workloads intelligently, load-balancing each task across the available nodes according to their capabilities, free memory and current queue.',
    ],
    tech: ['Go', 'Ollama', 'Distributed Systems', 'Load Balancing'],
    image: '/images/projects/echo-system.jpg',
    accent: '#6366F1',
    gradient: 'linear-gradient(145deg, #6366F1, transparent)',
  },
  {
    title: 'RecruterAI',
    blurb:
      'Qwen2.5-3B-Instruct fine-tuned for recruitment: it reads job descriptions, matches skills and flags the gaps.',
    details: [
      'In a competitive job market, companies receive a growing volume of applications, and reading CVs and job descriptions by hand is slow, subjective and inefficient.',
      'RecruterAI is a specialised language model that analyses job descriptions and assists candidate selection. It matches the technical skills a candidate has against the ones a role asks for, and flags the ones that are missing.',
      'Built by fine-tuning the pre-trained Qwen2.5-3B-Instruct, with off-domain questions filtered out so it answers only on recruitment. The model is exported to GGUF, so it runs under Ollama and Open WebUI.',
    ],
    tech: ['Python', 'Qwen2.5', 'Fine-tuning', 'Transformers', 'GGUF', 'Ollama'],
    image: '/images/projects/recruterai.jpg',
    accent: '#EC4899',
    gradient: 'linear-gradient(145deg, #EC4899, transparent)',
  },
  {
    title: 'CURSUS',
    blurb:
      'A career platform of four microservices: project management, an AI interview coach, algorithm practice, CV optimiser.',
    details: [
      'A full-stack platform made up of four super-microservices: project management, an AI interview coach, gamified algorithm learning, and a CV optimiser.',
      'The backend is a scalable microservice architecture behind REST APIs, spanning Spring Boot, Node.js, ASP.NET and Symfony, with Angular on the front, MySQL and Redis for storage and caching, and Elasticsearch for search.',
    ],
    tech: ['Angular', 'Spring Boot', 'ASP.NET', 'Symfony', 'Node.js', 'MySQL', 'Redis', 'Elasticsearch'],
    image: '/images/projects/cursus.jpg',
    accent: '#14B8A6',
    gradient: 'linear-gradient(145deg, #14B8A6, transparent)',
  },
  {
    title: 'Muse',
    blurb:
      'A cinematic landing page for an AI art museum. Scrolling dollies the camera through seven rendered rooms.',
    details: [
      'An immersive, cinematic landing page for Muse, an AI-powered digital museum platform for artists.',
      'Instead of scrolling a page, visitors walk through a rendered contemporary museum: scrolling dollies the camera through seven rooms — lobby, sculpture corridor, exhibition hall, AI curator room, store gallery, membership hall, and a final gold-ring rotunda.',
    ],
    tech: ['TypeScript', 'Three.js', 'WebGL', 'CSS'],
    image: '/images/projects/muse.jpg',
    accent: '#D4AF37',
    gradient: 'linear-gradient(145deg, #D4AF37, transparent)',
  },
];


export type TimelineEntry = {
  period: string;
  title: string;
  org: string;
  description?: string;
  /** Bullet points, rendered under the description. */
  highlights?: string[];
  /** Stack for the role, rendered as chips. */
  tech?: string[];
  kind: 'education' | 'experience';
};

export const timeline: TimelineEntry[] = [
  {
    period: '2022 — 2027',
    title: 'Engineering Degree, Computer Engineering',
    org: 'École des Hautes Études d’Ingénierie (EHEI) — Oujda, Morocco',
    description:
      'Five-year programme: two preparatory years followed by three years of the engineering cycle.',
    kind: 'education',
  },
  {
    period: 'Aug — Oct 2026',
    title: 'Software Engineering Intern',
    org: 'AET Aviation Training & Consulting GmbH — Germany',
    description:
      'Building a web-based Boeing 737 cockpit training application, extending an existing VR training solution to desktop and tablet.',
    highlights: [
      'Implemented training workflows: procedure selection, Captain / First Officer roles, cockpit navigation, zoom and interactive controls.',
      'Worked with the AET team to translate existing VR functionality into a browser-based solution.',
    ],
    tech: ['Angular', 'TypeScript', 'Three.js'],
    kind: 'experience',
  },
  {
    period: 'Aug 2025',
    title: 'AI / Machine Learning Engineering Intern',
    org: 'SQLI — Oujda, Morocco',
    description:
      'Fine-tuned a specialised NLP model for recruitment automation, extracting skills and requirements from technical job postings.',
    highlights: [
      'Deployed an AI tool that cut application processing time by a factor of three while improving screening consistency.',
    ],
    tech: ['Python', 'Transformers', 'NLP', 'Machine Learning'],
    kind: 'experience',
  },
  {
    period: '2021 — 2022',
    title: 'FFM & Internationale Förderklasse (IFK)',
    org: 'Berufskolleg für Wirtschaft und Verwaltung — Aachen, Germany',
    description:
      'Preparatory adaptation class plus the integration class for international students, with advanced German language training.',
    kind: 'education',
  },
  {
    period: '2020 — 2021',
    title: 'Baccalaureate',
    org: 'ENNAHDA High School — Ahfir, Morocco',
    description: 'Physical Sciences stream.',
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
