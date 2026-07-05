import express from 'express'
import cors from 'cors'
import nodemailer from 'nodemailer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import 'dotenv/config'

const app = express()
app.use(cors())
app.use(express.json())

const PORT = process.env.PORT || 3001

// Simple token that protects the admin submissions page (/admin?token=...).
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'cashback2026'

// Where booking notifications are delivered.
const TO_EMAIL = process.env.TO_EMAIL || 'cashbackagency1@gmail.com'

// ── Storage ────────────────────────────────────────────────────────────────
// Every submission is also appended (one JSON object per line) to this file, so
// leads are never lost even if the email fails to send.
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DATA_DIR = path.join(__dirname, 'data')
const DATA_FILE = path.join(DATA_DIR, 'submissions.jsonl')
fs.mkdirSync(DATA_DIR, { recursive: true })

function saveSubmission(entry) {
  const record = { ...entry, receivedAt: new Date().toISOString() }
  fs.appendFileSync(DATA_FILE, JSON.stringify(record) + '\n', 'utf8')
  return record
}

function readSubmissions() {
  if (!fs.existsSync(DATA_FILE)) return []
  return fs
    .readFileSync(DATA_FILE, 'utf8')
    .split('\n')
    .filter(Boolean)
    .map(line => { try { return JSON.parse(line) } catch { return null } })
    .filter(Boolean)
    .reverse() // newest first
}

const esc = v =>
  String(v ?? '').replace(/[<>&"]/g, c => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;' }[c]))

// ── Email (Gmail) ────────────────────────────────────────────────────────────
// GMAIL_USER = the sending Gmail address. GMAIL_APP_PASSWORD = a 16-char App
// Password (https://myaccount.google.com/apppasswords) — NOT your normal password.
const emailEnabled = !!(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD)
const transporter = emailEnabled
  ? nodemailer.createTransport({
      service: 'gmail',
      auth: { user: process.env.GMAIL_USER, pass: process.env.GMAIL_APP_PASSWORD },
    })
  : null

// Sends a formatted email for a submission. Returns true on success, false on failure.
async function emailSubmission(entry) {
  if (!transporter) return false

  const rows =
    entry.type === 'booking'
      ? [
          ['Name', entry.name],
          ['Company', entry.company],
          ['Phone', entry.phone],
          ['Email', entry.email || '—'],
          ['Date', entry.date],
          ['Time', entry.time],
        ]
      : [['Name', entry.name], ['Email', entry.email], ['Brief', entry.brief]]

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto">
      <h2 style="color:#d4af37;margin:0 0 4px">${entry.type === 'booking' ? 'New Consultation Booking' : 'New Studio Inquiry'}</h2>
      <p style="color:#666;margin:0 0 16px">CashBack — contact form submission</p>
      <table style="width:100%;border-collapse:collapse">
        ${rows.map(([k, v]) => `
          <tr>
            <td style="padding:8px 12px;border:1px solid #eee;background:#fafafa;font-weight:bold;width:140px">${esc(k)}</td>
            <td style="padding:8px 12px;border:1px solid #eee">${esc(v)}</td>
          </tr>`).join('')}
      </table>
      <p style="color:#999;font-size:12px;margin-top:16px">Submitted ${new Date().toLocaleString()}</p>
    </div>`
  const text = rows.map(([k, v]) => `${k}: ${v}`).join('\n')

  const subject =
    entry.type === 'booking'
      ? `New Booking — ${entry.name} (${entry.company}) · ${entry.dateISO || entry.date} ${entry.time}`
      : `New Studio Inquiry — ${entry.name}`

  await transporter.sendMail({
    from: `"CashBack Website" <${process.env.GMAIL_USER}>`,
    to: TO_EMAIL,
    replyTo: entry.email && /@/.test(entry.email) ? entry.email : undefined,
    subject,
    text,
    html,
  })
  return true
}

// ── Public API — receives contact / booking submissions ──────────────────────
app.get('/api/health', (_req, res) => res.json({ ok: true }))

app.post('/api/booking', async (req, res) => {
  const { name, company, phone, email, date, dateISO, time } = req.body || {}

  if (!name || !company || !phone || !email || !date || !time) {
    return res.status(400).json({ error: 'Missing required booking fields.' })
  }

  let record
  try {
    record = saveSubmission({ type: 'booking', name, company, phone, email, date, dateISO: dateISO || '', time })
  } catch (err) {
    console.error('Failed to save booking:', err)
    return res.status(500).json({ error: 'Failed to save submission.' })
  }

  // Email is best-effort — the lead is already saved, so we still succeed if it fails.
  try {
    const sent = await emailSubmission(record)
    console.log(sent ? `📧 Booking emailed to ${TO_EMAIL} — ${name}` : `💾 Booking saved (email disabled) — ${name}`)
  } catch (err) {
    console.error('⚠️  Booking saved but email failed:', err.code || '', err.message)
  }

  res.json({ ok: true })
})

app.post('/api/inquiry', async (req, res) => {
  const { name, email, brief } = req.body || {}
  if (!name || !email || !brief) {
    return res.status(400).json({ error: 'Missing required inquiry fields.' })
  }

  let record
  try {
    record = saveSubmission({ type: 'inquiry', name, email, brief })
  } catch (err) {
    console.error('Failed to save inquiry:', err)
    return res.status(500).json({ error: 'Failed to save submission.' })
  }

  try {
    const sent = await emailSubmission(record)
    console.log(sent ? `📧 Inquiry emailed to ${TO_EMAIL} — ${name}` : `💾 Inquiry saved (email disabled) — ${name}`)
  } catch (err) {
    console.error('⚠️  Inquiry saved but email failed:', err.code || '', err.message)
  }

  res.json({ ok: true })
})

// ── Admin — view & download the collected submissions ────────────────────────
const checkToken = req => (req.query.token || req.headers['x-admin-token']) === ADMIN_TOKEN

app.get('/api/submissions', (req, res) => {
  if (!checkToken(req)) return res.status(401).json({ error: 'Unauthorized. Add ?token=YOUR_ADMIN_TOKEN' })
  res.json(readSubmissions())
})

app.get('/api/submissions.csv', (req, res) => {
  if (!checkToken(req)) return res.status(401).send('Unauthorized. Add ?token=YOUR_ADMIN_TOKEN')
  const rows = readSubmissions()
  const cols = ['receivedAt', 'type', 'name', 'company', 'phone', 'email', 'date', 'time', 'brief']
  const csvCell = v => `"${String(v ?? '').replace(/"/g, '""')}"`
  const csv = [cols.join(','), ...rows.map(r => cols.map(c => csvCell(r[c])).join(','))].join('\n')
  res.setHeader('Content-Type', 'text/csv; charset=utf-8')
  res.setHeader('Content-Disposition', 'attachment; filename="cashback-submissions.csv"')
  res.send(csv)
})

