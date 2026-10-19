import { EVENT_KINESCope_EMBED, type KinescopeVideo } from './kinescope';

export type ShowcaseVideoDeepLink = {
  pathname: string;
  video: KinescopeVideo;
  /** Элемент страницы после закрытия модалки */
  scrollTargetId?: string;
};

/** Публичная ссылка для шаринга EVENT-ролика */
export const EVENT_VIDEO_SHARE_PATH = '/event/company';

const SHOWCASE_VIDEO_DEEP_LINKS: ShowcaseVideoDeepLink[] = [
  {
    pathname: EVENT_VIDEO_SHARE_PATH,
    scrollTargetId: 'event',
    video: {
      id: 'event',
      title: 'EVENT',
      embedSrc: EVENT_KINESCope_EMBED,
      orientation: 'horizontal',
    },
  },
];

function normalizePathname(pathname: string): string {
  const trimmed = pathname.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function getShowcaseVideoDeepLink(pathname: string): ShowcaseVideoDeepLink | null {
  const normalized = normalizePathname(pathname);
  return SHOWCASE_VIDEO_DEEP_LINKS.find((link) => normalizePathname(link.pathname) === normalized) ?? null;
}

export function isShowcaseVideoDeepLinkPath(pathname: string): boolean {
  return getShowcaseVideoDeepLink(pathname) !== null;
}

export function getSharePathForShowcaseVideoId(videoId: string): string | null {
  const link = SHOWCASE_VIDEO_DEEP_LINKS.find((entry) => entry.video.id === videoId);
  return link?.pathname ?? null;
}
