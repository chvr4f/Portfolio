import { useEffect, useState } from 'react';

export type GitHubStats = {
  repos: number;
  followers: number;
  stars: number;
  languages: string[];
  memberSince: number;
};

type Cached = { at: number; data: GitHubStats };

const TTL = 6 * 60 * 60 * 1000; // 6h
const key = (user: string) => `gh-stats:${user}`;

/**
 * Live public stats for a GitHub account.
 *
 * Unauthenticated, because the only alternative is shipping a token in the
 * bundle. Two consequences worth knowing: the limit is 60 requests/hour per IP
 * (hence the 6h localStorage cache), and the contribution count is simply not
 * available — it lives behind the GraphQL API, which always requires a token.
 * Anything claiming to be a contribution graph without one is guessing.
 *
 * Returns `null` data until it resolves, and on any failure, so callers render
 * a real fallback rather than presenting zeros as fact.
 */
function readCache(user: string): GitHubStats | null {
  try {
    const raw = localStorage.getItem(key(user));
    if (!raw) return null;
    const cached: Cached = JSON.parse(raw);
    return Date.now() - cached.at < TTL ? cached.data : null;
  } catch {
    // private mode, or a cache written by an older shape — just refetch
    return null;
  }
}

export default function useGitHubStats(user: string) {
  // Seeded during render rather than in the effect, so a warm cache paints the
  // numbers on the first frame instead of flashing the skeleton.
  const [data, setData] = useState<GitHubStats | null>(() => readCache(user));
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    if (readCache(user)) return;

    (async () => {
      try {
        const headers = { Accept: 'application/vnd.github+json' };
        const [profileRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${user}`, { headers }),
          // `type=all` matters: the default is `owner`, which silently drops
          // every repo you were added to as a collaborator. For this account
          // that was 4 of 9.
          fetch(`https://api.github.com/users/${user}/repos?per_page=100&type=all&sort=pushed`, {
            headers,
          }),
        ]);
        if (!profileRes.ok || !reposRes.ok) throw new Error(String(profileRes.status));

        const profile = await profileRes.json();
        const repos: Array<{
          stargazers_count: number;
          language: string | null;
          fork: boolean;
          owner: { login: string };
        }> = await reposRes.json();

        // A fork is someone else's project you happen to have a copy of.
        const projects = repos.filter(r => !r.fork);

        const counts = new Map<string, number>();
        for (const r of projects) {
          if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
        }

        const next: GitHubStats = {
          // Not profile.public_repos — that counts only what this account
          // owns (5), not the shared repos it actually works in (9).
          repos: projects.length,
          followers: profile.followers ?? 0,
          stars: projects.reduce((sum, r) => sum + (r.stargazers_count ?? 0), 0),
          languages: [...counts.entries()].sort((a, b) => b[1] - a[1]).map(([l]) => l),
          memberSince: new Date(profile.created_at).getFullYear(),
        };

        if (!alive) return;
        setData(next);
        try {
          localStorage.setItem(key(user), JSON.stringify({ at: Date.now(), data: next } satisfies Cached));
        } catch {
          // storage full or blocked — the stats still render, just uncached
        }
      } catch {
        if (alive) setFailed(true);
      }
    })();

    return () => {
      alive = false;
    };
  }, [user]);

  return { data, failed };
}
