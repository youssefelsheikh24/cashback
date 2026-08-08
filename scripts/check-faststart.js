import path from 'path'
import { fileURLToPath } from 'url'
import { execFile } from 'child_process'
import ffprobePath from 'ffprobe-static'
import { videos } from '../src/data/projects.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function runFFprobe(url) {
  return new Promise((resolve) => {
    const args = ['-v', 'trace', url]
    execFile(ffprobePath.path, args, { timeout: 20000 }, (error, stdout, stderr) => {
      const output = (stdout || '') + (stderr || '')
      const ftypPos = output.indexOf("type:'ftyp'")
      const moovPos = output.indexOf("type:'moov'")
      const mdatPos = output.indexOf("type:'mdat'")

      let isFastStart = false
      let moovDesc = 'Unknown'

      if (moovPos !== -1 && mdatPos !== -1) {
        if (moovPos < mdatPos) {
          isFastStart = true
          moovDesc = `Before mdat (moov: ${moovPos}, mdat: ${mdatPos})`
        } else {
          isFastStart = false
          moovDesc = `After mdat (mdat: ${mdatPos}, moov: ${moovPos})`
        }
      } else if (moovPos !== -1) {
        moovDesc = 'moov atom found'
        isFastStart = true
      }

      resolve({
        url,
        moovPos,
        mdatPos,
        isFastStart,
        moovDesc
      })
    })
  })
}

export async function checkFastStart() {
  console.log('==================================================')
  console.log('CHECKING MP4 FASTSTART (MOOV ATOM POSITION)')
  console.log('==================================================')

  const mp4s = videos.filter(v => v.src)
  console.log(`Testing ${mp4s.length} MP4 files...`)

  const results = []

  for (const v of mp4s) {
    const title = v.title || v.id.toString()
    const info = await runFFprobe(v.src)
    results.push({
      id: v.id,
      title,
      src: v.src,
      fastStart: info.isFastStart ? 'YES' : 'NO',
      moovDesc: info.moovDesc
    })
    console.log(`Video #${v.id} (${title}): FastStart = ${info.isFastStart ? 'YES' : 'NO'} (${info.moovDesc})`)
  }

  console.log('==================================================')
  return results
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  checkFastStart()
}
