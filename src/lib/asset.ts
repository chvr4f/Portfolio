/**
 * Resolves a file in public/ against the deploy base.
 *
 * Vite rewrites asset URLs it imports, but not plain strings like
 * '/subject.png' — those always point at the domain root. That is fine on a
 * root deploy and breaks every image under a sub-path such as GitHub Pages'
 * /<repo>/. Pass paths from public/ through here and both work.
 */
export function asset(path: string): string {
  if (/^(https?:|data:|blob:)/.test(path)) return path;
  return import.meta.env.BASE_URL.replace(/\/$/, '') + '/' + path.replace(/^\//, '');
}
