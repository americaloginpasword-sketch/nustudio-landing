import { useEffect, useRef } from 'react';
import { marqueeVideos } from '../assets/media';
import LazyVideo from '../components/LazyVideo';
import { getMarqueeVideoPoster } from '../content/videoPosters';

const MARQUEE_VIDEO_ALTS = [
  'AI-имиджевый ролик — презентация продукта для маркетинга',
  'AI-ролик для ивента — интро мероприятия и конференции',
  'AI-рекламный ролик — промо-презентация продукта',
  'AI-ролик для соцсетей — вертикальный контент для Reels',
  'AI-видео — обложка музыкального релиза',
  'AI-ролик для ивента — визуальное сопровождение мероприятия',
  'AI-рекламный ролик — имиджевая сцена для бренда',
  'AI-ролик для соцсетей — вирусный контент для Stories',
  'AI-видео — нейросетевой промо-ролик для рекламной кампании',
] as const;

const ROW1 = marqueeVideos.slice(0, 4);
const ROW2 = marqueeVideos.slice(4, 9);

const MOBILE_ROWS = [
  marqueeVideos.slice(0, 3),
  marqueeVideos.slice(3, 5),
  marqueeVideos.slice(5, 7),
  marqueeVideos.slice(7, 9),
] as const;

function doubleItems(items: string[]) {
  return [...items, ...items];
}

type MarqueeVideoProps = {
  src: string;
  index: number;
  label: string;
  className?: string;
};

function MarqueeVideo({ src, index, label, className = '' }: MarqueeVideoProps) {
  return (
    <LazyVideo
      src={src}
      poster={getMarqueeVideoPoster(index)}
      label={label}
      className={`marquee-video pointer-events-none shrink-0 object-cover ${className}`}
    />
  );
}

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const offsetRef = useRef(0);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const scrollOffset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;
      if (scrollOffset === offsetRef.current) return;

      offsetRef.current = scrollOffset;
      const rowOffset = scrollOffset - 200;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${rowOffset}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-rowOffset}px)`;
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col gap-2 overflow-x-clip pb-8 pt-16 sm:gap-3 sm:pb-10 sm:pt-24 md:pt-32 lg:pt-40"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <div className="flex flex-col gap-2 px-4 sm:hidden">
        {MOBILE_ROWS.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${row.length}, minmax(0, 1fr))` }}
          >
            {row.map((src) => {
              const index = marqueeVideos.indexOf(src);
              return (
                <MarqueeVideo
                  key={src}
                  src={src}
                  index={index}
                  label={MARQUEE_VIDEO_ALTS[index] ?? MARQUEE_VIDEO_ALTS[0]}
                  className="aspect-video w-full rounded-xl"
                />
              );
            })}
          </div>
        ))}
      </div>

      <div className="hidden flex-col gap-3 sm:flex">
        <div ref={row1Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {doubleItems(ROW1).map((src, index) => {
            const videoIndex = marqueeVideos.indexOf(src);
            return (
              <MarqueeVideo
                key={`row1-${src}-${index}`}
                src={src}
                index={videoIndex}
                label={MARQUEE_VIDEO_ALTS[videoIndex] ?? MARQUEE_VIDEO_ALTS[0]}
                className="h-[200px] w-[320px] rounded-2xl md:h-[270px] md:w-[420px]"
              />
            );
          })}
        </div>
        <div ref={row2Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {doubleItems(ROW2).map((src, index) => {
            const videoIndex = marqueeVideos.indexOf(src);
            return (
              <MarqueeVideo
                key={`row2-${src}-${index}`}
                src={src}
                index={videoIndex}
                label={MARQUEE_VIDEO_ALTS[videoIndex] ?? MARQUEE_VIDEO_ALTS[0]}
                className="h-[200px] w-[320px] rounded-2xl md:h-[270px] md:w-[420px]"
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
