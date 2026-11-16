import assert from 'node:assert/strict'
import { once } from 'node:events'
import { readFile } from 'node:fs/promises'
import { parse } from 'parse5'
import { chromium } from 'playwright'
import { test } from 'node:test'
import { createPreviewServer } from '../scripts/preview.mjs'

const legalPages = [
  { path: 'mountaindog/privacy.html', alternate: 'mountaindog/privacy-en.html', anchor: 'ads' },
  { path: 'mountaindog/privacy-en.html', alternate: 'mountaindog/privacy.html', anchor: 'ads' },
  { path: 'mountaindog/terms.html', alternate: 'mountaindog/terms-en.html', anchor: 'license', policy: 'mountaindog/privacy.html' },
  { path: 'mountaindog/terms-en.html', alternate: 'mountaindog/terms.html', anchor: 'license', policy: 'mountaindog/privacy-en.html' },
]
const termsPages = legalPages.filter(page => page.policy)
const navigationPages = [
  { path: '/', source: 'index.html', status: 200 },
  { path: '/index.html', source: 'index.html', status: 200 },
  { path: '/mountaindog/', source: 'mountaindog/index.html', status: 200 },
  { path: '/mountaindog/index.html', source: 'mountaindog/index.html', status: 200 },
  { path: '/404.html', source: '404.html', status: 200 },
  { path: '/mountaindog/missing/page.html', source: '404.html', status: 404 },
]
const server = createPreviewServer()

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
  const attributes = node => Object.fromEntries(node.attrs.map(({ name, value }) => [name, value]))

  return {
    lang: root.attrs.find(attr => attr.name === 'lang')?.value,
    body: attributes(body),
    title: title?.childNodes[0]?.value,
    alternates: alternates.map(attributes),
    sections: ['a', 'header', 'main', 'footer'].map(tag => {
      const section = find(body, node => node.tagName === tag)
      const { startTag, endTag } = section.sourceCodeLocation
      return [attributes(section), html.slice(startTag.endOffset, endTag.startOffset).trim()]
    }),
  }
}

async function assertOriginalDocument(path, source, status) {
  const original = await readFile(source, 'utf8')
  const response = await fetch(`${origin}${path}`)
  assert.equal(response.status, status, path)
  assert.match(response.headers.get('content-type'), /^text\/html\b/)
  assert.deepEqual(documentParts(await response.text()), documentParts(original), path)
}

for (const { path } of legalPages) {
  test(`${path} has the full original document in the static build`, () =>
    assertOriginalDocument(`/${path}`, path, 200))
}

test('app-ads.txt returns the original bytes as plain text', async () => {
  const response = await fetch(`${origin}/app-ads.txt`)
  assert.equal(response.status, 200)
  assert.match(response.headers.get('content-type'), /^text\/plain\b/)
  assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile('app-ads.txt'))
})

test('existing navigation destinations are reachable in the preview', async () => {
  const response = await fetch(`${origin}/mountaindog/testing.html`)
  assert.equal(response.status, 200)
  await response.body.cancel()
})

test('the game directory redirects to its canonical path', async () => {
  const url = `${origin}/mountaindog?ref=test`
  const response = await fetch(url, { redirect: 'manual' })
  assert.equal(response.status, 301)
  assert.equal(new URL(response.headers.get('location'), url).href, `${origin}/mountaindog/?ref=test`)
})

test('home, game and error pages keep the original documents and HTTP status', async () => {
  for (const { path, source, status } of navigationPages) {
    await assertOriginalDocument(path, source, status)
  }
})

