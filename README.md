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

- **lg and up** — React Bits [`OptionWheel`](src/components/OptionWheel.tsx) as a
  fixed rail. The active option sits at the vertical centre with the others
  curving away above and below, behind a static highlight band.
- **below lg** — React Bits `StaggeredMenu` as a slide-in panel, because a fixed
  rail has nowhere to live on a phone.

`SideNav` feeds the wheel a *fractional* `position` rather than an index, which is
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
- **`LightRays` (About background) is lazy-loaded and boundary-wrapped**, same
  as DarkVeil — it is `ogl` too, and throws the same way without a GL context.
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
  - `ChromaGrid.tsx` — reshaped into a project grid. Flex-wrap of fixed 300px
    cards became a 1/2/3-column grid (equal widths, and equal heights per row
    because grid items stretch); text is pinned to the card bottom so titles
    align; descriptions clamp at 3 lines; added `tech` (dot-separated line) and
    `desaturate` (off here — upstream greys out everything away from the
    pointer, and everything before the pointer arrives). The per-card gradient
    is a faint hover tint rather than the whole card background, and
    `cursor-pointer`/click only apply when a card has a `url`. The footer grid
    upstream assumed `handle` and `location` exist; without them the
    description fell into the side column next to the title. Added
    `onCardSelect`, which makes a card open the write-up dialog instead of the
    link, and with it the keyboard and ARIA affordances upstream's plain
    `onClick` div lacks. The description and stack lines carry a height floor
    as well as a clamp, so those rows start on the same line in every card;
    the title deliberately has none, because the footer is bottom-pinned and a
    floor there would only open a gap under every single-line title.
  - `OptionWheel.tsx` — upstream is a self-contained picker that owns its own
    index (`defaultSelected` only seeds state; it is absent from the sync
    effect's deps, so it does nothing after mount). Added a controlled
    fractional `position` so page scroll can drive the wheel, an `onUserSelect`
    that fires only for a click or an arrow key — `onChange` also fires when
    `position` moves the wheel, so navigating from it would feed the scroll
    back into itself — and a `captureScroll` flag. That last one matters:
    upstream binds a non-passive `wheel` listener that calls `preventDefault`
    and sets `touch-action: none`, which is right for a picker but in a fixed
    rail stops the page scrolling whenever the cursor crosses the nav, and
    blocks scrolling over it entirely on a touchscreen.
  - `SpecularButton.tsx` — added `href`/`target`/`rel`. Upstream renders a
    hardcoded `<button>`; with an `href` it now renders an `<a>`, so the hero
    CTAs keep link semantics (cmd/middle-click, "copy link address", and a
    screen reader announcing "link"). Also wrapped the `ogl` setup in a
    `try`/`catch` — see above.
- **GitHub numbers.** The About card fetches public stats live (cached 6h in
  localStorage; the unauthenticated limit is 60 req/hour per IP). Two things it
  deliberately does *not* do: there is no contribution count, because that lives
  behind the GraphQL API and always needs a token; and private/collaborator
  repos are not visible to it for the same reason. To count those, run
  `GITHUB_TOKEN=... npm run sync:github`, which writes `src/data/github-stats.json`
  at build time so only the numbers ship, never the token. Putting a token in
  the bundle would give every visitor read access to the private repos it is
  there to count.
- **`projectsCount` and `topLanguages` in `content.ts` are hand-set**, because
  the public API sees only 9 repos (5 owned + 4 shared) and ranks languages by
  repo count, weighting every repo equally. The card takes `Math.max` of the
  hand-set count, any token-verified sync, and the live public count — so the
  number can be understated but never inflated.
- **Counting shared repos needs `type=all`.** `/users/{u}/repos` defaults to
  `type=owner`, which silently drops every repo you were added to as a
  collaborator — 4 of 9 on this account.
- **`yearsExperience` in `content.ts` is a hand-set placeholder.** Nothing on
  GitHub can derive it — the account dates from 2025, which is when pushing
  started, not when building did.
- **`.sm-scope.fixed` gets `pointer-events: none`** (see `index.css`).
  StaggeredMenu's outermost wrapper is fixed and full-viewport at z-40 but never
  sets pointer-events, so below `lg` it covered the page and swallowed every
  click — nothing on the site was tappable on a phone. Its toggle and panel
  already declare `pointer-events-auto`, so only the wrapper needed opening up.
- **`ProfileCard` needs the `pc-fit` class** (see `index.css`). It sizes itself
  from its *height* — `80svh` capped at 540px — with a fixed aspect ratio, so
  its width is derived and it cannot shrink below ~388px; on a phone it
  overflowed its column and was clipped at the screen edge. The override drives
  it from the container width instead. The same block scales the portrait to
  82%: the component's demo uses a waist-up cutout, and a head-and-shoulders
  crop at full width puts the face straight through the name and title.
- **The portrait is `public/subject.png`**, downscaled to 610x900 (282KB) from a
  2210x3258 4MB original. The original is kept locally but gitignored. If you
  swap the photo, keep it a bottom-anchored cutout with a transparent
  background — the card blends it with `mix-blend-mode: luminosity`.
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
