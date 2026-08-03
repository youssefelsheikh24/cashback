import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import express from 'express'
import cors from 'cors'
import 'dotenv/config'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const submissionsFile = path.join(__dirname, 'data', 'submissions.jsonl')

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

// ── Public API ───────────────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ ok: true, name: 'CashBack Server' }))

app.post('/api/inquiry', (req, res) => {
  const { name, email, brief } = req.body || {}

  if (!name || !email || !brief) {
    return res.status(400).json({ ok: false, error: 'Missing required fields' })
  }

  const submission = {
    type: 'inquiry',
    name,
    email,
    brief,
    receivedAt: new Date().toISOString(),
  }

  try {
    const dir = path.dirname(submissionsFile)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    fs.appendFileSync(submissionsFile, JSON.stringify(submission) + '\n', 'utf8')
    return res.json({ ok: true })
  } catch (err) {
    console.error('Error saving inquiry:', err)
    return res.status(500).json({ ok: false, error: 'Failed to record inquiry' })
  }
})

app.listen(PORT, () => {
  console.log(`✅ CashBack server listening on http://localhost:${PORT}`)
})

