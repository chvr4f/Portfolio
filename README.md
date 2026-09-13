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
├── index.css             ← design tokens, keyframes, vendored-component overrides
├── App.tsx               ← section order
├── sections/             ← Hero, About, Work, Skills, Contact
├── components/           ← React Bits components (vendored)
│   └── layout/           ← SideNav, SectionHeading, Timeline, CanvasBoundary
└── lib/cover.ts          ← generates project card artwork as inline SVG
```

The five sections map 1:1 onto the five side-rail items, so every scroll
position highlights exactly one:

| # | Rail item | Section id | File |
| --- | --- | --- | --- |
| 01 | Home | `#home` | `sections/Hero.tsx` |
| 02 | About | `#about` | `sections/About.tsx` (includes the timeline) |
| 03 | Projects | `#projects` | `sections/Work.tsx` |
| 04 | Skills | `#skills` | `sections/Skills.tsx` |
| 05 | Contact | `#contact` | `sections/Contact.tsx` |

Education & experience lives *inside* About (`components/layout/Timeline.tsx`)
rather than owning a sixth section, which keeps the rail at the five items and
means no scroll position leaves the rail blank.

## Navigation

[`components/layout/SideNav.tsx`](src/components/layout/SideNav.tsx) renders the
same list two ways:

- **lg and up** — [`CameraNav`](src/components/layout/CameraNav.tsx): a camera
  mode-wheel. Three labels are visible at a time, the active one centred in a
  highlight band and its neighbours falling off in opacity. The lens-barrel
  ticks beside it are warped with `tanh` and magnified by `1/cosh`, so they
  bunch up toward the centre the way a real barrel does.
- **below lg** — React Bits `StaggeredMenu` as a slide-in panel, because a fixed
  rail has nowhere to live on a phone.

`SideNav` feeds the wheel a *fractional* position rather than an index, which is
what lets it roll between entries. Note the `HOLD` constant in there: a straight
interpolation between section tops reads as the next section while you are still
at the top of the current one, because the viewport midpoint already sits well
into it. The hold plus a smoothstep keeps each label parked until you have
genuinely left its section.

To add or reorder items, edit `navLinks` in `content.ts` **and** the matching
`<section id="...">` — the rail resolves sections by that id. The rail itself
carries no numbers, but the numbers in the section headings are typed literals,
so renumber those by hand if you reorder.

## Boot overlay

The loading screen is plain markup and an inline `<style>`/`<script>` at the top
of [`index.html`](index.html), deliberately *not* a React component — it has to
paint on the first frame, and a component cannot, because it would be waiting on
the very bundle it is meant to cover.

The handshake:

1. The overlay creeps its progress bar to 90% and parks there.
2. `App.tsx` calls `window.__appReady()` once React has mounted and
   `document.fonts.ready` has settled — earlier than that and Poppins swaps in
   under the user's nose.
3. The bar runs to 100%, holds for a beat, fades, and the node is removed from
   the DOM entirely so it can never trap a click or a focus ring.

Two rules worth keeping if you touch it. **Completion is driven by timers, not
frames** — an early version finished inside the `requestAnimationFrame` loop and
stranded the overlay for eight seconds on a machine where boot starved rAF down
to 5fps. And there is a `MIN` floor of 1100ms, because on a warm cache the
overlay would otherwise appear for a single frame, which reads as a glitch
rather than an intro.

On the way out it dispatches `app:loaded`. [`useAppLoaded`](src/hooks/useAppLoaded.ts)
wraps that, and the hero's decrypt waits on it — without the gate the animation
runs to completion behind the overlay and nobody sees it.

Sections carry `lg:pl-44` to clear the fixed rail. If you lengthen the labels
or bump their font size, re-check that gutter — the rail's widest point (with a
label expanded) must stay left of where the content starts.

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
- **`DarkVeil` is lazy-loaded** so the headline paints without waiting on `ogl`.
- **`SpecularButton` degrades in place rather than via a boundary.** It is also
  WebGL, but it is a primary call-to-action — a boundary would swap the whole
  button out. Its GL setup is wrapped in a `try`/`catch` instead, so a missing
  context costs only the shine and the link still works.
- **Vendored components were modified.** Re-adding them from the registry will
  overwrite these:
  - `MagicBento.tsx` — added a `cards` prop (it hardcoded its own demo data) and
    removed the `max-w-[54rem]` / `width: 90%` constraints so the grid fills its container.
  - `TiltedCard.tsx` — overlay wrapper changed from `absolute top-0 left-0` to
    `absolute inset-0`, so `h-full` works for overlay content.
  - `GlitchText.tsx` — `baseClasses` relaxed to `relative select-none` and the
    opaque `bg-[#120F17]` changed to `bg-transparent`, which was showing as a
    dark rectangle over the hero background.
  - `SpecularButton.tsx` — added `href`/`target`/`rel`. Upstream renders a
    hardcoded `<button>`; with an `href` it now renders an `<a>`, so the hero
    CTAs keep link semantics (cmd/middle-click, "copy link address", and a
    screen reader announcing "link"). Also wrapped the `ogl` setup in a
    `try`/`catch` — see above.
- **Vendored styling is overridden from `src/index.css` instead of being edited**,
  at the bottom of the file — the bento tile `aspect-[4/3]`, and the full dark
  theme for the `StaggeredMenu` panel (it ships white with 4rem type, which also
  pushed the item numbers off a phone screen). `StaggeredMenu` injects its own
  `<style>` into the body, so those overrides deliberately carry an extra class
  (`.sm-dark`) to win on specificity rather than on source order, and sit outside
  `@layer` so they also beat the Tailwind utilities on its JSX.
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
