import { useLayoutEffect, useRef } from 'react';

type HeroTitleProps = {
  text: string;
};

export default function HeroTitle({ text }: HeroTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const title = titleRef.current;
    if (!container || !title) return;

    const fit = () => {
      const maxWidth = container.clientWidth - 4;
      if (maxWidth <= 0) return;

      let low = 16;
      let high = 420;

      while (low < high) {
        const mid = Math.ceil((low + high) / 2);
        title.style.fontSize = `${mid}px`;

        if (title.scrollWidth > maxWidth) {
          high = mid - 1;
        } else {
          low = mid;
        }
      }

      title.style.fontSize = `${low}px`;
    };

    fit();

    const observer = new ResizeObserver(fit);
    observer.observe(container);

    document.fonts?.ready.then(fit).catch(() => undefined);

    return () => observer.disconnect();
  }, [text]);

  return (
    <div ref={containerRef} className="w-full">
      <h1
        ref={titleRef}
        className="hero-heading hero-title-fit cursor-default select-none whitespace-nowrap text-left font-black leading-none"
      >
        {text}
      </h1>
    </div>
  );
}
