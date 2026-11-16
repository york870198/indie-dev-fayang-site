<script setup>
import { parse } from 'parse5'

const { source } = defineProps({
  source: { type: String, required: true },
})

// The branch-published HTML remains the source for legal copy during the migration.
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
  <header v-html="contents(element(body, 'header'))" />
  <main v-html="contents(element(body, 'main'))" />
  <footer v-html="contents(element(body, 'footer'))" />
</template>
