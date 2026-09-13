export const HERO_PORTRAIT_PATH = '/hero/portrait.webp';

export const MARQUEE_VIDEO_POSTERS = [
  '/video-posters/marquee-01.jpg',
  '/video-posters/marquee-02.jpg',
  '/video-posters/marquee-03.jpg',
  '/video-posters/marquee-04.jpg',
  '/video-posters/marquee-05.jpg',
  '/video-posters/marquee-06.jpg',
  '/video-posters/marquee-07.jpg',
  '/video-posters/marquee-08.jpg',
  '/video-posters/marquee-09.jpg',
] as const;

export function getMarqueeVideoPoster(index: number): string {
  return MARQUEE_VIDEO_POSTERS[index] ?? MARQUEE_VIDEO_POSTERS[0];
}
