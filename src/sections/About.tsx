import ScrollReveal from '@/components/ScrollReveal';
import CountUp from '@/components/CountUp';
import AnimatedContent from '@/components/AnimatedContent';
import SectionHeading from '@/components/layout/SectionHeading';
import Timeline from '@/components/layout/Timeline';
import { profile, stats } from '@/data/content';

export default function About() {
  return (
    <section id="about" className="relative px-6 py-24 sm:py-32 lg:pl-64">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="02 / About" title="Still a student. Already shipping." />

        <div className="grid gap-16 lg:grid-cols-[1.55fr_1fr] lg:gap-20">
          <ScrollReveal
            baseOpacity={0.08}
            baseRotation={2}
            blurStrength={5}
            enableBlur
            containerClassName="!my-0"
            textClassName="!text-[clamp(1.15rem,2.6vw,1.75rem)] !font-normal !leading-[1.5] !my-0 font-display tracking-tight"
          >
            {profile.bio}
          </ScrollReveal>

          <div className="space-y-8">
            <AnimatedContent direction="horizontal" distance={60} duration={0.9} threshold={0.2}>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-8">
                {stats.map(stat => (
                  <div key={stat.label}>
                    <dd className="font-display text-[clamp(2rem,6vw,3rem)] leading-none font-bold tracking-tight">
                      <CountUp to={stat.value} duration={2} separator="," className="tabular-nums" />
                      <span className="text-violet-glow">{stat.suffix}</span>
                    </dd>
                    <dt className="mt-2.5 font-mono text-[11px] leading-snug tracking-[0.12em] text-mist-500 uppercase">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </AnimatedContent>

            <AnimatedContent direction="horizontal" distance={60} duration={0.9} delay={0.15} threshold={0.2}>
              <div className="hairline space-y-3 rounded-2xl p-5">
                <Row label="Based in" value={profile.location} />
                <Row label="Status" value="Open to work" accent />
                <Row label="Focus" value="Front-end / motion" />
              </div>
            </AnimatedContent>
          </div>
        </div>

        <Timeline />
      </div>
    </section>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-[11px] tracking-[0.12em] text-mist-500 uppercase">{label}</span>
      <span className={`text-sm ${accent ? 'text-emerald-400' : 'text-mist-100'}`}>{value}</span>
    </div>
  );
}
