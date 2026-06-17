import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type FadeInProps = {
  as?: 'div' | 'li';
  children?: ReactNode;
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
  inView?: boolean;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

export default function FadeIn({
  as: Tag = 'div',
  children,
  delay = 0,
  duration = 0.7,
  x = 0,
  y = 30,
  inView = true,
  className = '',
  style,
  id,
}: FadeInProps) {
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(!inView);

  useEffect(() => {
    if (!inView) {
      setActive(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setActive(true);
          observer.disconnect();
        }
      },
      { rootMargin: '50px', threshold: 0 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [inView]);

  const motionStyle: CSSProperties = {
    ...style,
    ['--fade-delay' as string]: `${delay}s`,
    ['--fade-duration' as string]: `${duration}s`,
    ['--fade-x' as string]: `${x}px`,
    ['--fade-y' as string]: `${y}px`,
  };

  return (
    <Tag
      ref={ref as never}
      id={id}
      className={`fade-in ${active ? 'fade-in--active' : ''} ${className}`.trim()}
      style={motionStyle}
    >
      {children}
    </Tag>
  );
}
