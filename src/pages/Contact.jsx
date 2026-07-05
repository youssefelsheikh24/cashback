import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import { clientLogos } from '../data/clients'
import { useLang } from '../i18n/LanguageContext'

const DAYS = ['S','M','T','W','T','F','S']
const TIMES = ['10:00 AM', '11:30 AM', '1:00 PM', '2:30 PM', '4:00 PM', '5:00 PM']

// Controlled calendar — date/time live in the parent so the booking form can submit them.
function Calendar({ selected, time, onSelectDate, onSelectTime }) {
  const { t, lang } = useLang()
  const loc = lang === 'ar' ? 'ar-EG' : 'default'
  const [month, setMonth] = useState(new Date())

  const year = month.getFullYear()
  const mon = month.getMonth()
  const monthName = month.toLocaleString('default', { month: 'long', year: 'numeric' }).toUpperCase()

  const firstDay = new Date(year, mon, 1).getDay()
  const daysInMonth = new Date(year, mon + 1, 0).getDate()
  const cells = Array(firstDay).fill(null).concat(Array.from({ length: daysInMonth }, (_, i) => i + 1))

  const prev = () => setMonth(new Date(year, mon - 1, 1))
  const next = () => setMonth(new Date(year, mon + 1, 1))
  const today = new Date()

  // Compare the selected Date (if any) against the cell being rendered.
  const isSameDay = (d, day) =>
    d && d.getFullYear() === year && d.getMonth() === mon && d.getDate() === day

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prev} className="text-brand-gray hover:text-white transition-colors p-1">‹</button>
        <p className="text-xs tracking-widest font-medium">{month.toLocaleString(loc, { month: 'long', year: 'numeric' }).toUpperCase()}</p>
        <button onClick={next} className="text-brand-gray hover:text-white transition-colors p-1">›</button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map((d, i) => (
          <div key={i} className="text-center text-[10px] text-brand-gray py-1">{d}</div>
        ))}
      </div>

      {/* Cells */}
      <div className="grid grid-cols-7 gap-1">
        {cells.map((day, i) => {
          const isToday = day && today.getDate() === day && today.getMonth() === mon && today.getFullYear() === year
          const isPast = day && new Date(year, mon, day) < new Date(today.getFullYear(), today.getMonth(), today.getDate())
          const isSel = isSameDay(selected, day)
          return (
            <button
              key={i}
              type="button"
              disabled={!day || isPast}
              onClick={() => { onSelectDate(new Date(year, mon, day)); onSelectTime(null) }}
              className={`aspect-square text-xs flex items-center justify-center transition-all duration-150 ${
                !day ? '' :
                isPast ? 'text-white/15 cursor-not-allowed' :
                isSel ? 'bg-brand-red text-white' :
                isToday ? 'border border-brand-red text-brand-red' :
                'text-white/70 hover:bg-white/10'
              }`}
            >
              {day || ''}
            </button>
          )
        })}
      </div>

      {/* Times */}
      {selected && (
        <div className="mt-5">
          <p className="text-[10px] tracking-widest uppercase text-brand-gray mb-3">
            {t('Available times for', 'الأوقات المتاحة ليوم')} {selected.toLocaleString(loc, { month: 'long' })} {selected.getDate()}
          </p>
          <div className="grid grid-cols-2 gap-2">
            {TIMES.map(t => (
              <button
                key={t}
                type="button"
                onClick={() => onSelectTime(t)}
                className={`py-2 text-xs border transition-all duration-150 ${
                  time === t
                    ? 'bg-brand-red border-brand-red text-white'
                    : 'border-white/15 text-white/60 hover:border-brand-red hover:text-white'
                }`}
              >
                {t}
              </button>
            ))}
          </div>
          {time && (
            <p className="mt-4 text-xs text-brand-red text-center">
              ✓ {t('Selected:', 'المحدد:')} {selected.toLocaleString(loc, { month: 'long' })} {selected.getDate()} — {time}
            </p>
          )}
        </div>
      )}
    </div>
  )
}

