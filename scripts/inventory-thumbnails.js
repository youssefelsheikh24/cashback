import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { videos } from '../src/data/projects.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function deriveSlug(srcUrl) {
  const urlObj = new URL(srcUrl)
  const pathname = decodeURIComponent(urlObj.pathname)
  const basename = path.basename(pathname)
  let nameWithoutExt = basename.replace(/\.mp4$/i, '')

  if (nameWithoutExt.includes('كرينكل')) {
    nameWithoutExt = nameWithoutExt.replace(/كرينكل/g, 'crinkle')
  }

  const slug = nameWithoutExt
    .toLowerCase()
    .replace(/[\s_]+/g, '-') // spaces and underscores to hyphens
    .replace(/[^a-z0-9-]/g, '') // remove special chars
    .replace(/-+/g, '-') // normalize repeated hyphens
    .replace(/^-+|-+$/g, '') // trim hyphens

  return slug || 'video'
}

export function deriveCategoryFolder(srcUrl, categoryName) {
  const urlObj = new URL(srcUrl)
  const parts = urlObj.pathname.split('/').filter(Boolean)
  // URL structure: /videos/<category>/<filename>
  if (parts.length >= 2 && parts[0] === 'videos') {
    const rawCat = parts[1]
    if (rawCat === 'jelwery') return 'jewelry'
    if (rawCat === 'automative') return 'automotive'
    return rawCat.toLowerCase()
  }

  // Fallback from category string
  const cleanCat = (categoryName || '').replace(/[^a-zA-Z0-9 ]/g, '').trim().toLowerCase().replace(/\s+/g, '-')
  return cleanCat || 'general'
}

export function getInventory() {
  const mp4s = videos.filter(v => v.src)
  const inventory = []
  const collisionMap = new Map() // category/slug -> count

  mp4s.forEach(v => {
    const categoryFolder = deriveCategoryFolder(v.src, v.category)
    let thumbFilename
    let r2Url
    if (v.poster) {
      r2Url = v.poster
      const urlObj = new URL(v.poster)
      thumbFilename = path.basename(decodeURIComponent(urlObj.pathname))
    } else {
      let slug = deriveSlug(v.src)
      const key = `${categoryFolder}/${slug}`

      if (collisionMap.has(key)) {
        const count = collisionMap.get(key) + 1
        collisionMap.set(key, count)
        slug = `${slug}-${count}`
      } else {
        collisionMap.set(key, 1)
      }
      thumbFilename = `${slug}.webp`
      r2Url = `https://media.cashback.marketing/thumbnails/${categoryFolder}/${thumbFilename}`
    }
    const relUrl = `/thumbnails/${categoryFolder}/${thumbFilename}`
    const mp4Basename = path.basename(new URL(v.src).pathname)

    inventory.push({
      id: v.id,
      category: v.category || categoryFolder,
      categoryFolder,
      mp4Basename,
      src: v.src,
      thumbFilename,
      r2Url,
      relUrl
    })
  })

  return inventory
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const items = getInventory()
  console.log('==================================================')
  console.log('COMPLETE MP4 & THUMBNAIL INVENTORY')
  console.log('==================================================')
  items.forEach((item, i) => {
    console.log(`${String(i + 1).padStart(2, ' ')}. [${item.categoryFolder}] ${item.mp4Basename} -> ${item.thumbFilename}`)
  })
  console.log('==================================================')
  console.log(`Total MP4 items: ${items.length}`)
}
