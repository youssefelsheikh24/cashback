import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execFile } from 'child_process'
import ffmpegPath from 'ffmpeg-static'
import { getInventory } from './inventory-thumbnails.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const publicThumbnailsDir = path.join(rootDir, 'public', 'thumbnails')

function runFFmpeg(args) {
  return new Promise((resolve, reject) => {
    execFile(ffmpegPath, args, { timeout: 30000 }, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}

export async function generateThumbnails() {
  console.log('==================================================')
  console.log('GENERATING WEBP THUMBNAILS WITH CLEAN NAMING')
  console.log('==================================================')

  if (!fs.existsSync(publicThumbnailsDir)) {
    fs.mkdirSync(publicThumbnailsDir, { recursive: true })
  }

  const inventory = getInventory()
  console.log(`Processing ${inventory.length} MP4 videos...`)

  let successCount = 0
  let failCount = 0

  for (const item of inventory) {
    const targetCategoryDir = path.join(publicThumbnailsDir, item.categoryFolder)
    if (!fs.existsSync(targetCategoryDir)) {
      fs.mkdirSync(targetCategoryDir, { recursive: true })
    }

    const localOutputPath = path.join(targetCategoryDir, item.thumbFilename)

    console.log(`[${item.categoryFolder}] ${item.mp4Basename} -> ${item.thumbFilename}...`)

    let generated = false

    // Try extracting frame at 1.0s first, fallback to 0.3s
    for (const seekTime of ['00:00:01.000', '00:00:00.300']) {
      try {
        const args = [
          '-ss', seekTime,
          '-i', item.src,
          '-vframes', '1',
          '-q:v', '2',
          '-vf', 'scale=800:-1',
          localOutputPath,
          '-y'
        ]
        await runFFmpeg(args)

        if (fs.existsSync(localOutputPath) && fs.statSync(localOutputPath).size > 0) {
          generated = true
          console.log(`  -> SUCCESS: Created ${localOutputPath} (${fs.statSync(localOutputPath).size} bytes)`)
          break
        }
      } catch (err) {
        // Retry next seekTime
      }
    }

    if (generated) {
      successCount++
    } else {
      failCount++
      console.error(`  -> FAILED: Could not extract frame for ${item.mp4Basename}`)
    }
  }

  console.log('--------------------------------------------------')
  console.log(`Summary: ${successCount} generated, ${failCount} failed.`)
  console.log('==================================================')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  generateThumbnails()
}
