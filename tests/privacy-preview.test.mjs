import assert from 'node:assert/strict'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname } from 'node:path'
import { parse } from 'parse5'
import { chromium } from 'playwright'
import { test } from 'node:test'

const policyPaths = ['mountaindog/privacy.html', 'mountaindog/privacy-en.html']
const contentTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain',
}

const server = createServer(async (request, response) => {
  const { pathname } = new URL(request.url, 'http://localhost')
  const path = pathname.endsWith('/') ? `${pathname}index.html` : pathname
  try {
    const file = await readFile(`.output/public${path}`)
    const type = contentTypes[extname(path)] ?? 'application/octet-stream'
    response.writeHead(200, { 'Content-Type': `${type}; charset=utf-8` }).end(file)
  } catch (error) {
    response.writeHead(error.code === 'ENOENT' ? 404 : 500).end()
  }
})

let origin
test.before(async () => {
  server.listen(0, '127.0.0.1')
  await once(server, 'listening')
  origin = `http://127.0.0.1:${server.address().port}`
})
test.after(() => new Promise(resolve => server.close(resolve)))

function find(node, matches) {
  if (matches(node)) return node
  for (const child of node.childNodes ?? []) {
    const result = find(child, matches)
    if (result) return result
  }
}

function documentParts(html) {
  const document = parse(html, { sourceCodeLocationInfo: true })
  const root = find(document, node => node.tagName === 'html')
  const head = find(root, node => node.tagName === 'head')
  const body = find(root, node => node.tagName === 'body')
  const title = find(head, node => node.tagName === 'title')
  const alternates = head.childNodes.filter(node =>
    node.tagName === 'link' && node.attrs.some(attr => attr.name === 'rel' && attr.value === 'alternate'))

  return {
    lang: root.attrs.find(attr => attr.name === 'lang')?.value,
    title: title?.childNodes[0]?.value,
    alternates: alternates.map(node => Object.fromEntries(node.attrs.map(({ name, value }) => [name, value]))),
    sections: ['header', 'main', 'footer'].map(tag => {
      const { startTag, endTag } = find(body, node => node.tagName === tag).sourceCodeLocation
      return html.slice(startTag.endOffset, endTag.startOffset).trim()
    }),
  }
}

for (const path of policyPaths) {
  test(`${path} has the full original document in the static build`, async () => {
    const original = await readFile(path, 'utf8')
    const response = await fetch(`${origin}/${path}`)
    assert.equal(response.status, 200)
    assert.match(response.headers.get('content-type'), /^text\/html\b/)
    assert.deepEqual(documentParts(await response.text()), documentParts(original))
  })
}

test('app-ads.txt returns the original bytes as plain text', async () => {
  const response = await fetch(`${origin}/app-ads.txt`)
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /^text\/plain\b/)
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile('app-ads.txt'))
})

test('existing navigation destinations are reachable in the preview', async () => {
  for (const path of ['/', '/mountaindog/', '/mountaindog/terms.html',
    '/mountaindog/terms-en.html', '/mountaindog/testing.html']) {
    const response = await fetch(`${origin}${path}`)
    assert.equal(response.status, 200, path)
    await response.body.cancel()
  }
})

test('policies keep their deep links, language links and responsive table of contents', async t => {
  const browser = await chromium.launch()
  t.after(() => browser.close())

  for (const { width, desktop } of [{ width: 1440, desktop: true }, { width: 390, desktop: false }]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } })
    await page.route('https://**/*', route => route.abort())
    const toc = page.locator('details.toc')
    for (const [index, path] of policyPaths.entries()) {
      const url = `${origin}/${path}#ads`
      await page.goto('about:blank')
      assert.equal((await page.goto(url)).status(), 200)
      assert.equal((await page.reload()).status(), 200)
      assert.equal(await page.locator(':target').getAttribute('id'), 'ads')
      assert.equal(await toc.getAttribute('open') !== null, desktop)
      if (!desktop) await toc.locator('summary').click()
      await toc.locator('a[href="#contact"]').click()
      assert.equal(await page.locator(':target').getAttribute('id'), 'contact')
      assert.equal(await toc.getAttribute('open') !== null, desktop)
      const alternate = `${origin}/${policyPaths[1 - index]}`
      await Promise.all([page.waitForURL(alternate), page.locator('a.btn-lang').click()])
    }
    await page.close()
  }
})

test('policies and their native table of contents work with JavaScript disabled', async t => {
  const browser = await chromium.launch()
  t.after(() => browser.close())
  const page = await browser.newPage({ javaScriptEnabled: false })
  await page.route('https://**/*', route => route.abort())

  for (const path of policyPaths) {
    await page.goto(`${origin}/${path}`)
    assert.ok(await page.locator('article #ads').isVisible())
    const toc = page.locator('details.toc')
    assert.equal(await toc.getAttribute('open'), null)
    await toc.locator('summary').press('Enter')
    assert.notEqual(await toc.getAttribute('open'), null)
    await toc.locator('a[href="#ads"]').click()
    assert.equal(await page.locator(':target').getAttribute('id'), 'ads')
  }
})
