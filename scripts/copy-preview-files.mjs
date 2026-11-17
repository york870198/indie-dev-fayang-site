import { cp } from 'node:fs/promises'
import { join } from 'node:path'

const output = '.output/public'

// Keep the pages and assets that Nuxt does not generate at their original URLs.
const previewFiles = [
  'app-ads.txt', 'assets/brand', 'favicon.svg', 'style.css', 'toc.js',
  'mountaindog/testing.css', 'mountaindog/icon.png',
  'mountaindog/assets/motion', 'mountaindog/screenshots',
]

for (const path of previewFiles) {
  await cp(path, join(output, path), { recursive: true })
}
