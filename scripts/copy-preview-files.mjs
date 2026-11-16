import { cp, rm } from 'node:fs/promises'
import { join } from 'node:path'

const output = '.output/public'

// Keep the rest of the branch-published site reachable from the generated policies.
const previewFiles = [
  'index.html', '404.html', 'app-ads.txt', 'favicon.svg', 'style.css', 'toc.js',
  'mountaindog/index.html', 'mountaindog/terms.html', 'mountaindog/terms-en.html',
  'mountaindog/testing.html', 'mountaindog/testing.css', 'mountaindog/icon.png',
  'mountaindog/assets/motion', 'mountaindog/screenshots',
]

for (const path of previewFiles) {
  await cp(path, join(output, path), { recursive: true })
}

await rm(join(output, '200.html'), { force: true })
