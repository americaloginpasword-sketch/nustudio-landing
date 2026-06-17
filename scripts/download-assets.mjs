import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');

const assets = [
  ['src/assets/about/moon.png', 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/moon_icon.11395d36.png'],
  ['src/assets/about/object3d.png', 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/p59_1.4659672e.png'],
  ['src/assets/about/lego.png', 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/lego_icon-1.703bb594.png'],
  ['src/assets/about/group.png', 'https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/Group_134-1.2e04f3ce.png'],
  ['src/assets/marquee/01.gif', 'https://motionsites.ai/assets/hero-space-voyage-preview-eECLH3Yc.gif'],
  ['src/assets/marquee/02.gif', 'https://motionsites.ai/assets/hero-codenest-preview-Cgppc2qV.gif'],
  ['src/assets/marquee/03.gif', 'https://motionsites.ai/assets/hero-vex-ventures-preview-BczMFIiw.gif'],
  ['src/assets/marquee/04.gif', 'https://motionsites.ai/assets/hero-stellar-ai-v2-preview-DjvxjG3C.gif'],
  ['src/assets/marquee/05.gif', 'https://motionsites.ai/assets/hero-asme-preview-B_nGDnTP.gif'],
  ['src/assets/marquee/06.gif', 'https://motionsites.ai/assets/hero-transform-data-preview-Cx5OU29N.gif'],
  ['src/assets/marquee/07.gif', 'https://motionsites.ai/assets/hero-vitara-preview-Cjz2QYyU.gif'],
  ['src/assets/marquee/08.gif', 'https://motionsites.ai/assets/hero-terra-preview-BFjrCr7T.gif'],
  ['src/assets/marquee/09.gif', 'https://motionsites.ai/assets/hero-skyelite-preview-DHaZIgUv.gif'],
  ['src/assets/marquee/10.gif', 'https://motionsites.ai/assets/hero-aethera-preview-DknSlcTa.gif'],
  ['src/assets/marquee/11.gif', 'https://motionsites.ai/assets/hero-designpro-preview-D8c5_een.gif'],
  ['src/assets/marquee/12.gif', 'https://motionsites.ai/assets/hero-stellar-ai-preview-D3HL6bw1.gif'],
  ['src/assets/marquee/13.gif', 'https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif'],
  ['src/assets/marquee/14.gif', 'https://motionsites.ai/assets/hero-orbit-web3-preview-BXt4OttD.gif'],
  ['src/assets/marquee/15.gif', 'https://motionsites.ai/assets/hero-nexora-preview-cx5HmUgo.gif'],
  ['src/assets/marquee/16.gif', 'https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif'],
  ['src/assets/marquee/17.gif', 'https://motionsites.ai/assets/hero-planet-orbit-preview-DWAP8Z1P.gif'],
  ['src/assets/marquee/18.gif', 'https://motionsites.ai/assets/hero-new-era-preview-CocuDUm9.gif'],
  ['src/assets/marquee/19.gif', 'https://motionsites.ai/assets/hero-wealth-preview-B70idl_u.gif'],
  ['src/assets/marquee/20.gif', 'https://motionsites.ai/assets/hero-luminex-preview-CxOP7ce6.gif'],
  ['src/assets/marquee/21.gif', 'https://motionsites.ai/assets/hero-celestia-preview-0yO3jXO8.gif'],
  ['src/assets/projects/p1-col1-top.webp', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055344_5eff02e0-87a5-41ce-b64f-eb08da8f33db.png&w=1280&q=85'],
  ['src/assets/projects/p1-col1-bottom.webp', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055431_11d841fd-8b41-46a5-82e4-b04f2407a7d8.png&w=1280&q=85'],
  ['src/assets/projects/p1-col2.webp', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055451_e317bf2d-28d4-48cc-86b0-6f72f25b6327.png&w=1280&q=85'],
  ['src/assets/projects/p2-col1-top.webp', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055654_911201c5-36d9-4bc6-bac7-331adfce159f.png&w=1280&q=85'],
  ['src/assets/projects/p2-col1-bottom.webp', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055723_5ceda0b8-d9c2-4665-b2e3-83ba19ba76d1.png&w=1280&q=85'],
  ['src/assets/projects/p2-col2.webp', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055753_adc5dcbd-a8e6-49c0-b43a-9b030d835cea.png&w=1280&q=85'],
  ['src/assets/projects/p3-col1-top.webp', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055759_963cfb0b-4bd1-4b0f-9d0a-09bd6cf95b2f.png&w=1280&q=85'],
  ['src/assets/projects/p3-col1-bottom.webp', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_060108_438f781a-9846-4dcc-89ab-c4e6cb830f5b.png&w=1280&q=85'],
  ['src/assets/projects/p3-col2.webp', 'https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260412_055818_9d062121-ad7e-46b9-999a-1a6a692ef1ee.png&w=1280&q=85'],
  ['src/assets/videos/commerce.mp4', 'https://assets.mixkit.co/videos/preview/mixkit-rotating-shapes-in-a-dark-background-10691-large.mp4'],
  ['src/assets/videos/event.mp4', 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-futuristic-devices-99786-large.mp4'],
  ['src/assets/videos/advertising.mp4', 'https://assets.mixkit.co/videos/preview/mixkit-colorful-flickering-neon-lights-42405-large.mp4'],
  ['src/assets/videos/marketing.mp4', 'https://assets.mixkit.co/videos/preview/mixkit-woman-running-on-top-of-a-mountain-32830-vertical-preview.mp4'],
];

async function downloadOne([relativePath, url]) {
  const filePath = path.join(root, relativePath);
  await mkdir(path.dirname(filePath), { recursive: true });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 120000);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: { 'User-Agent': 'Mozilla/5.0' },
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const buffer = Buffer.from(await response.arrayBuffer());
    if (buffer.length < 1024) {
      throw new Error(`File too small (${buffer.length} bytes)`);
    }

    await writeFile(filePath, buffer);
    console.log(`OK  ${relativePath} (${(buffer.length / 1024).toFixed(1)} KB)`);
  } finally {
    clearTimeout(timeout);
  }
}

const results = await Promise.allSettled(assets.map((item) => downloadOne(item)));
const failed = results.filter((r) => r.status === 'rejected');

if (failed.length) {
  console.error(`\nFailed: ${failed.length}/${assets.length}`);
  failed.forEach((r) => console.error(r.reason));
  process.exit(1);
}

console.log(`\nDownloaded ${assets.length} assets.`);
