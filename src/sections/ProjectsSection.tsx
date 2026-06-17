import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import FadeIn from '../components/FadeIn';
import LiveProjectButton from '../components/LiveProjectButton';
import { projectImages } from '../assets/media';

type Project = {
  number: string;
  category: string;
  name: string;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
};

const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Клиент',
    name: 'СБЕР',
    images: projectImages.p1,
  },
  {
    number: '02',
    category: 'Клиент',
    name: 'НЦ "РОССИЯ"',
    images: projectImages.p2,
  },
  {
    number: '03',
    category: 'Клиент',
    name: 'Solaris Digital',
    images: projectImages.p3,
  },
];

const TOTAL_CARDS = PROJECTS.length;

type ProjectCardProps = {
  project: Project;
  index: number;
};

function ProjectCard({ project, index }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * 0.03;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-[calc(6rem+var(--offset))] md:top-[calc(8rem+var(--offset))]"
      style={{
        ['--offset' as string]: `${index * 28}px`,
        zIndex: index + 1,
      }}
    >
      <motion.article
        style={{ scale, transformOrigin: 'top center' }}
        className="overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4 sm:mb-8">
          <div className="flex flex-wrap items-baseline gap-3 sm:gap-6">
            <span
              className="font-black text-[#D7E2EA]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}
            >
              {project.number}
            </span>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium uppercase tracking-widest text-[#D7E2EA]/70 sm:text-base">
                {project.category}
              </span>
              <h3
                className="font-medium uppercase text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton />
        </div>

        <div className="flex items-stretch gap-3 sm:gap-4">
          <div
            className="flex w-[40%] flex-col gap-3 sm:gap-4"
            style={{ height: 'clamp(300px, 38vw, 570px)' }}
          >
            <img
              src={project.images.col1Top}
              alt=""
              className="w-full shrink-0 rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.images.col1Bottom}
              alt=""
              className="min-h-0 w-full flex-1 rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
          <img
            src={project.images.col2}
            alt=""
            className="w-[60%] shrink-0 rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            style={{ height: 'clamp(300px, 38vw, 570px)' }}
          />
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
      style={{ backgroundColor: '#0C0C0C' }}
    >
      <FadeIn delay={0} y={40} className="mb-12 sm:mb-16 md:mb-20">
        <h2 className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight">
          НОВЫЕ ПРОЕКТЫ
        </h2>
      </FadeIn>

      <div className="relative mx-auto grid max-w-6xl gap-y-[50vh] pb-[10vh]">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.number} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}
