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
const testingPath = '/mountaindog/testing.html'
const navigationPages = [
  { path: '/', source: 'index.html', status: 200 },
  { path: '/index.html', source: 'index.html', status: 200 },
  { path: '/mountaindog/', source: 'mountaindog/index.html', status: 200 },
  { path: '/mountaindog/index.html', source: 'mountaindog/index.html', status: 200 },
  { path: testingPath, source: 'mountaindog/testing.html', status: 200 },
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
    html: attributes(root),
    body: attributes(body),
    title: title?.childNodes[0]?.value,
    alternates: alternates.map(attributes),
    scripts: [head, body].map(parent => parent.childNodes
      .filter(node => node.tagName === 'script' && node.attrs.some(attr => attr.name === 'src'))
      .map(attributes)),
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

test('recruitment styles, motion script, icon and screenshots retain their original bytes', async () => {
  const recruitmentAssets = ['testing.css', 'testing-qr.svg', 'assets/motion/motion.css', 'assets/motion/motion.js', 'icon.png',
    'screenshots/screen-1.jpg', 'screenshots/screen-2.jpg', 'screenshots/screen-3.jpg']
  for (const path of ['style.css', 'favicon.svg', ...recruitmentAssets.map(asset => `mountaindog/${asset}`)]) {
    const response = await fetch(`${origin}/${path}`)
    assert.equal(response.status, 200, path)
    assert.deepEqual(Buffer.from(await response.arrayBuffer()), await readFile(path), path)
  }
})

test('the game directory redirects to its canonical path', async () => {
  const url = `${origin}/mountaindog?ref=test`
  const response = await fetch(url, { redirect: 'manual' })
  assert.equal(response.status, 301)
  assert.equal(new URL(response.headers.get('location'), url).href, `${origin}/mountaindog/?ref=test`)
})

test('navigation pages keep the original documents and HTTP status', async () => {
  for (const { path, source, status } of navigationPages) {
    await assertOriginalDocument(path, source, status)
  }
})

test('the static homepage introduces Fayang and links to the product and testing guide', async () => {
  for (const path of ['/', '/index.html']) {
    const response = await fetch(`${origin}${path}`)
    assert.equal(response.status, 200)
    const document = parse(await response.text())
    const h1 = find(document, node => node.tagName === 'h1')
    assert.equal(h1.childNodes[0].value, 'Fayang')
    const main = find(document, node => node.tagName === 'main')
    const heading = find(main, node => node.tagName === 'h2')
    assert.equal(heading.childNodes[0].value, '產品與作品')
    const image = find(main, node => node.tagName === 'img')
    const asset = await fetch(new URL(image.attrs.find(attr => attr.name === 'src').value, response.url))
    assert.equal(asset.status, 200)
    assert.equal(asset.headers.get('content-type'), 'image/webp')
    for (const href of ['mountaindog/', 'mountaindog/testing.html']) {
      assert.ok(find(main, node => node.tagName === 'a' && node.attrs.some(attr =>
        attr.name === 'href' && attr.value === href)), href)
      assert.equal((await fetch(new URL(href, response.url))).status, 200)
    }
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
      const layout = () => page.locator('header, main, footer, .game, .not-found-box, article, .toc, main > section').evaluateAll(nodes =>
        nodes.map(node => node.getBoundingClientRect().toJSON()))
      const expectedLayout = await layout()

      assert.equal((await page.goto(`${origin}${path}`)).status(), status, path)
      assert.equal((await page.reload()).status(), status, path)
      assert.deepEqual(await layout(), expectedLayout, `${path} at ${width}px`)
      for (const image of await page.locator('main img:visible').all()) {
        await image.scrollIntoViewIfNeeded()
        await image.evaluate(node => node.decode())
        assert.ok(await image.evaluate(node => node.complete && node.naturalWidth > 0), path)
      }

      await page.evaluate(() => scrollTo(0, 0))
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
    await page.getByRole('link', { name: '查看產品介紹' }).click()
    assert.equal(page.url(), `${origin}/mountaindog/`)
    await page.close()
  }
})

test('the static product page leads to the guide, four policy documents and the homepage', async t => {
  const browser = await chromium.launch()
  t.after(() => browser.close())
  const page = await browser.newPage({
    viewport: { width: 360, height: 740 }, hasTouch: true, isMobile: true, javaScriptEnabled: false,
  })
  page.setDefaultTimeout(5000)
  await page.route('https://**/*', route => route.abort())

  await page.goto(origin)
  await page.getByRole('link', { name: '查看產品介紹' }).tap()
  await page.waitForURL(`${origin}/mountaindog/`)
  const joinLink = page.getByRole('main').getByRole('link', { name: '加入封閉測試', exact: true })
  const button = await joinLink.boundingBox()
  assert.ok(button && button.y >= 0 && button.y + button.height <= 740)
  await joinLink.tap()
  await page.waitForURL(`${origin}${testingPath}`)

  for (const path of ['/mountaindog/', '/mountaindog/index.html']) {
    assert.equal((await page.goto(`${origin}${path}`)).status(), 200)
    await page.getByRole('link', { name: '閱讀政策與條款' }).tap()
    const policies = page.getByRole('region', { name: /政策與條款/ })
    assert.equal(await policies.getAttribute('id'), 'policies')
    assert.equal(await page.locator(':target').getAttribute('id'), 'policies')
    for (const { path: policy } of legalPages) {
      const documentLink = policies.locator(`a[href="${policy.split('/').at(-1)}"]`)
      await documentLink.tap()
      await page.waitForURL(`${origin}/${policy}`)
      await page.goBack()
    }
    await page.getByRole('link', { name: '返回首頁' }).tap()
    await page.waitForURL(`${origin}/`)
  }
})

test('the testing QR and join button are visible on the first screen without JavaScript', async t => {
  const browser = await chromium.launch()
  t.after(() => browser.close())
  for (const [width, height] of [[360, 740], [390, 844], [768, 1024], [820, 1180], [1024, 768], [1440, 900]]) {
    const page = await browser.newPage({ viewport: { width, height }, javaScriptEnabled: false })
    await page.route('https://**/*', route => route.abort())
    await page.goto(`${origin}/mountaindog/`)
    await page.evaluate(() => document.fonts.ready)
    const qr = page.getByRole('img', { name: '封閉測試頁面的 QR code' })
    assert.equal(await qr.count(), 1)
    await qr.evaluate(node => node.decode())
    for (const element of [qr, page.getByRole('main').getByRole('link', { name: '加入封閉測試', exact: true })]) {
      const box = await element.boundingBox()
      assert.ok(box && box.x >= 0 && box.y >= 0 && box.x + box.width <= width && box.y + box.height <= height,
        `QR and join button must fit ${width}x${height}: ${JSON.stringify(box)}`)
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth))
    await page.close()
  }
})

