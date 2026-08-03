import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const DATA_PATH = path.resolve('src/data/socialMedia.json')
const SOCIAL_DIR = path.resolve('public/social')
const YOUTUBE_CHANNEL_ID = 'UC46iVi1yd_PHup2MqLJSmoA'
const YOUTUBE_LIMIT = 4
const INSTAGRAM_LIMIT = 6

const monthNames = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez']

function formatShortDate(value) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return ''
  }

  return `${String(date.getDate()).padStart(2, '0')} ${monthNames[date.getMonth()]}`
}

function decodeHtml(value = '') {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([a-fA-F0-9]+);/g, (_, code) => String.fromCharCode(Number.parseInt(code, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
}

function getTag(entry, tagName) {
  const match = entry.match(new RegExp(`<${tagName}[^>]*>([\\s\\S]*?)<\\/${tagName}>`))
  return match ? decodeHtml(match[1].trim()) : ''
}

function getAttribute(entry, tagName, attribute) {
  const match = entry.match(new RegExp(`<${tagName}[^>]*\\s${attribute}="([^"]+)"[^>]*>`))
  return match ? decodeHtml(match[1]) : ''
}

async function fetchJson(url) {
  const response = await fetch(url)

  if (!response.ok) {
    throw new Error(`Request failed ${response.status}: ${url}`)
  }

  return response.json()
}

async function fetchYoutubeMessages() {
  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${YOUTUBE_CHANNEL_ID}`
  const response = await fetch(feedUrl)

  if (!response.ok) {
    throw new Error(`Nao foi possivel buscar o feed do YouTube (${response.status}).`)
  }

  const xml = await response.text()
  const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map((match) => match[1])

  return entries.slice(0, YOUTUBE_LIMIT).map((entry) => {
    const videoId = getTag(entry, 'yt:videoId')
    const url = getAttribute(entry, 'link', 'href') || `https://www.youtube.com/watch?v=${videoId}`
    const image = getAttribute(entry, 'media:thumbnail', 'url') || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

    return {
      image,
      url,
      date: formatShortDate(getTag(entry, 'published')),
      title: getTag(entry, 'title'),
    }
  })
}

function getInstagramTitle(caption) {
  const firstLine = caption?.split('\n').map((line) => line.trim()).find(Boolean)

  if (!firstLine) {
    return 'Novo conteúdo no Instagram'
  }

  return firstLine.length > 82 ? `${firstLine.slice(0, 79).trim()}...` : firstLine
}

function getInstagramType(media) {
  if (media.media_product_type === 'REELS' || media.media_type === 'VIDEO' || media.permalink?.includes('/reel/')) {
    return 'Reel'
  }

  return 'Post'
}

async function findExistingInstagramImage(mediaId) {
  if (!existsSync(SOCIAL_DIR)) {
    return ''
  }

  const files = await readdir(SOCIAL_DIR)
  const image = files.find((file) => file.startsWith(`instagram-${mediaId}.`))

  return image ? `/social/${image}` : ''
}

async function downloadInstagramImage(media) {
  const existingImage = await findExistingInstagramImage(media.id)

  if (existingImage) {
    return existingImage
  }

  const imageUrl = media.thumbnail_url || media.media_url

  if (!imageUrl) {
    return '/social/instagram-post-1.jpg'
  }

  const response = await fetch(imageUrl)

  if (!response.ok) {
    throw new Error(`Nao foi possivel baixar imagem do Instagram (${response.status}).`)
  }

  const contentType = response.headers.get('content-type') ?? ''
  const extension = contentType.includes('png') ? 'png' : 'jpg'
  const fileName = `instagram-${media.id}.${extension}`
  const filePath = path.join(SOCIAL_DIR, fileName)
  const bytes = Buffer.from(await response.arrayBuffer())

  await mkdir(SOCIAL_DIR, { recursive: true })
  await writeFile(filePath, bytes)

  return `/social/${fileName}`
}

async function fetchInstagramPosts(currentPosts) {
  const accessToken = process.env.IG_GRAPH_ACCESS_TOKEN
  const instagramUserId = process.env.IG_USER_ID

  if (!accessToken || !instagramUserId) {
    console.log('Instagram ignorado: configure IG_USER_ID e IG_GRAPH_ACCESS_TOKEN para atualizar automaticamente.')
    return currentPosts
  }

  const fields = [
    'id',
    'caption',
    'media_type',
    'media_product_type',
    'media_url',
    'thumbnail_url',
    'permalink',
    'timestamp',
  ].join(',')
  const url = new URL(`https://graph.facebook.com/v25.0/${instagramUserId}/media`)
  url.searchParams.set('fields', fields)
  url.searchParams.set('limit', String(INSTAGRAM_LIMIT))
  url.searchParams.set('access_token', accessToken)

  const payload = await fetchJson(url)
  const mediaItems = Array.isArray(payload.data) ? payload.data : []

  return Promise.all(
    mediaItems.slice(0, INSTAGRAM_LIMIT).map(async (media) => ({
      image: await downloadInstagramImage(media),
      url: media.permalink,
      date: formatShortDate(media.timestamp),
      type: getInstagramType(media),
      title: getInstagramTitle(media.caption),
    })),
  )
}

async function main() {
  const currentData = JSON.parse(await readFile(DATA_PATH, 'utf8'))
  const nextData = {
    youtubeMessages: await fetchYoutubeMessages(),
    instagramPosts: await fetchInstagramPosts(currentData.instagramPosts ?? []),
  }
  const currentJson = `${JSON.stringify(currentData, null, 2)}\n`
  const nextJson = `${JSON.stringify(nextData, null, 2)}\n`

  if (currentJson === nextJson) {
    console.log('Nenhuma novidade encontrada.')
    return
  }

  await writeFile(DATA_PATH, nextJson)
  console.log('Midias sociais atualizadas em src/data/socialMedia.json.')
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})
