export type VideoOrientation = 'horizontal' | 'vertical';

export type KinescopeVideo = {
  id: string;
  title: string;
  /** Embed URL, popup.js URL, or video ID from Kinescope dashboard */
  embedSrc: string;
  orientation: VideoOrientation;
};

export function parseKinescopeVideoId(input: string): string | null {
  const trimmed = input.trim();

  const popupMatch = trimmed.match(/kinescope\.io\/([^/?#]+)\/popup\.js/i);
  if (popupMatch?.[1]) return popupMatch[1];

  const embedMatch = trimmed.match(/kinescope\.io\/embed\/([^/?#]+)/i);
  if (embedMatch?.[1]) return embedMatch[1];

  return null;
}

export function buildKinescopePosterUrl(input: string): string | null {
  const videoId = parseKinescopeVideoId(input);
  return videoId ? `https://kinescope.io/${videoId}/poster.webp` : null;
}

export function parseKinescopeEmbedSrc(input: string): string {
  const trimmed = input.trim();

  const popupMatch = trimmed.match(/kinescope\.io\/([^/?#]+)\/popup\.js/i);
  if (popupMatch?.[1]) {
    return `https://kinescope.io/embed/${popupMatch[1]}`;
  }

  const embedMatch = trimmed.match(/(https:\/\/kinescope\.io\/embed\/[^/?#\s"']+)/i);
  if (embedMatch?.[1]) {
    return embedMatch[1];
  }

  if (trimmed.startsWith('http')) {
    return trimmed;
  }

  return `https://kinescope.io/embed/${trimmed}`;
}

/** Matches Kinescope popup.js: frameUrl with ?autoplay=1 */
export function buildKinescopeEmbedSrc(embedSrc: string, autoplay = true): string {
  const url = new URL(parseKinescopeEmbedSrc(embedSrc));

  url.searchParams.delete('auto-play');

  if (autoplay) {
    url.searchParams.set('autoplay', '1');
  } else {
    url.searchParams.delete('autoplay');
  }

  return url.toString();
}

export const KINESCOPE_IFRAME_ALLOW =
  'autoplay; fullscreen; picture-in-picture; encrypted-media; gyroscope; accelerometer; clipboard-write; screen-wake-lock';
