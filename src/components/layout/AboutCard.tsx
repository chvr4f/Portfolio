import useGitHubStats from '@/hooks/useGitHubStats';
import {
  profile,
  interests,
  githubUser,
  yearsExperience,
  projectsCount,
  topLanguages,
} from '@/data/content';
import ghStats from '@/data/github-stats.json';

/**
 * Static counterpart to the ProfileCard — no tilt, no WebGL. Just glass, the
 * bio, and live numbers from GitHub.
 */
export default function AboutCard() {
  const { data } = useGitHubStats(githubUser);

  // Largest of: the hand-set total (counts private), a token-verified sync, and
  // whatever is publicly visible right now. Whichever is most complete wins, so
  // the number can only ever be understated, never inflated.
  const projects = Math.max(
    projectsCount,
    ghStats.includesPrivate ? ghStats.projects : 0,
    data?.repos ?? 0
  );

  return (
    <div className="group rounded-2xl border border-white/10 bg-white/5 p-7 shadow-[0_8px_32px_rgba(0,0,0,0.37)] backdrop-blur-lg transition-all duration-500 hover:scale-[1.02] hover:border-white/20 hover:bg-white/10 sm:p-8">
      <div className="space-y-6">
        <h3 className="font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-cyan-glow">
          Hello! I&apos;m {profile.name}
        </h3>

        <p className="leading-relaxed text-gray-300">{profile.bio}</p>

        {/* Both values are known at first render, so no skeleton here — the
            live fetch can only revise the project count upward. */}
        <dl className="grid grid-cols-2 gap-6 pt-2">
          <Stat value={`${projects}+`} label="Projects built" className="text-cyan-glow" />
          <Stat value={`${yearsExperience}+`} label="Years experience" className="text-violet-glow" />
        </dl>

        <p className="font-mono text-[11px] tracking-[0.12em] text-mist-500 uppercase">
          Most used: {topLanguages.join(' · ')}
        </p>

        <div className="pt-2">
          <h4 className="mb-3 font-display text-lg font-semibold text-white">What I Love</h4>
          <ul className="flex flex-wrap gap-2">
            {interests.map(tag => (
              <li
                key={tag}
                className="rounded-full border border-cyan-glow/30 bg-cyan-glow/10 px-3 py-1 text-sm text-cyan-glow/90 transition-colors duration-300 hover:bg-cyan-glow/20"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label, className }: { value: string; label: string; className: string }) {
  return (
    <div className="text-center">
      <dd className={`mb-1 font-display text-3xl font-bold tabular-nums ${className}`}>{value}</dd>
      <dt className="text-sm text-gray-400">{label}</dt>
    </div>
  );
}
