import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  buildKinescopeEmbedSrc,
  KINESCOPE_IFRAME_ALLOW,
  type KinescopeVideo,
  type VideoOrientation,
} from '../lib/kinescope';

type KinescopeModalProps = {
  video: KinescopeVideo | null;
  onClose: () => void;
};

function getAspectClass(orientation: VideoOrientation) {
  return orientation === 'horizontal' ? 'aspect-video' : 'aspect-[9/16]';
}

export default function KinescopeModal({ video, onClose }: KinescopeModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [iframeSrc, setIframeSrc] = useState('');

  const stopPlayback = useCallback(() => {
    if (iframeRef.current) {
      iframeRef.current.src = '';
    }
    setIframeSrc('');
  }, []);

  const handleClose = useCallback(() => {
    stopPlayback();
    onClose();
  }, [onClose, stopPlayback]);

  useEffect(() => {
    if (!video) {
      stopPlayback();
      return;
    }

    setIframeSrc(buildKinescopeEmbedSrc(video.embedSrc, true));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      stopPlayback();
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [video, handleClose, stopPlayback]);

  if (typeof document === 'undefined') {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {video ? (
        <motion.div
          key={video.id}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          role="presentation"
        >
          <motion.button
            type="button"
            aria-label="Закрыть видео"
            className="absolute inset-0 bg-black/80 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={video.title}
            className="relative z-10 w-[min(96vw,1200px)] md:w-[min(68vw,1200px)]"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              aria-label="Закрыть"
              className="absolute -right-1 -top-12 flex h-10 w-10 items-center justify-center rounded-full border border-[#D7E2EA]/30 bg-[#0C0C0C]/90 text-[#D7E2EA] transition-opacity hover:opacity-70 sm:-right-3 sm:-top-14 sm:h-11 sm:w-11"
              onClick={handleClose}
            >
              <X className="h-5 w-5" strokeWidth={1.75} />
            </button>

            <div
              className={`w-full overflow-hidden rounded-[24px] border-2 border-[#D7E2EA] bg-black shadow-[0_24px_80px_rgba(0,0,0,0.55)] sm:rounded-[32px] ${getAspectClass(video.orientation)} max-h-[min(90vh,720px)]`}
            >
              <iframe
                ref={iframeRef}
                title={video.title}
                src={iframeSrc}
                loading="lazy"
                className="h-full w-full"
                allow={KINESCOPE_IFRAME_ALLOW}
                allowFullScreen
              />
            </div>

            {video.caption ? (
              <div className="mt-4 text-left sm:mt-5">
                <h3
                  className={`hero-heading font-black leading-none tracking-tight ${
                    video.caption.uppercaseHeading !== false ? 'uppercase' : ''
                  }`}
                  style={{ fontSize: 'clamp(1.25rem, 3vw, 2rem)' }}
                >
                  {video.caption.heading}
                </h3>
                <p
                  className="mt-2 font-light leading-snug text-[#D7E2EA] sm:mt-2.5"
                  style={{ fontSize: 'clamp(0.875rem, 1.6vw, 1.125rem)' }}
                >
                  {video.caption.text}
                </p>
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
