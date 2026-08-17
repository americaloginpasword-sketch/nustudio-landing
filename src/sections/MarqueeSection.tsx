import { useEffect, useRef } from 'react';
import { marqueeVideos } from '../assets/media';

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
  className?: string;
  pauseWhenHidden?: boolean;
};

function MarqueeVideo({ src, className = '', pauseWhenHidden = false }: MarqueeVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      void video.play().catch(() => undefined);
    };

    if (!pauseWhenHidden) {
      video.preload = 'auto';
      tryPlay();

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          if (video.readyState === 0) {
            video.load();
          }

          tryPlay();
          observer.disconnect();
        },
        { rootMargin: '160px 0px' },
      );

      video.addEventListener('loadeddata', tryPlay);
      observer.observe(video);

      return () => {
        video.removeEventListener('loadeddata', tryPlay);
        observer.disconnect();
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.preload = 'auto';
          if (video.readyState === 0) {
            video.load();
          }
          tryPlay();
          return;
        }

        video.pause();
      },
      { rootMargin: '120px 0px', threshold: 0.15 },
    );

    video.addEventListener('loadeddata', tryPlay);
    observer.observe(video);

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      observer.disconnect();
    };
  }, [pauseWhenHidden]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload={pauseWhenHidden ? 'none' : 'auto'}
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      className={`marquee-video pointer-events-none shrink-0 object-cover ${className}`}
    >
      <source src={src} type="video/mp4" />
    </video>
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
            {row.map((src) => (
              <MarqueeVideo
                key={src}
                src={src}
                pauseWhenHidden
                className="aspect-video w-full rounded-xl"
              />
            ))}
          </div>
        ))}
      </div>

      <div className="hidden flex-col gap-3 sm:flex">
        <div ref={row1Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {doubleItems(ROW1).map((src, index) => (
            <MarqueeVideo
              key={`row1-${src}-${index}`}
              src={src}
              className="h-[200px] w-[320px] rounded-2xl md:h-[270px] md:w-[420px]"
            />
          ))}
        </div>
        <div ref={row2Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {doubleItems(ROW2).map((src, index) => (
            <MarqueeVideo
              key={`row2-${src}-${index}`}
              src={src}
              className="h-[200px] w-[320px] rounded-2xl md:h-[270px] md:w-[420px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
