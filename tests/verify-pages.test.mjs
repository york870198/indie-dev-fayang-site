import assert from 'node:assert/strict'
import { execFile } from 'node:child_process'
import { once } from 'node:events'
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { test } from 'node:test'
import { promisify } from 'node:util'
import { createPreviewServer } from '../scripts/preview.mjs'

const exec = promisify(execFile)

test('release verification rejects missing product assets', async t => {
  const directory = await mkdtemp(join(tmpdir(), 'fayang-release-test-'))
  t.after(() => rm(directory, { recursive: true, force: true }))
  const expected = join(directory, 'expected')
  const published = join(directory, 'published')
  await cp('.output/public', expected, { recursive: true })
  await writeFile(join(expected, 'assets/brand/future.css'), 'body { color: black }')
  await cp(expected, published, { recursive: true })
  const server = createPreviewServer(published)
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  t.after(() => new Promise(resolve => server.close(resolve)))
  const origin = `http://127.0.0.1:${server.address().port}`
  const verify = () => exec('python', ['-B', 'scripts/verify-pages.py', expected, '--origin', origin])

  await verify()
  for (const path of [
    'mountaindog/product.css', 'assets/brand/fayang.css', 'assets/brand/future.css',
    'assets/brand/outfit-latin.woff2', 'mountaindog/testing-qr.svg',
    'mountaindog/screenshots/scene-420.webp', 'mountaindog/screenshots/v2/house-960.webp',
  ]) {
    await t.test(path, async () => {
      const file = join(published, path)
      const original = await readFile(file)
      try {
        await rm(file)
        await assert.rejects(verify(), error => error.code === 1 && error.stderr.includes(path))
        await writeFile(file, 'corrupt asset')
        await assert.rejects(verify(), error => error.code === 1 && error.stderr.includes('content differs'))
      } finally {
        await writeFile(file, original)
      }
    })
  }
})
