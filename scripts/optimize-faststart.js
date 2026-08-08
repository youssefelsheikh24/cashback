import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { execFile } from 'child_process'
import ffmpegPath from 'ffmpeg-static'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export function remuxFastStart(inputUrlOrPath, outputPath) {
  return new Promise((resolve, reject) => {
    const args = [
      '-i', inputUrlOrPath,
      '-c', 'copy',
      '-movflags', '+faststart',
      outputPath,
      '-y'
    ]
    execFile(ffmpegPath, args, { timeout: 120000 }, (error, stdout, stderr) => {
      if (error) {
        reject(error)
      } else {
        resolve({ stdout, stderr })
      }
    })
  })
}
