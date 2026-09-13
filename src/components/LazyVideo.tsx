import { useEffect, useRef } from 'react';

export type LazyVideoProps = {
  src: string;
  poster: string;
  label: string;
  className?: string;
  pauseWhenHidden?: boolean;
  rootMargin?: string;
};

export default function LazyVideo({
  src,
  poster,
  label,
  className = '',
  pauseWhenHidden = true,
  rootMargin = '160px 0px',
}: LazyVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = () => {
      void video.play().catch(() => undefined);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (video.readyState === 0) {
            video.load();
          }
          tryPlay();
          return;
        }

        if (pauseWhenHidden) {
          video.pause();
        }
      },
      { rootMargin, threshold: 0.15 },
    );

    video.addEventListener('loadeddata', tryPlay);
    observer.observe(video);

    return () => {
      video.removeEventListener('loadeddata', tryPlay);
      observer.disconnect();
    };
  }, [pauseWhenHidden, rootMargin]);

  return (
    <video
      ref={videoRef}
      poster={poster}
      preload="none"
      autoPlay
      muted
      loop
      playsInline
      controls={false}
      disablePictureInPicture
      disableRemotePlayback
      aria-label={label}
      className={className}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
}