test('navigation and terms pages keep their layout and skip links without JavaScript', async t => {
  const baseline = createPreviewServer('.')
  baseline.listen(0, '127.0.0.1')
  await once(baseline, 'listening')
  t.after(() => new Promise(resolve => baseline.close(resolve)))
  const baselineOrigin = `http://127.0.0.1:${baseline.address().port}`
  const browser = await chromium.launch()
  t.after(() => browser.close())

  for (const width of [390, 1440]) {
    const page = await browser.newPage({ viewport: { width, height: 800 }, javaScriptEnabled: false })
    await page.route('https://**/*', route => route.abort())
    const pages = [...navigationPages, ...termsPages.map(({ path }) => ({ path: `/${path}`, status: 200 }))]
    for (const { path, status } of pages) {
      await page.goto(`${baselineOrigin}${path}`)
      const layout = () => page.locator('header, main, footer, .game, .not-found-box, article, .toc').evaluateAll(nodes =>
        nodes.map(node => node.getBoundingClientRect().toJSON()))
      const expectedLayout = await layout()

      assert.equal((await page.goto(`${origin}${path}`)).status(), status, path)
      assert.equal((await page.reload()).status(), status, path)
      assert.deepEqual(await layout(), expectedLayout, `${path} at ${width}px`)
      for (const image of await page.locator('main img').all()) {
        assert.ok(await image.evaluate(node => node.complete && node.naturalWidth > 0), path)
      }

      await page.keyboard.press('Tab')
      assert.equal(await page.locator(':focus').getAttribute('href'), '#content')
      await page.keyboard.press('Enter')
      assert.equal(await page.locator(':target').getAttribute('id'), 'content')
    }

    for (const target of ['/', '/mountaindog/']) {
      await page.goto(`${origin}/mountaindog/missing/page.html`)
      await page.locator(`main a[href="${target}"]`).click()
      assert.equal(page.url(), `${origin}${target}`)
    }
    await page.goto(origin)
    await page.locator('main a.card-link').click()
    assert.equal(page.url(), `${origin}/mountaindog/`)
    await page.close()
  }
})

test('legal pages keep their deep links, language links and responsive table of contents', async t => {
  const browser = await chromium.launch()
  t.after(() => browser.close())

  for (const { width, desktop } of [{ width: 1440, desktop: true }, { width: 390, desktop: false }]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } })
    await page.route('https://**/*', route => route.abort())
    const toc = page.locator('details.toc')
    for (const { path, anchor, alternate } of legalPages) {
      const url = `${origin}/${path}#${anchor}`
      await page.goto('about:blank')
      assert.equal((await page.goto(url)).status(), 200)
      assert.equal((await page.reload()).status(), 200)
      assert.equal(await page.locator(':target').getAttribute('id'), anchor)
      assert.equal(await toc.getAttribute('open') !== null, desktop)
      await toc.locator('summary').click()
      assert.notEqual(await toc.getAttribute('open'), null)
      await toc.locator('a[href="#contact"]').click()
      assert.equal(await page.locator(':target').getAttribute('id'), 'contact')
      assert.equal(await toc.getAttribute('open') !== null, desktop)
      await Promise.all([page.waitForURL(`${origin}/${alternate}`), page.locator('a.btn-lang').click()])
    }
    await page.close()
  }
})

test('legal pages and their native table of contents work with JavaScript disabled', async t => {
  const browser = await chromium.launch()
  t.after(() => browser.close())
  const page = await browser.newPage({ javaScriptEnabled: false })
  await page.route('https://**/*', route => route.abort())

  for (const { path, anchor } of legalPages) {
    await page.goto(`${origin}/${path}`)
    assert.ok(await page.locator(`article #${anchor}`).isVisible())
    const toc = page.locator('details.toc')
    assert.equal(await toc.getAttribute('open'), null)
    await toc.locator('summary').press('Enter')
    assert.notEqual(await toc.getAttribute('open'), null)
    await toc.locator(`a[href="#${anchor}"]`).press('Enter')
    assert.equal(await page.locator(':target').getAttribute('id'), anchor)
  }
})

test('terms and privacy policies link to one another in the same language', async t => {
  const browser = await chromium.launch()
  t.after(() => browser.close())
  const page = await browser.newPage({ javaScriptEnabled: false })
  await page.route('https://**/*', route => route.abort())

  for (const { path, policy } of termsPages) {
    const terms = `${origin}/${path}`
    await page.goto(terms)
    await page.locator('article .meta a').click()
    assert.equal(page.url(), `${origin}/${policy}`)
    await page.locator('article .meta a').click()
    assert.equal(page.url(), terms)
  }
})
