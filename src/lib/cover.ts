/**
 * Generates project card artwork as an inline SVG data URI, so the site has
 * real imagery with zero binary assets to manage. Swap `projectCover(...)` for
 * a path to a screenshot whenever you have one.
 */
export function projectCover([from, to]: [string, string], label: string): string {
  const seed = [...label].reduce((a, c) => a + c.charCodeAt(0), 0);
  const angle = seed % 90;

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600">
  <defs>
    <linearGradient id="g" gradientTransform="rotate(${angle} 0.5 0.5)">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="v" cx="30%" cy="20%" r="85%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.34"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.42"/>
    </radialGradient>
    <filter id="n">
      <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3"/>
      <feColorMatrix type="saturate" values="0"/>
    </filter>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0v40" fill="none" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1"/>
    </pattern>
  </defs>
  <rect width="800" height="600" fill="url(#g)"/>
  <rect width="800" height="600" fill="url(#grid)"/>
  <circle cx="${120 + (seed % 400)}" cy="${380 - (seed % 160)}" r="${150 + (seed % 90)}"
          fill="#ffffff" fill-opacity="0.10"/>
  <rect width="800" height="600" fill="url(#v)"/>
  <rect width="800" height="600" filter="url(#n)" opacity="0.10"/>
</svg>`.trim();

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}
