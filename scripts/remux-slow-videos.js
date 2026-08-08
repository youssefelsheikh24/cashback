import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { remuxFastStart } from './optimize-faststart.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const optimizedDir = path.join(rootDir, 'public', 'optimized-videos')

const slowVideos = [
  { id: 110, title: 'I Investment 2', src: 'https://media.cashback.marketing/videos/real-estate/i%20nvestment%202.mp4', filename: 'i-investment-2.mp4' },
  { id: 111, title: 'I Investment 3', src: 'https://media.cashback.marketing/videos/real-estate/i%20investment%203.mp4', filename: 'i-investment-3.mp4' },
  { id: 112, title: 'Capital Care', src: 'https://media.cashback.marketing/videos/real-estate/capital%20care.mp4', filename: 'capital-care.mp4' },
]

export async function processSlowVideos() {
  console.log('==================================================')
  console.log('REMUXING NON-FASTSTART VIDEOS (+faststart)')
  console.log('==================================================')

  if (!fs.existsSync(optimizedDir)) {
    fs.mkdirSync(optimizedDir, { recursive: true })
  }

  for (const item of slowVideos) {
    const outputPath = path.join(optimizedDir, item.filename)
    console.log(`Processing Video #${item.id} (${item.title})...`)
    try {
      await remuxFastStart(item.src, outputPath)
      const size = fs.statSync(outputPath).size
      console.log(`  -> SUCCESS: Created FastStart optimized video: ${outputPath} (${size} bytes)`)
    } catch (e) {
      console.error(`  -> ERROR remuxing #${item.id}:`, e.message)
    }
  }

  console.log('==================================================')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  processSlowVideos()
}
