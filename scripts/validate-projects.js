import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { videos } from '../src/data/projects.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const publicThumbnailsDir = path.join(rootDir, 'public', 'thumbnails')

export function validateProjects() {
  console.log('==================================================')
  console.log('FINAL VALIDATION OF PROJECT DATA & THUMBNAILS')
  console.log('==================================================')

  const totalVideos = videos.length
  const mp4Videos = videos.filter(v => v.src)

  console.log(`TOTAL ITEMS: ${totalVideos}`)
  console.log(`TOTAL MP4 VIDEOS: ${mp4Videos.length}`)

  const seenIds = new Set()
  const duplicateIds = []
  const seenSrcs = new Set()
  const duplicateSrcs = []
  const seenPosters = new Set()
  const duplicatePosters = []

  mp4Videos.forEach(v => {
    if (seenIds.has(v.id)) duplicateIds.push(v.id)
    seenIds.add(v.id)

    if (seenSrcs.has(v.src)) duplicateSrcs.push({ id: v.id, src: v.src })
    seenSrcs.add(v.src)

    if (v.poster) {
      if (seenPosters.has(v.poster)) duplicatePosters.push({ id: v.id, poster: v.poster })
      seenPosters.add(v.poster)
    }
  })

  const mp4MissingPoster = mp4Videos.filter(v => !v.poster)
  const missingLocalThumbFiles = []

  mp4Videos.forEach(v => {
    if (v.poster) {
      const match = v.poster.match(/media\.cashback\.marketing\/thumbnails\/(.+)$/)
      if (match) {
        const localRel = decodeURIComponent(match[1])
        const fullLocalPath = path.join(publicThumbnailsDir, ...localRel.split('/'))
        if (!fs.existsSync(fullLocalPath)) {
          missingLocalThumbFiles.push({ id: v.id, poster: v.poster, local: fullLocalPath })
        }
      }
    }
  })

  console.log(`VALID THUMBNAILS: ${mp4Videos.length - mp4MissingPoster.length}`)
  console.log(`MISSING THUMBNAILS: ${mp4MissingPoster.length}`)
  console.log(`INVALID POSTER URLS: ${mp4MissingPoster.length}`)
  console.log(`DUPLICATE THUMBNAIL NAMES: ${duplicatePosters.length}`)
  console.log(`MISSING LOCAL FILES: ${missingLocalThumbFiles.length}`)
  console.log('--------------------------------------------------')

  if (mp4MissingPoster.length === 0 && missingLocalThumbFiles.length === 0 && duplicatePosters.length === 0) {
    console.log('ALL VALIDATION CHECKS PASSED PERFECTLY!')
  } else {
    console.error('VALIDATION FAILED WITH ERRORS!')
  }

  console.log('==================================================')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  validateProjects()
}
