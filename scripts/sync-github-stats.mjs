/**
 * Refreshes src/data/github-stats.json from the GitHub API.
 *
 * Why this is a build step and not a fetch in the page: counting private and
 * collaborator repos requires an authenticated token, and a token in a
 * client-side bundle is readable by anyone who opens devtools — it would hand
 * every visitor read access to the private repos it is there to count. So the
 * token stays here, on your machine or in CI, and only the resulting numbers
 * ship.
 *
 *   GITHUB_TOKEN=ghp_xxx node scripts/sync-github-stats.mjs
 *
 * The token needs the `repo` scope to see private repos. A classic PAT or a
 * fine-grained token with read-only repository metadata both work.
 */
import { writeFile } from 'node:fs/promises';

const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error('GITHUB_TOKEN is not set — refusing to run.');
  console.error('Without it the API returns public repos only, which is what');
  console.error('the page already fetches live. Nothing to sync.');
  process.exit(1);
}

const headers = {
  Accept: 'application/vnd.github+json',
  Authorization: `Bearer ${token}`,
  'X-GitHub-Api-Version': '2022-11-28',
};

// affiliation covers repos you own, ones you were added to as a collaborator,
// and ones you reach through an org; visibility=all adds the private ones.
const repos = [];
for (let page = 1; ; page++) {
  const url =
    'https://api.github.com/user/repos' +
    `?per_page=100&page=${page}&affiliation=owner,collaborator,organization_member&visibility=all`;
  const res = await fetch(url, { headers });
  if (!res.ok) {
    console.error(`GitHub returned ${res.status}: ${await res.text()}`);
    process.exit(1);
  }
  const batch = await res.json();
  repos.push(...batch);
  if (batch.length < 100) break;
}

// Whose account this token belongs to — used to split owned from shared,
// rather than assuming a hardcoded handle.
const me = (await (await fetch('https://api.github.com/user', { headers })).json()).login;

// Forks are someone else's project you happen to have a copy of.
const projects = repos.filter(r => !r.fork);
const owned = projects.filter(r => !r.private);

const languages = new Map();
for (const r of projects) {
  if (r.language) languages.set(r.language, (languages.get(r.language) ?? 0) + 1);
}

const out = {
  projects: projects.length,
  private: projects.filter(r => r.private).length,
  public: owned.length,
  shared: projects.filter(r => r.owner?.login?.toLowerCase() !== me.toLowerCase()).length,
  languages: [...languages.entries()].sort((a, b) => b[1] - a[1]).map(([l]) => l),
  includesPrivate: true,
  generatedAt: new Date().toISOString().slice(0, 10),
};

await writeFile('src/data/github-stats.json', JSON.stringify(out, null, 2) + '\n');
console.log('Wrote src/data/github-stats.json:', out);