test('desktop recruitment keeps keyboard, screenshot and motion behavior after navigation', async t => {
  const browser = await chromium.launch()
  t.after(() => browser.close())
  const page = await browser.newPage({ viewport: { width: 1440, height: 800 } })
  await page.route('https://**/*', route => route.abort())
  const pageErrors = []
  page.on('pageerror', error => pageErrors.push(error.message))
  await page.goto(`${origin}/mountaindog/`)
  const [motionResponse] = await Promise.all([
    page.waitForResponse(`${origin}/mountaindog/assets/motion/motion.js`),
    page.locator('main a[href="testing.html"]').first().click(),
  ])
  assert.equal(motionResponse.status(), 200)
  await page.locator('header a[href="./"]').click()
  await page.goBack()
  assert.equal(page.url(), `${origin}${testingPath}`)

  const help = page.locator('details.inline-help').first()
  await help.locator('summary').press('Enter')
  assert.notEqual(await help.getAttribute('open'), null)

  const screenshot = page.locator('details.game-preview a.m-zoom').first()
  const preview = page.locator('details.game-preview')
  assert.equal(await preview.getAttribute('open'), null)
  await preview.locator('summary').press('Enter')
  assert.notEqual(await preview.getAttribute('open'), null)
  const image = screenshot.locator('img')
  await screenshot.hover()
  await image.evaluate(node => Promise.all(node.getAnimations().map(animation => animation.finished)))
  assert.notEqual(await image.evaluate(node => getComputedStyle(node).transform), 'none')
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await image.evaluate(node => Promise.all(node.getAnimations().map(animation => animation.finished)))
  assert.equal(await image.evaluate(node => getComputedStyle(node).transform), 'none')
  const [popup] = await Promise.all([page.waitForEvent('popup'), screenshot.press('Enter')])
  assert.equal(popup.url(), `${origin}/mountaindog/screenshots/screen-1.jpg`)
  assert.deepEqual(pageErrors, [])
})

test('touch recruitment keeps the anchor, disclosures and screenshot link without JavaScript', async t => {
  const browser = await chromium.launch()
  t.after(() => browser.close())
  const page = await browser.newPage({ viewport: { width: 390, height: 800 }, hasTouch: true, isMobile: true, javaScriptEnabled: false })
  await page.route('https://**/*', route => route.abort())
  await page.goto(`${origin}${testingPath}`)
  await page.locator('header a[href="#steps"]').tap()
  assert.equal(await page.locator(':target').getAttribute('id'), 'steps')
  const help = page.locator('details.inline-help').first()
  await help.locator('summary').tap()
  assert.notEqual(await help.getAttribute('open'), null)

  const preview = page.locator('details.game-preview')
  assert.equal(await preview.getAttribute('open'), null)
  await preview.locator('summary').tap()
  assert.notEqual(await preview.getAttribute('open'), null)
  const screenshot = preview.locator('a.m-zoom').last()
  assert.equal(await screenshot.locator('img').evaluate(node => getComputedStyle(node).transform), 'none')
  const [popup] = await Promise.all([page.waitForEvent('popup'), screenshot.tap()])
  assert.equal(popup.url(), `${origin}/mountaindog/screenshots/screen-3.jpg`)
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
