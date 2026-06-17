import { motion, useScroll, useTransform } from 'framer-motion';
import { useMemo, useRef } from 'react';

type AnimatedTextProps = {
  text: string;
  className?: string;
};

export default function AnimatedText({ text, className = '' }: AnimatedTextProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 0.8', 'end 0.2'],
  });

  const characters = useMemo(() => text.split(''), [text]);

  return (
    <p ref={containerRef} className={className}>
      {characters.map((char, index) => (
        <Char key={`${char}-${index}`} char={char} index={index} total={characters.length} progress={scrollYProgress} />
      ))}
    </p>
  );
}

type CharProps = {
  char: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>['scrollYProgress'];
};

function Char({ char, index, total, progress }: CharProps) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}
