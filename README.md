# Portfolio

A dark, WebGL-accented single-page portfolio built with **Vite + React 19 + TypeScript + Tailwind v4**,
using animated components from [React Bits](https://www.reactbits.dev/).

```bash
npm run dev      # http://localhost:5173
npm run build    # typecheck + production build into dist/
npm run preview  # serve the built site
npm run lint     # oxlint
```

## Make it yours

**Almost everything lives in one file: [`src/data/content.ts`](src/data/content.ts).**
Edit that and the whole site updates — name, roles, bio, stats, socials, skills,
tech marquee, projects, and timeline. No component edits needed.

Then update these three things outside that file:

| What | Where |
| --- | --- |
| Page title, meta description, OG tags | [`index.html`](index.html) |
| Résumé PDF | drop `resume.pdf` into [`public/`](public/) |
| Favicon | [`public/favicon.svg`](public/favicon.svg) |

Colors and fonts are design tokens at the top of [`src/index.css`](src/index.css)
(`--color-ink-*`, `--color-mist-*`, `--color-violet-glow`, `--color-cyan-glow`).
Change them there and every section follows.

## Structure

```
src/
├── data/content.ts       ← edit this
├── index.css             ← design tokens, keyframes, base styles
├── App.tsx               ← section order
├── sections/             ← Hero, About, Skills, Work, Path, Contact
├── components/           ← React Bits components (vendored)
│   └── layout/           ← Nav, SectionHeading, CanvasBoundary
└── lib/cover.ts          ← generates project card artwork as inline SVG
```

## Project images

Project cards use generated SVG gradients from `src/lib/cover.ts`, so there are no
binary assets to manage. To use a real screenshot instead, drop it in `public/` and
swap the `imageSrc` in [`src/sections/Work.tsx`](src/sections/Work.tsx):

```tsx
imageSrc="/shots/ledgerline.png"   // instead of projectCover(...)
```

## Adding more React Bits components

The shadcn registry is already configured in [`components.json`](components.json):

```bash
npx shadcn@latest add @react-bits/ChromaGrid-TS-TW
```

Use the `-TS-TW` variant (TypeScript + Tailwind) to match this project. The component
lands in `src/components/` and its npm dependencies install automatically. Browse the
full catalogue of 165+ components at [reactbits.dev](https://www.reactbits.dev/).

## Notes for future you

- **`CanvasBoundary`** wraps the WebGL hero background. `ogl` throws when a GL context
  isn't available (GPU blocklists, WebGL disabled, headless browsers) and that error
  would otherwise unmount the entire page — leaving a blank screen. The boundary
  catches it and falls back to a CSS gradient. Wrap any future WebGL component the
  same way.
- **Aurora is lazy-loaded** so the headline paints without waiting on `ogl`.
- **Vendored components were modified** in three places. Re-adding them from the
  registry will overwrite these:
  - `MagicBento.tsx` — added a `cards` prop (it hardcoded its own demo data) and
    removed the `max-w-[54rem]` / `width: 90%` constraints so the grid fills its container.
  - `TiltedCard.tsx` — overlay wrapper changed from `absolute top-0 left-0` to
    `absolute inset-0`, so `h-full` works for overlay content.
  - The bento tile `aspect-[4/3]` is overridden at the bottom of `src/index.css`.
- **`tsconfig.app.json` relaxes `noUnusedLocals`/`noUnusedParameters`** because the
  vendored component sources don't satisfy them.
- **`npm run lint` reports warnings from `src/components/*`** — those are upstream
  React Bits sources, left unmodified on purpose. Authored code is clean.
- `html`/`body` use `overflow-x: clip` (not `hidden`) to contain bleed from
  ScrollReveal's rotation without creating a scroll container that would break
  GSAP ScrollTrigger.

## Deploying

Static output — any host works.

```bash
npm run build   # → dist/
```

Vercel / Netlify / Cloudflare Pages: build `npm run build`, publish `dist`.
For GitHub Pages, set `base: '/<repo-name>/'` in [`vite.config.ts`](vite.config.ts) first.
