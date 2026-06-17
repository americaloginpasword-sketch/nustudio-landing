import { useEffect, useRef, useState, type ComponentType } from 'react';

type DeferredSectionProps = {
  load: () => Promise<{ default: ComponentType }>;
  rootMargin?: string;
  idle?: boolean;
  placeholderClassName?: string;
};

export default function DeferredSection({
  load,
  rootMargin = '320px 0px',
  idle = false,
  placeholderClassName,
}: DeferredSectionProps) {
  const anchorRef = useRef<HTMLDivElement>(null);
  const [Section, setSection] = useState<ComponentType | null>(null);

  useEffect(() => {
    if (Section) return;

    let cancelled = false;

    const importSection = () => {
      load()
        .then((module) => {
          if (!cancelled) setSection(() => module.default);
        })
        .catch(() => undefined);
    };

    if (idle) {
      const schedule =
        typeof requestIdleCallback === 'function'
          ? (cb: () => void) => requestIdleCallback(cb, { timeout: 1200 })
          : (cb: () => void) => window.setTimeout(cb, 1);

      const idleId = schedule(importSection);
      return () => {
        cancelled = true;
        if (typeof cancelIdleCallback === 'function' && typeof idleId === 'number') {
          cancelIdleCallback(idleId);
        }
      };
    }

    const anchor = anchorRef.current;
    if (!anchor) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          importSection();
          observer.disconnect();
        }
      },
      { rootMargin },
    );

    observer.observe(anchor);
    return () => {
      cancelled = true;
      observer.disconnect();
    };
  }, [Section, idle, load, rootMargin]);

  if (Section) {
    return (
      <div ref={anchorRef}>
        <Section />
      </div>
    );
  }

  return <div ref={anchorRef} className={placeholderClassName} aria-hidden />;
}
