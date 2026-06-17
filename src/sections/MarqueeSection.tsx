import { useEffect, useRef } from 'react';
import { marqueeVideos } from '../assets/media';

const ROW1 = marqueeVideos.slice(0, 4);
const ROW2 = marqueeVideos.slice(4, 9);

function doubleItems(items: string[]) {
  return [...items, ...items];
}

type MarqueeVideoProps = {
  src: string;
};

function MarqueeVideo({ src }: MarqueeVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        video.preload = 'auto';
        if (video.readyState === 0) {
          video.load();
        }

        void video.play().catch(() => undefined);
        observer.disconnect();
      },
      { rootMargin: '160px 0px' },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="none"
      className="pointer-events-none h-[270px] w-[420px] shrink-0 rounded-2xl object-cover"
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
      className="flex flex-col gap-3 overflow-x-clip pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <div ref={row1Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
        {doubleItems(ROW1).map((src, index) => (
          <MarqueeVideo key={`row1-${src}-${index}`} src={src} />
        ))}
      </div>
      <div ref={row2Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
        {doubleItems(ROW2).map((src, index) => (
          <MarqueeVideo key={`row2-${src}-${index}`} src={src} />
        ))}
      </div>
    </section>
  );
}
