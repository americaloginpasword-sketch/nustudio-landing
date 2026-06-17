import { useCallback, useRef, type ReactNode } from 'react';

type MagnetProps = {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
};

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className = '',
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isActive = useRef(false);

  const handleMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      const expandedLeft = rect.left - padding;
      const expandedRight = rect.right + padding;
      const expandedTop = rect.top - padding;
      const expandedBottom = rect.bottom + padding;

      const isNear =
        e.clientX >= expandedLeft &&
        e.clientX <= expandedRight &&
        e.clientY >= expandedTop &&
        e.clientY <= expandedBottom;

      if (isNear) {
        isActive.current = true;
        el.style.transition = activeTransition;
        el.style.transform = `translate3d(${distX / strength}px, ${distY / strength}px, 0)`;
      } else if (isActive.current) {
        isActive.current = false;
        el.style.transition = inactiveTransition;
        el.style.transform = 'translate3d(0, 0, 0)';
      }
    },
    [padding, strength, activeTransition, inactiveTransition],
  );

  const handleLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    isActive.current = false;
    el.style.transition = inactiveTransition;
    el.style.transform = 'translate3d(0, 0, 0)';
  }, [inactiveTransition]);

  return (
    <div
      ref={ref}
      className={className}
      style={{ willChange: 'transform' }}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      {children}
    </div>
  );
}
