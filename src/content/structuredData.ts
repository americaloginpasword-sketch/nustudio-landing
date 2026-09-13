import { CONTACT_EMAIL, CONTACT_TELEGRAM_URL } from './contacts';
import { buildKinescopeEmbedSrc, DEFAULT_KINESCope_EMBED } from '../lib/kinescope';

/** Добавьте ссылки на соцсети NUstudio для поля Organization.sameAs */
export const ORGANIZATION_SAME_AS = [CONTACT_TELEGRAM_URL] as const;

const ORGANIZATION_DESCRIPTION =
  'NUstudio — AI-видеопродакшн под ключ: нейросетевые рекламные ролики, интро для ивентов, анонсы для соцсетей и обложки релизов.';

export type PortfolioVideoSchema = {
  id: string;
  name: string;
  description: string;
  thumbnailPath: string;
  uploadDate: string;
  embedSrc: string;
};

export const SITE_URL = 'https://nustudio.ru';

export const PORTFOLIO_VIDEOS: PortfolioVideoSchema[] = [
  {
    id: 'showcase-commerce',
    name: 'AI-имиджевый ролик: презентация продуктов (MARKETING)',
    description:
      'Нейросетевой имиджевый ролик для маркетинговых задач: презентация продуктов с реализмом, липсинком, локациями и людьми.',
    thumbnailPath: '/schema/thumbnails/showcase-commerce.jpg',
    uploadDate: '2025-03-15',
    embedSrc: DEFAULT_KINESCope_EMBED,
  },
  {
    id: 'showcase-event',
    name: 'AI-ролик открытия конференции в НЦ «Россия» (EVENT)',
    description:
      'AI-контент для мероприятий: интро, заставки спикеров, афиши и маскот для конференции в НЦ «Россия».',
    thumbnailPath: '/schema/thumbnails/showcase-event.jpg',
    uploadDate: '2025-04-10',
    embedSrc: DEFAULT_KINESCope_EMBED,
  },
  {
    id: 'showcase-advertising',
    name: 'AI-рекламный ролик: презентация продуктов (PROMO)',
    description:
      'Нейросетевой рекламный ролик для промо-кампаний: презентация продуктов с реализмом, липсинком, локациями и людьми.',
    thumbnailPath: '/schema/thumbnails/showcase-advertising.jpg',
    uploadDate: '2025-05-01',
    embedSrc: DEFAULT_KINESCope_EMBED,
  },
  {
    id: 'showcase-marketing',
    name: 'AI-ролик для соцсетей: Reels и Stories для брендов',
    description:
      'Вертикальный AI-контент для соцсетей: Reels и Stories для брендов с трендовыми форматами, липсинком и эффектами.',
    thumbnailPath: '/schema/thumbnails/showcase-marketing.jpg',
    uploadDate: '2025-05-20',
    embedSrc: DEFAULT_KINESCope_EMBED,
  },
  {
    id: 'project-sber',
    name: 'AI-имиджевый ролик для Сбера: презентация продуктов',
    description:
      'Нейросетевой имиджевый ролик для Сбера: презентация продуктов и имиджевые видеоматериалы для бренда.',
    thumbnailPath: '/schema/thumbnails/project-sber.webp',
    uploadDate: '2025-06-12',
    embedSrc: DEFAULT_KINESCope_EMBED,
  },
  {
    id: 'project-russia',
    name: 'AI-ролик для мероприятий: конференция в НЦ «Россия»',
    description:
      'AI-видеоконтент для мероприятий и конференции в НЦ «Россия»: интро, заставки и визуальное сопровождение события.',
    thumbnailPath: '/schema/thumbnails/project-russia.webp',
    uploadDate: '2025-07-08',
    embedSrc: DEFAULT_KINESCope_EMBED,
  },
  {
    id: 'project-glorax',
    name: 'AI-видеопрезентация девелоперского проекта GLORAX',
    description:
      'Нейросетевой видеоролик для девелопера GLORAX: видеопрезентация девелоперского проекта с акцентом на архитектуру и атмосферу.',
    thumbnailPath: '/schema/thumbnails/project-glorax.webp',
    uploadDate: '2025-08-22',
    embedSrc: DEFAULT_KINESCope_EMBED,
  },
];

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function escapeXml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function buildSitemapXml(lastmod = '2026-09-13'): string {
  const videoTags = PORTFOLIO_VIDEOS.map(
    (video) => `    <video:video>
      <video:thumbnail_loc>${escapeXml(absoluteUrl(video.thumbnailPath))}</video:thumbnail_loc>
      <video:title>${escapeXml(video.name)}</video:title>
      <video:description>${escapeXml(video.description)}</video:description>
      <video:player_loc>${escapeXml(buildKinescopeEmbedSrc(video.embedSrc, false))}</video:player_loc>
      <video:publication_date>${video.uploadDate}</video:publication_date>
    </video:video>`,
  ).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>${escapeXml(absoluteUrl('/'))}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
${videoTags}
  </url>
</urlset>
`;
}

export function buildStructuredData(): Record<string, unknown> {
  const organizationId = `${SITE_URL}/#organization`;

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'NUstudio',
        url: SITE_URL,
        logo: absoluteUrl('/og-image.jpg'),
        description: ORGANIZATION_DESCRIPTION,
        sameAs: [...ORGANIZATION_SAME_AS],
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          email: CONTACT_EMAIL,
          url: CONTACT_TELEGRAM_URL,
          availableLanguage: ['ru', 'Russian'],
        },
      },
      ...PORTFOLIO_VIDEOS.map((video) => ({
        '@type': 'VideoObject',
        '@id': `${SITE_URL}/#${video.id}`,
        name: video.name,
        description: video.description,
        thumbnailUrl: absoluteUrl(video.thumbnailPath),
        uploadDate: video.uploadDate,
        embedUrl: buildKinescopeEmbedSrc(video.embedSrc, false),
        publisher: {
          '@id': organizationId,
        },
      })),
    ],
  };
}

export function buildStructuredDataJsonLd(): string {
  return JSON.stringify(buildStructuredData()).replace(/</g, '\\u003c');
}