function adminPage(req, res) {
  const token = req.query.token || ''
  if (token !== ADMIN_TOKEN) {
    return res.send(`<!doctype html><html><head><meta charset="utf-8"><title>CashBack — Admin</title>
      <style>body{font-family:Arial,sans-serif;background:#0d0d0d;color:#fff;display:flex;align-items:center;justify-content:center;height:100vh;margin:0}
      form{background:#1a1a1a;padding:32px;border-radius:16px;border:1px solid #333;text-align:center}
      input{padding:10px 14px;border-radius:8px;border:1px solid #444;background:#111;color:#fff;margin:12px 0;width:240px}
      button{padding:10px 20px;border:0;border-radius:8px;background:#d4af37;color:#000;font-weight:bold;cursor:pointer}
      h2{color:#d4af37;margin-top:0}</style></head>
      <body><form method="get"><h2>CashBack Submissions</h2>
      <p style="color:#999">Enter your admin token to view submissions.</p>
      <input name="token" type="password" placeholder="Admin token" autofocus /><br/>
      <button type="submit">View</button></form></body></html>`)
  }

  const rows = readSubmissions()
  const fmt = iso => { try { return new Date(iso).toLocaleString() } catch { return iso } }

  const rowsHtml = rows.length
    ? rows.map(r => `
      <tr>
        <td>${esc(fmt(r.receivedAt))}</td>
        <td><span class="tag">${esc(r.type)}</span></td>
        <td>${esc(r.name)}</td>
        <td>${esc(r.company || '—')}</td>
        <td>${esc(r.phone || '—')}</td>
        <td>${esc(r.email || '—')}</td>
        <td>${esc([r.date, r.time].filter(Boolean).join(' · ') || r.brief || '—')}</td>
      </tr>`).join('')
    : `<tr><td colspan="7" style="text-align:center;color:#999;padding:40px">No submissions yet.</td></tr>`

  res.send(`<!doctype html><html><head><meta charset="utf-8"><title>CashBack — Submissions</title>
    <style>
      body{font-family:Arial,sans-serif;background:#0d0d0d;color:#eee;margin:0;padding:32px}
      h1{color:#d4af37;font-size:22px}
      .bar{display:flex;justify-content:space-between;align-items:center;margin-bottom:20px;flex-wrap:wrap;gap:12px}
      a.btn{padding:8px 16px;background:#d4af37;color:#000;text-decoration:none;border-radius:8px;font-weight:bold}
      table{width:100%;border-collapse:collapse;font-size:13px}
      th,td{padding:10px 12px;border-bottom:1px solid #222;text-align:left}
      th{color:#d4af37;text-transform:uppercase;font-size:11px;letter-spacing:1px}
      tr:hover td{background:#161616}
      .tag{background:#e11d2a;color:#fff;padding:2px 8px;border-radius:20px;font-size:10px;text-transform:uppercase}
      .count{color:#999;font-size:13px}
    </style></head>
    <body>
      <div class="bar">
        <div><h1>CashBack — Contact Submissions</h1><span class="count">${rows.length} total</span></div>
        <a class="btn" href="/api/submissions.csv?token=${encodeURIComponent(token)}">Download CSV</a>
      </div>
      <table>
        <thead><tr><th>Received</th><th>Type</th><th>Name</th><th>Company</th><th>Phone</th><th>Email</th><th>Details</th></tr></thead>
        <tbody>${rowsHtml}</tbody>
      </table>
    </body></html>`)
}

app.get('/admin', adminPage)
app.get('/api/admin', adminPage)

app.listen(PORT, () => {
  console.log(`✅ Contact server listening on http://localhost:${PORT}`)
  console.log(`   Submissions saved to: ${DATA_FILE}`)
  console.log(`   Admin view: http://localhost:${PORT}/admin?token=${ADMIN_TOKEN}`)

  if (!emailEnabled) {
    console.warn('⚠️  Email disabled — set GMAIL_USER and GMAIL_APP_PASSWORD in .env to email submissions to you.')
    return
  }
  transporter.verify()
    .then(() => console.log(`📧 Gmail ready — submissions will be emailed to ${TO_EMAIL}`))
    .catch(err => console.error('❌ Gmail login failed:', err.code || '', err.message))
})
