import { marqueeVideos } from '../assets/media';
import { DEFAULT_KINESCope_EMBED } from '../lib/kinescope';
import type { VideoOrientation, VideoSide } from '../types/showcase';

export type VideoProjectInfo = {
  client: string;
  description: string;
  tags: string;
};

export type ShowcaseBlock = {
  id: string;
  title: string;
  headingKeywords: string;
  previewAlt: string;
  posterPath: string;
  videoSide: VideoSide;
  orientation: VideoOrientation;
  previewSrc: string;
  /** Base embed URL from Kinescope dashboard, e.g. https://kinescope.io/embed/104a7c3c-... */
  kinescopeEmbedSrc: string | null;
  projectInfo?: VideoProjectInfo;
};

const TEST_KINESCope_EMBED = DEFAULT_KINESCope_EMBED;

export const SHOWCASE_BLOCKS: ShowcaseBlock[] = [
  {
    id: 'commerce',
    title: 'MARKETING',
    headingKeywords: ' — нейросетевые имиджевые ролики для маркетинга',
    previewAlt: 'AI-имиджевый ролик — презентация продуктов для маркетинговых задач',
    posterPath: '/schema/thumbnails/showcase-commerce.jpg',
    videoSide: 'left',
    orientation: 'horizontal',
    previewSrc: marqueeVideos[0],
    kinescopeEmbedSrc: TEST_KINESCope_EMBED,
    projectInfo: {
      client: 'ИМИДЖЕВЫЕ РОЛИКИ',
      description: 'Презентация продуктов',
      tags: 'Реализм / Липсинк / Локации / Люди',
    },
  },
  {
    id: 'event',
    title: 'EVENT',
    headingKeywords: ' — ролики для ивентов и мероприятий',
    previewAlt: 'AI-ролик для ивента — интро и контент конференции в НЦ «Россия»',
    posterPath: '/schema/thumbnails/showcase-event.jpg',
    videoSide: 'right',
    orientation: 'horizontal',
    previewSrc: marqueeVideos[1],
    kinescopeEmbedSrc: TEST_KINESCope_EMBED,
    projectInfo: {
      client: 'КОНТЕНТ ДЛЯ\nМЕРОПРИЯТИЙ',
      description: 'Конференция в НЦ "Россия"',
      tags: 'Интро / Заставки спикеров / Афиши / Маскот',
    },
  },
  {
    id: 'advertising',
    title: 'PROMO',
    headingKeywords: ' — AI-реклама',
    previewAlt: 'AI-рекламный ролик — промо-презентация продукта для рекламной кампании',
    posterPath: '/schema/thumbnails/showcase-advertising.jpg',
    videoSide: 'left',
    orientation: 'horizontal',
    previewSrc: marqueeVideos[2],
    kinescopeEmbedSrc: TEST_KINESCope_EMBED,
    projectInfo: {
      client: 'РЕКЛАМА',
      description: 'Презентация продуктов',
      tags: 'Реализм / Липсинк / Локации / Люди',
    },
  },
  {
    id: 'marketing',
    title: 'SOCIAL NETWORK',
    headingKeywords: ' — ролики для соцсетей',
    previewAlt: 'AI-ролик для соцсетей — Reels и Stories для продвижения бренда',
    posterPath: '/schema/thumbnails/showcase-marketing.jpg',
    videoSide: 'right',
    orientation: 'vertical',
    previewSrc: marqueeVideos[3],
    kinescopeEmbedSrc: TEST_KINESCope_EMBED,
    projectInfo: {
      client: 'ВИРУСНЫЙ КОНТЕНТ',
      description: 'Reels и Stories для брендов',
      tags: 'Shorts / Тренды / Липсинк / Эффекты',
    },
  },
];
