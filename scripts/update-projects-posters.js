import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { getInventory } from './inventory-thumbnails.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const projectsJsPath = path.join(rootDir, 'src', 'data', 'projects.js')

export function updateProjectsPosters() {
  console.log('==================================================')
  console.log('UPDATING PROJECTS.JS WITH CLEAN R2 POSTER URLS')
  console.log('==================================================')

  const inventory = getInventory()
  const posterMap = new Map() // id -> r2Url
  inventory.forEach(item => {
    posterMap.set(item.id, item.r2Url)
  })

  let content = fs.readFileSync(projectsJsPath, 'utf8')
  const lines = content.split('\n')

  const newLines = lines.map(line => {
    const idMatch = line.match(/id:\s*(\d+)/)
    if (idMatch && line.includes('src:')) {
      const id = parseInt(idMatch[1], 10)
      if (posterMap.has(id)) {
        const r2Url = posterMap.get(id)
        // Strip existing poster property if present, then add new clean poster property
        let cleanedLine = line.replace(/poster:\s*'[^']+',?\s*/, '')
        return cleanedLine.replace(/id:\s*(\d+),/, `id: $1, poster: '${r2Url}',`)
      }
    }
    return line
  })

  fs.writeFileSync(projectsJsPath, newLines.join('\n'), 'utf8')
  console.log('Successfully updated src/data/projects.js with clean R2 poster URLs!')
  console.log('==================================================')
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  updateProjectsPosters()
}
