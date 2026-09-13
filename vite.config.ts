import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { buildStructuredDataJsonLd, buildSitemapXml } from './src/content/structuredData'

function injectJsonLdPlugin(): Plugin {
  return {
    name: 'inject-jsonld',
    transformIndexHtml(html) {
      const jsonLd = buildStructuredDataJsonLd()
      const script = `<script type="application/ld+json">${jsonLd}</script>`
      return html.replace('</head>', `    ${script}\n  </head>`)
    },
  }
}

function generateSitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    buildStart() {
      writeFileSync('public/sitemap.xml', buildSitemapXml())
    },
    writeBundle(options) {
      const outDir = options.dir ?? 'dist'
      writeFileSync(join(outDir, 'sitemap.xml'), buildSitemapXml())
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), injectJsonLdPlugin(), generateSitemapPlugin()],
  server: {
    host: true,
    port: 3000,
    strictPort: true,
  },
  preview: {
    host: true,
    port: 4173,
    strictPort: true,
  },
})
