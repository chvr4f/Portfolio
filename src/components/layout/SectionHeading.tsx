import AnimatedContent from '@/components/AnimatedContent';

type Props = {
  index: string;
  title: string;
  lede?: string;
};

export default function SectionHeading({ index, title, lede }: Props) {
  return (
    <AnimatedContent distance={40} duration={0.9} threshold={0.15}>
      <div className="mb-12 max-w-2xl sm:mb-16">
        <div className="mb-4 flex items-center gap-3">
          <span className="font-mono text-[11px] tracking-[0.2em] text-violet-glow uppercase">
            {index}
          </span>
          <span aria-hidden className="h-px w-12 bg-gradient-to-r from-violet-glow to-transparent" />
        </div>
        <h2 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-bold tracking-tight text-balance">
          {title}
        </h2>
        {lede && (
          <p className="mt-4 text-[15px] leading-relaxed text-mist-500 sm:text-base">{lede}</p>
        )}
      </div>
    </AnimatedContent>
  );
}