export default function Contact() {
  const { t } = useLang()
  const [form, setForm] = useState({ name: '', company: '', phone: '', email: '' })
  const [date, setDate] = useState(null)   // Date object for the chosen day
  const [time, setTime] = useState(null)   // chosen time slot string
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')
  const revealRef = useReveal()

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    if (!date || !time) {
      setError(t('Please pick a date and time for your appointment.', 'يرجى اختيار تاريخ ووقت لموعدك.'))
      return
    }
    setError('')
    setStatus('sending')

    // Human-readable date, e.g. "Monday, July 14, 2026"
    const dateLabel = date.toLocaleDateString('default', {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    })

    try {
      const res = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          date: dateLabel,
          dateISO: date.toISOString().slice(0, 10),
          time,
        }),
      })
      if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Request failed')
      setStatus('sent')
    } catch (err) {
      setError(t('Something went wrong sending your request. Please try again or contact us directly.', 'حدث خطأ أثناء إرسال طلبك. حاول مرة أخرى أو تواصل معنا مباشرة.'))
      setStatus('error')
    }
  }

  return (
    <div>
      {/* Header */}
      <section className="pt-36 pb-24 px-4 sm:px-6 text-center" style={{ background: 'linear-gradient(180deg, rgb(var(--surface-rgb)) 0%, rgb(var(--bg-rgb)) 100%)' }}>
        <p className="text-brand-red text-[10px] tracking-[0.5em] uppercase mb-4">{t('Get In Touch', 'تواصل معنا')}</p>
        <h1 className="font-bebas text-6xl sm:text-8xl text-white mb-4 leading-none">
          {t(<>LET'S CREATE SOMETHING <span className="text-brand-red">ICONIC.</span></>, <>لنصنع شيئًا <span className="text-brand-red">استثنائيًا.</span></>)}
        </h1>
        <p className="text-brand-gray max-w-lg mx-auto text-sm leading-relaxed">
          {t("Ready to elevate your brand's narrative? Whether you're looking for a comprehensive digital overhaul or a focused cinematic campaign, our studio is ready.", 'جاهز للارتقاء بحكاية علامتك؟ سواء أردت تحوّلًا رقميًا شاملًا أو حملة سينمائية مركّزة، استوديونا جاهز.')}
        </p>
      </section>

      {/* Client logos marquee */}
      <div style={{ borderTop: '1px solid rgb(var(--fg-rgb) / 0.06)', borderBottom: '1px solid rgb(var(--fg-rgb) / 0.06)', background: 'rgb(var(--bg2-rgb))' }} className="py-4 overflow-hidden">
        <div className="flex items-center gap-5 animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
          {[...clientLogos, ...clientLogos].map((c, i) => (
            <div
              key={i}
              className="shrink-0 flex items-center justify-center rounded-2xl h-20 px-6 overflow-hidden"
              style={{ backgroundColor: c.bg }}
            >
              <img src={c.src} alt="" loading="lazy" className="max-h-14 w-auto object-contain" />
            </div>
          ))}
        </div>
      </div>

      {/* Booking */}
      <section ref={revealRef} className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Booking details form */}
          <div className="reveal p-8 border border-white/8 rounded-3xl" style={{ background: 'rgb(var(--surface-rgb))' }}>
            <h2 className="font-bebas text-3xl text-white mb-2">{t('BOOK APPOINTMENT', 'احجز موعد')}</h2>
            <p className="text-xs text-brand-gray mb-8 leading-relaxed">
              {t('Tell us about your brand and pick a slot. Our creative directors will confirm your discovery call within 24 hours.', 'أخبرنا عن علامتك واختر موعدًا. سيؤكّد مديرونا الإبداعيون مكالمة التعارف خلال 24 ساعة.')}
            </p>
            {status === 'sent' ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 bg-brand-red/10 border border-brand-red flex items-center justify-center mx-auto mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                <h3 className="font-bebas text-2xl text-white mb-2">{t('BOOKING SENT', 'تم إرسال الحجز')}</h3>
                <p className="text-brand-gray text-sm">{t("We'll be in touch within 24 hours to confirm your appointment.", 'سنتواصل معك خلال 24 ساعة لتأكيد موعدك.')}</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {[
                  { name: 'name', placeholder: t('Full Name', 'الاسم الكامل'), type: 'text', required: true },
                  { name: 'company', placeholder: t('Company Name', 'اسم الشركة'), type: 'text', required: true },
                ].map(f => (
                  <input
                    key={f.name}
                    {...f}
                    value={form[f.name]}
                    onChange={handleChange}
                    className="w-full bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-red transition-colors duration-200"
                  />
                ))}
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="tel" name="phone" placeholder={t('Phone', 'الهاتف')} required value={form.phone} onChange={handleChange}
                    className="bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-red transition-colors"
                  />
                  <input
                    type="email" name="email" placeholder={t('Email', 'البريد الإلكتروني')} required value={form.email} onChange={handleChange}
                    className="bg-black/40 border border-white/10 px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-red transition-colors"
                  />
                </div>

                {/* Chosen slot summary */}
                <div className="text-xs px-4 py-3 border border-white/10 bg-black/40 text-brand-gray">
                  {date && time ? (
                    <span className="text-white">
                      {date.toLocaleDateString('default', { weekday: 'short', month: 'long', day: 'numeric' })} · {time}
                    </span>
                  ) : (
                    t('No slot selected — pick a date & time on the right →', 'لم يتم اختيار موعد — اختر التاريخ والوقت من الجهة الأخرى →')
                  )}
                </div>

                {error && <p className="text-xs text-brand-red">{error}</p>}

                <button type="submit" disabled={status === 'sending'} className="btn-primary mt-2 text-center disabled:opacity-60">
                  {status === 'sending' ? t('Sending…', 'جارٍ الإرسال…') : t('Confirm Booking →', 'تأكيد الحجز →')}
                </button>
              </form>
            )}
          </div>

          {/* Date & time picker */}
          <div className="reveal p-8 border border-white/8 rounded-3xl" style={{ background: 'rgb(var(--surface-rgb))', transitionDelay: '0.1s' }}>
            <h2 className="font-bebas text-3xl text-white mb-2">{t('SELECT DATE & TIME', 'اختر التاريخ والوقت')}</h2>
            <p className="text-xs text-brand-gray mb-8 leading-relaxed">
              {t('Schedule a 30-minute discovery call with our production team.', 'احجز مكالمة تعارف مدتها 30 دقيقة مع فريق الإنتاج لدينا.')}
            </p>
            <Calendar selected={date} time={time} onSelectDate={setDate} onSelectTime={setTime} />
          </div>
        </div>
      </section>

      {/* Map / Location */}
      <section className="px-4 sm:px-6 pb-20 max-w-7xl mx-auto">
        <div className="relative overflow-hidden border border-white/8 rounded-3xl" style={{ height: '360px', background: 'rgb(var(--surface2-rgb))' }}>
          {/* Real map */}
          <iframe
            title="CashBack Headquarters location"
            src="https://www.google.com/maps?q=29.317056,30.854667&z=15&hl=en&output=embed"
            className="absolute inset-0 w-full h-full"
            style={{ border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          {/* Info card overlay */}
          <div className="absolute bottom-4 left-4 text-left p-5 border border-white/10 rounded-2xl backdrop-blur-sm pointer-events-auto" style={{ background: 'rgb(var(--bg-rgb) /0.85)' }}>
            <div className="w-4 h-4 bg-brand-red mb-3" style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
            <h3 className="font-bebas text-2xl text-white mb-1">{t('HEADQUARTERS', 'المقر الرئيسي')}</h3>
            <p className="text-xs text-brand-gray mb-3">{t('Fayoum & Cairo, Egypt', 'الفيوم والقاهرة، مصر')}</p>
            <a href="https://www.google.com/maps?q=29.317056,30.854667" target="_blank" rel="noopener noreferrer" className="text-[10px] text-brand-red uppercase tracking-widest hover:underline">
              {t('Get Directions →', 'احصل على الاتجاهات →')}
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
