import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import KinescopeModal from './KinescopeModal';
import type { KinescopeVideo } from '../lib/kinescope';
import {
  getSharePathForShowcaseVideoId,
  getShowcaseVideoDeepLink,
  isShowcaseVideoDeepLinkPath,
} from '../lib/videoDeepLinks';

type ShowcaseVideoContextValue = {
  openVideo: (video: KinescopeVideo) => void;
};

const ShowcaseVideoContext = createContext<ShowcaseVideoContextValue | null>(null);

function scrollToShowcaseTarget(targetId: string | undefined) {
  if (!targetId) return;

  requestAnimationFrame(() => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' });
  });
}

function getInitialVideoFromLocation(): KinescopeVideo | null {
  if (typeof window === 'undefined') return null;
  return getShowcaseVideoDeepLink(window.location.pathname)?.video ?? null;
}

export function ShowcaseVideoProvider({ children }: { children: ReactNode }) {
  const [activeVideo, setActiveVideo] = useState<KinescopeVideo | null>(getInitialVideoFromLocation);

  const openVideo = useCallback((video: KinescopeVideo) => {
    setActiveVideo(video);
    const sharePath = getSharePathForShowcaseVideoId(video.id);
    if (sharePath) {
      window.history.replaceState(null, '', sharePath);
    }
  }, []);

  const closeVideo = useCallback(() => {
    const deepLink = getShowcaseVideoDeepLink(window.location.pathname);
    setActiveVideo(null);

    if (isShowcaseVideoDeepLinkPath(window.location.pathname)) {
      window.history.replaceState(null, '', '/');
    }

    scrollToShowcaseTarget(deepLink?.scrollTargetId);
  }, []);

  useEffect(() => {
    const deepLink = getShowcaseVideoDeepLink(window.location.pathname);
    if (!deepLink) return;

    setActiveVideo(deepLink.video);
    scrollToShowcaseTarget(deepLink.scrollTargetId);
  }, []);

  useEffect(() => {
    const onPopState = () => {
      const deepLink = getShowcaseVideoDeepLink(window.location.pathname);
      setActiveVideo(deepLink?.video ?? null);
      if (deepLink) {
        scrollToShowcaseTarget(deepLink.scrollTargetId);
      }
    };

    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const contextValue = useMemo(() => ({ openVideo }), [openVideo]);

  return (
    <ShowcaseVideoContext.Provider value={contextValue}>
      {children}
      <KinescopeModal video={activeVideo} onClose={closeVideo} />
    </ShowcaseVideoContext.Provider>
  );
}

export function useShowcaseVideo() {
  const context = useContext(ShowcaseVideoContext);
  if (!context) {
    throw new Error('useShowcaseVideo must be used within ShowcaseVideoProvider');
  }
  return context;
}
