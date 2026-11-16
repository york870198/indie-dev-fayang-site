<script setup>
import { parse } from 'parse5'

const { source } = defineProps({
  source: { type: String, required: true },
})

// The branch-published HTML remains the content source during the migration.
// This layout supports a text skip link, header, main and footer, with scripts in the head.
const document = parse(source, { sourceCodeLocationInfo: true })
const element = (parent, tag) => parent.childNodes.find(node => node.tagName === tag)
const attributes = node => Object.fromEntries(node.attrs.map(({ name, value }) => [name, value]))
const contents = node => {
  const { startTag, endTag } = node.sourceCodeLocation
  return source.slice(startTag.endOffset, endTag.startOffset)
}

const html = element(document, 'html')
const head = element(html, 'head')
const body = element(html, 'body')
const skip = element(body, 'a')
const header = element(body, 'header')
const main = element(body, 'main')
const footer = element(body, 'footer')

useHead({
  htmlAttrs: attributes(html),
  bodyAttrs: attributes(body),
  title: element(head, 'title').childNodes[0].value,
  meta: head.childNodes.filter(node => node.tagName === 'meta').map(attributes),
  link: head.childNodes.filter(node => node.tagName === 'link').map(attributes),
  script: head.childNodes.filter(node => node.tagName === 'script').map(attributes),
})
</script>

<template>
  <a v-bind="attributes(skip)">{{ skip.childNodes[0].value }}</a>
  <header v-bind="attributes(header)" v-html="contents(header)" />
  <main v-bind="attributes(main)" v-html="contents(main)" />
  <footer v-bind="attributes(footer)" v-html="contents(footer)" />
</template>
