import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import KinescopeModal from '../components/KinescopeModal';
import VideoPreviewCard from '../components/VideoPreviewCard';
import { SHOWCASE_BLOCKS, type ShowcaseBlock, type VideoProjectInfo } from '../content/showcaseBlocks';
import type { KinescopeVideo } from '../lib/kinescope';

function VideoProjectCaption({
  client,
  description,
  tags,
  align = 'left',
}: VideoProjectInfo & { align?: 'left' | 'right' }) {
  const isRight = align === 'right';

  return (
    <aside
      className={`flex flex-col ${
        isRight ? 'items-end text-right' : 'items-start text-left'
      }`}
    >
      <p
        className="hero-heading whitespace-pre-line font-black uppercase leading-none tracking-tight"
        style={{ fontSize: 'clamp(1.75rem, 4vw, 3rem)' }}
      >
        {client}
      </p>
      <p className="mt-2 whitespace-nowrap text-sm font-light leading-snug text-[#D7E2EA] sm:mt-3 sm:text-base md:text-lg">
        {description}
      </p>
      <p className="mt-3 whitespace-nowrap text-[0.65rem] font-light uppercase leading-relaxed tracking-[0.18em] text-[#D7E2EA]/50 sm:mt-4 sm:text-xs">
        {tags}
      </p>
    </aside>
  );
}

type VideoBlockProps = ShowcaseBlock & {
  onOpenVideo: (video: KinescopeVideo) => void;
};

function VideoBlock({
  title,
  videoSide,
  orientation,
  previewSrc,
  kinescopeEmbedSrc,
  projectInfo,
  onOpenVideo,
  id,
}: VideoBlockProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isVideoLeft = videoSide === 'left';
  const isTitleRight = isVideoLeft;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const headingX = useTransform(
    scrollYProgress,
    [0, 0.35, 0.7, 1],
    isVideoLeft ? ['28vw', '8vw', '-8vw', '-26vw'] : ['-28vw', '-8vw', '8vw', '26vw'],
  );

  const headingOpacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 1], [0.2, 1, 1, 0.5]);

  const handleOpenVideo = () => {
    if (!kinescopeEmbedSrc) return;

    onOpenVideo({
      id,
      title,
      embedSrc: kinescopeEmbedSrc,
      orientation,
    });
  };

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col items-start px-5 sm:px-8 md:px-10"
    >
      <div className="relative mx-auto w-full">
        <motion.h2
          style={{
            x: headingX,
            opacity: headingOpacity,
            willChange: 'transform, opacity',
            marginBottom: 'clamp(-28px, -3.5vw, -52px)',
          }}
          className={`hero-heading pointer-events-none relative z-10 w-fit max-w-none font-black uppercase leading-[0.9] tracking-tight ${
            isTitleRight ? 'ml-auto text-right' : 'mr-auto text-left'
          }`}
        >
          <span
            className="inline-block whitespace-nowrap"
            style={{
              fontSize: `clamp(3.5rem, min(14vw, calc((100vw - 5rem) / ${title.length * 0.58})), 180px)`,
            }}
          >
            {title}
          </span>
        </motion.h2>

        <div className="relative mx-auto w-full max-w-[1400px]">
          <motion.div
            className={`relative z-20 w-fit ${isVideoLeft ? '' : 'ml-auto'}`}
            style={{ willChange: 'transform' }}
          >
            <VideoPreviewCard
              previewSrc={previewSrc}
              orientation={orientation}
              title={title}
              disabled={!kinescopeEmbedSrc}
              onClick={handleOpenVideo}
            />

            {projectInfo ? (
              <div
                className={`pointer-events-none absolute bottom-0 z-30 hidden sm:block ${
                  isVideoLeft ? 'left-full ml-6 md:ml-10' : 'right-full mr-6 md:mr-10'
                }`}
              >
                <VideoProjectCaption
                  {...projectInfo}
                  align={isVideoLeft ? 'left' : 'right'}
                />
              </div>
            ) : null}
          </motion.div>
        </div>

        {projectInfo ? (
          <div className={`mt-6 sm:hidden ${isVideoLeft ? '' : 'flex justify-end'}`}>
            <VideoProjectCaption
              {...projectInfo}
              align={isVideoLeft ? 'left' : 'right'}
            />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export default function VideoShowcaseSection() {
  const [activeVideo, setActiveVideo] = useState<KinescopeVideo | null>(null);

  return (
    <>
      <section
        className="relative z-10 flex flex-col gap-[clamp(3.75rem,16.5vh,9rem)] overflow-x-clip px-0 pb-16 pt-8 sm:pb-20 sm:pt-10 md:pb-24 md:pt-12"
        style={{ backgroundColor: '#0C0C0C' }}
      >
        {SHOWCASE_BLOCKS.map((block) => (
          <VideoBlock key={block.id} {...block} onOpenVideo={setActiveVideo} />
        ))}
      </section>

      <KinescopeModal video={activeVideo} onClose={() => setActiveVideo(null)} />
    </>
  );
}
