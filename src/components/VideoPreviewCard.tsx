import { Play } from 'lucide-react';
import LazyVideo from './LazyVideo';
import type { VideoOrientation } from '../types/showcase';

type VideoPreviewCardProps = {
  previewSrc: string;
  previewAlt: string;
  poster: string;
  orientation: VideoOrientation;
  title: string;
  disabled?: boolean;
  onClick: () => void;
};

function getFrameClass(orientation: VideoOrientation) {
  return orientation === 'horizontal'
    ? 'w-[min(92vw,780px)] aspect-video'
    : 'w-[min(72vw,320px)] aspect-[9/16] sm:w-[min(42vw,360px)] md:w-[min(34vw,400px)]';
}

export default function VideoPreviewCard({
  previewSrc,
  previewAlt,
  poster,
  orientation,
  title,
  disabled = false,
  onClick,
}: VideoPreviewCardProps) {
  return (
    <button
      type="button"
      aria-label={`Смотреть видео: ${title}`}
      disabled={disabled}
      onClick={onClick}
      className={`group relative overflow-hidden rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] text-left transition-transform duration-300 hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#D7E2EA] disabled:cursor-not-allowed disabled:opacity-60 sm:rounded-[50px] md:rounded-[60px] ${getFrameClass(orientation)}`}
    >
      <LazyVideo
        src={previewSrc}
        poster={poster}
        label={previewAlt}
        className="pointer-events-none block h-full w-full object-cover"
      />

      <span className="absolute inset-0 bg-black/20 transition-colors duration-300 group-hover:bg-black/35 group-disabled:bg-black/20" />

      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/70 bg-black/35 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110 sm:h-20 sm:w-20">
          <Play className="ml-1 h-7 w-7 fill-current sm:h-8 sm:w-8" strokeWidth={0} />
        </span>
      </span>
    </button>
  );
}
