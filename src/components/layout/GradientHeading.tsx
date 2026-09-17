import AnimatedContent from '@/components/AnimatedContent';

type Props = {
  children: React.ReactNode;
  lede?: string;
  /** `section` is a top-level section title; `sub` is a heading within one. */
  size?: 'section' | 'sub';
  as?: 'h2' | 'h3';
  /** Extra classes for the heading element alone, not the divider or lede. */
  titleClassName?: string;
};

/**
 * The blue-to-purple gradient heading used across the page.
 *
 * `inline-block` is load-bearing: as a full-width block the gradient box spans
 * the container and the glyphs only sample its middle, which renders flat
 * purple. Hugging the text shows the whole ramp.
 */
export default function GradientHeading({
  children,
  lede,
  size = 'section',
  as: Tag = 'h2',
  titleClassName = '',
}: Props) {
  return (
    <AnimatedContent distance={40} duration={0.9} threshold={0.15}>
      <div className={size === 'section' ? 'mb-14 text-center sm:mb-20' : 'mb-8 text-center'}>
        <Tag
          className={`mb-4 inline-block bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text font-display font-bold text-transparent ${
            size === 'section' ? 'text-4xl md:text-5xl' : 'text-2xl md:text-3xl'
          } ${titleClassName}`}
        >
          {children}
        </Tag>
        <span
          aria-hidden
          className="mx-auto mt-1 block h-px w-20 bg-gradient-to-r from-transparent via-violet-glow to-transparent"
        />
        {lede && (
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-400">
            {lede}
          </p>
        )}
      </div>
    </AnimatedContent>
  );
}
