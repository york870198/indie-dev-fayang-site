import { readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import { extname, join } from 'node:path'

const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
}

export function createPreviewServer(directory = '.output/public') {
  return createServer(async (request, response) => {
    const url = request.url.startsWith('/') && URL.parse(`http://localhost${request.url}`)
    if (!url) {
      response.writeHead(400).end()
      return
    }

    const path = url.pathname.replace(/\/{2,}/g, '/')
    const target = join(directory, path)

    try {
      const entry = await stat(target)
      if (entry.isDirectory() && !path.endsWith('/')) {
        response.writeHead(301, { Location: `${path}/${url.search}` }).end()
        return
      }

      const file = entry.isDirectory() ? join(target, 'index.html') : target
      const body = await readFile(file)
      const type = contentTypes[extname(file)] ?? 'application/octet-stream'
      response.writeHead(200, { 'Content-Type': type }).end(body)
    } catch (error) {
      if (error.code !== 'ENOENT' && error.code !== 'ENOTDIR') {
        response.writeHead(500).end()
        return
      }

      const body = await readFile(join(directory, '404.html')).catch(() => 'Not found')
      response.writeHead(404, { 'Content-Type': contentTypes['.html'] }).end(body)
    }
  })
}

if (import.meta.main) {
  createPreviewServer().listen(8000, '127.0.0.1', () => {
    console.log('Static preview: http://127.0.0.1:8000')
  })
}
