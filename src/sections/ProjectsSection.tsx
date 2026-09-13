import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import FadeIn from '../components/FadeIn';
import KinescopeModal from '../components/KinescopeModal';
import LiveProjectButton from '../components/LiveProjectButton';
import { projectImages } from '../assets/media';
import { DEFAULT_KINESCope_EMBED, type KinescopeVideo, type KinescopeVideoCaption, type VideoOrientation } from '../lib/kinescope';

type Project = {
  number: string;
  category: string;
  name: string;
  uppercaseName?: boolean;
  kinescopeEmbedSrc: string | null;
  orientation?: VideoOrientation;
  videoCaption: KinescopeVideoCaption;
  images: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
  imageAlts: {
    col1Top: string;
    col1Bottom: string;
    col2: string;
  };
  imageSizes: {
    col1Top: { width: number; height: number };
    col1Bottom: { width: number; height: number };
    col2: { width: number; height: number };
  };
};

const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Клиент',
    name: 'СБЕР',
    kinescopeEmbedSrc: DEFAULT_KINESCope_EMBED,
    videoCaption: {
      heading: 'СБЕР',
      text: 'Презентация продуктов и имиджевые ролики',
    },
    images: projectImages.p1,
    imageAlts: {
      col1Top: 'AI-имиджевый ролик для Сбера — кадр презентации продукта',
      col1Bottom: 'AI-имиджевый ролик для Сбера — имиджевая сцена для бренда',
      col2: 'AI-имиджевый ролик для Сбера — ключевой кадр рекламного ролика',
    },
    imageSizes: {
      col1Top: { width: 3358, height: 1878 },
      col1Bottom: { width: 3360, height: 1884 },
      col2: { width: 3358, height: 1864 },
    },
  },
  {
    number: '02',
    category: 'Клиент',
    name: 'НЦ "РОССИЯ"',
    kinescopeEmbedSrc: DEFAULT_KINESCope_EMBED,
    videoCaption: {
      heading: 'НЦ "РОССИЯ"',
      text: 'Контент для мероприятий и конференции',
    },
    images: projectImages.p2,
    imageAlts: {
      col1Top: 'AI-ролик для ивента — кадр интро конференции в НЦ «Россия»',
      col1Bottom: 'AI-ролик для мероприятия — заставка спикера конференции',
      col2: 'AI-ролик для ивента — визуальный контент конференции в НЦ «Россия»',
    },
    imageSizes: {
      col1Top: { width: 6336, height: 2688 },
      col1Bottom: { width: 6336, height: 2688 },
      col2: { width: 6336, height: 2688 },
    },
  },
  {
    number: '03',
    category: 'Клиент',
    name: 'Девелопер GLORAX',
    uppercaseName: false,
    kinescopeEmbedSrc: DEFAULT_KINESCope_EMBED,
    videoCaption: {
      heading: 'Девелопер GLORAX',
      text: 'Видеопрезентация девелоперского проекта',
      uppercaseHeading: false,
    },
    images: projectImages.p3,
    imageAlts: {
      col1Top: 'AI-видеопрезентация GLORAX — архитектурный кадр девелоперского проекта',
      col1Bottom: 'AI-видеопрезентация GLORAX — атмосферная сцена жилого комплекса',
      col2: 'AI-видеопрезентация GLORAX — ключевой кадр промо-ролика девелопера',
    },
    imageSizes: {
      col1Top: { width: 3360, height: 1890 },
      col1Bottom: { width: 3356, height: 1882 },
      col2: { width: 3360, height: 1894 },
    },
  },
];

const TOTAL_CARDS = PROJECTS.length;

type ProjectCardProps = {
  project: Project;
  index: number;
  onOpenVideo: (project: Project) => void;
};

function ProjectCard({ project, index, onOpenVideo }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const targetScale = 1 - (TOTAL_CARDS - 1 - index) * 0.03;

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  const handleOpenVideo = () => {
    onOpenVideo(project);
  };

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
                className={`font-medium text-[#D7E2EA] ${project.uppercaseName !== false ? 'uppercase' : ''}`}
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton
            onClick={handleOpenVideo}
            disabled={!project.kinescopeEmbedSrc}
          />
        </div>

        <div className="flex items-stretch gap-3 sm:gap-4">
          <div
            className="flex w-[40%] flex-col gap-3 sm:gap-4"
            style={{ height: 'clamp(300px, 38vw, 570px)' }}
          >
            <img
              src={project.images.col1Top}
              alt={project.imageAlts.col1Top}
              width={project.imageSizes.col1Top.width}
              height={project.imageSizes.col1Top.height}
              loading="lazy"
              decoding="async"
              className="w-full shrink-0 rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <img
              src={project.images.col1Bottom}
              alt={project.imageAlts.col1Bottom}
              width={project.imageSizes.col1Bottom.width}
              height={project.imageSizes.col1Bottom.height}
              loading="lazy"
              decoding="async"
              className="min-h-0 w-full flex-1 rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            />
          </div>
          <img
            src={project.images.col2}
            alt={project.imageAlts.col2}
            width={project.imageSizes.col2.width}
            height={project.imageSizes.col2.height}
            loading="lazy"
            decoding="async"
            className="w-[60%] shrink-0 rounded-[40px] object-cover sm:rounded-[50px] md:rounded-[60px]"
            style={{ height: 'clamp(300px, 38vw, 570px)' }}
          />
        </div>
      </motion.article>
    </div>
  );
}

export default function ProjectsSection() {
  const [activeVideo, setActiveVideo] = useState<KinescopeVideo | null>(null);

  const handleOpenVideo = (project: Project) => {
    if (!project.kinescopeEmbedSrc) return;

    setActiveVideo({
      id: `project-${project.number}`,
      title: project.name,
      embedSrc: project.kinescopeEmbedSrc,
      orientation: project.orientation ?? 'horizontal',
      caption: project.videoCaption,
    });
  };

  return (
    <>
      <section
        id="projects"
        className="relative z-10 -mt-10 rounded-t-[40px] px-5 pt-20 pb-10 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 sm:pb-12 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-14"
        style={{ backgroundColor: '#0C0C0C' }}
      >
        <FadeIn delay={0} y={40} className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="hero-heading section-title text-center font-black uppercase leading-none tracking-tight">
            НОВЫЕ ПРОЕКТЫ
          </h2>
        </FadeIn>

        <div className="relative mx-auto grid max-w-6xl gap-y-[50vh] pb-[5vh]">
          {PROJECTS.map((project, index) => (
            <ProjectCard
              key={project.number}
              project={project}
              index={index}
              onOpenVideo={handleOpenVideo}
            />
          ))}
        </div>
      </section>

      <KinescopeModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
