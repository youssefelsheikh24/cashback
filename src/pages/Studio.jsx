import { useEffect, useState } from 'react'
import useReveal from '../hooks/useReveal'
import { socials } from '../data/socials'
import { useLang } from '../i18n/LanguageContext'

const BACKDROPS = [
  { img: '/locations/1/IMG_8545_00000_00000.png', title: 'LOCATION 01', titleAr: 'موقع ٠١' },
  { img: '/locations/2/IMG_8594_00000_00000.png', title: 'LOCATION 02', titleAr: 'موقع ٠٢' },
  { img: '/locations/3/2424.jpeg', title: 'LOCATION 03', titleAr: 'موقع ٠٣' },
  { img: '/locations/4/45545.jpeg', title: 'LOCATION 04', titleAr: 'موقع ٠٤' },
  { img: '/locations/5/10.jpeg', title: 'LOCATION 05', titleAr: 'موقع ٠٥' },
  { img: '/locations/6/555.jpeg', title: 'LOCATION 06', titleAr: 'موقع ٠٦' },
  { img: '/locations/7/4.jpeg', title: 'LOCATION 07', titleAr: 'موقع ٠٧' },
  { img: '/locations/8/111.jpeg', title: 'LOCATION 08', titleAr: 'موقع ٠٨' },
]

// EDUX studio rental packages. Prices include VAT, subject to change.
const MONTHLY = [
  {
    name: 'Basic Package', nameAr: 'الباقة الأساسية', hours: '10 Hours', hoursAr: '10 ساعات', price: '2400',
    validity: 'Valid for one full month', validityAr: 'صالحة لمدة شهر كامل',
    features: ['On-site technical support', 'Flexible booking times'],
    featuresAr: ['دعم فني متواجد', 'مرونة في مواعيد الحجز'],
    featured: false,
  },
  {
    name: 'Premium Package', nameAr: 'الباقة المتميزة', hours: '20 Hours', hoursAr: '20 ساعة', price: '4400',
    validity: 'Valid for one full month', validityAr: 'صالحة لمدة شهر كامل',
    features: ['On-site technical support', 'Flexible booking times', 'Discount on extra hours'],
    featuresAr: ['دعم فني متواجد', 'مرونة في مواعيد الحجز', 'خصم على الساعات الإضافية'],
    featured: true, badge: 'Most Popular', badgeAr: 'الأكثر اختيارًا',
  },
  {
    name: 'Advanced Package', nameAr: 'الباقة المتقدمة', hours: '30 Hours', hoursAr: '30 ساعة', price: '6300',
    validity: 'Valid for one and a half months', validityAr: 'صالحة لمدة شهر ونصف',
    features: ['On-site technical support', 'Flexible booking times', 'Discount on extra hours', 'Access to advanced equipment'],
    featuresAr: ['دعم فني متواجد', 'مرونة في مواعيد الحجز', 'خصم على الساعات الإضافية', 'مشاركة للتجهيزات المتقدمة'],
    featured: false,
  },
]

const LONGTERM = [
  {
    name: '40-Hour Package', nameAr: 'باقة 40 ساعة', hours: '40 Hours', hoursAr: '40 ساعة', price: '8000',
    validity: 'Valid for two months', validityAr: 'صالحة لمدة شهرين',
    features: ['Save 20% vs. the single-hour rate', 'Priority in booking preferred times', 'Premium technical support throughout the project', 'Flexible hour distribution across the two months'],
    featuresAr: ['توفير 20% مقارنة بسعر الساعة الفردية', 'أولوية في حجز المواعيد المناسبة', 'دعم فني متميز طوال فترة المشروع', 'مرونة في توزيع الساعات على الشهرين'],
    featured: false,
  },
  {
    name: '50-Hour Package', nameAr: 'باقة 50 ساعة', hours: '50 Hours', hoursAr: '50 ساعة', price: '9500',
    validity: 'Valid for three months', validityAr: 'صالحة لمدة ثلاثة أشهر',
    features: ['Save 24% vs. the single-hour rate', 'Top priority in booking times', 'Free extra editing & montage services', 'Full flexibility distributing hours across three months'],
    featuresAr: ['توفير 24% مقارنة بسعر الساعة الفردية', 'أولوية قصوى في حجز المواعيد', 'خدمات إضافية مجانية للتحرير والمونتاج', 'مرونة كاملة في توزيع الساعات على الثلاثة أشهر'],
    featured: true, badge: 'Best Value', badgeAr: 'أفضل قيمة',
  },
]

function PackageCard({ p }) {
  const { t } = useLang()
  return (
    <div
      className={`reveal relative p-8 rounded-3xl border transition-all duration-300 flex flex-col ${
        p.featured
          ? 'border-brand-red glow-red lg:scale-[1.02]'
          : 'border-white/10 hover:border-brand-red/40 hover:-translate-y-1'
      }`}
      style={{ background: p.featured ? 'rgb(var(--surface-rgb))' : 'rgb(var(--surface2-rgb))' }}
    >
      {p.badge && (
        <span className="absolute -top-3 right-1/2 translate-x-1/2 bg-brand-red text-white text-[10px] font-bold tracking-wide px-4 py-1.5 rounded-full">
          {t(p.badge, p.badgeAr)}
        </span>
      )}
      <h3 className="font-bebas text-3xl text-white leading-none mb-1">{t(p.name, p.nameAr)}</h3>
      <p className="text-brand-red text-sm mb-4">{t(p.hours, p.hoursAr)}</p>

      <div className="flex items-baseline gap-2 mb-1">
        <span className="font-bebas text-5xl text-white leading-none">{p.price}</span>
        <span className="text-brand-gray text-sm">{t('EGP', 'جنيه')}</span>
      </div>
      <p className="text-brand-gray text-[11px] mb-6">{t(p.validity, p.validityAr)}</p>

      <ul className="flex flex-col gap-3 mb-8">
        {t(p.features, p.featuresAr).map((f, fi) => (
          <li key={fi} className="flex items-start gap-3 text-xs text-white/80 leading-relaxed">
            <span className="w-1.5 h-1.5 bg-brand-red rotate-45 shrink-0 mt-1.5" />
            {f}
          </li>
        ))}
      </ul>

      <button className={`mt-auto text-center ${p.featured ? 'btn-primary w-full' : 'btn-ghost w-full'}`}>
        {t('Book Now', 'احجز الآن')}
      </button>
    </div>
  )
}

export default function Studio() {
  const { t } = useLang()
  const revealRef = useReveal()
  const [form, setForm] = useState({ name: '', email: '', brief: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [error, setError] = useState('')

  // Re-grade the global accent to red only while this page is mounted.
  useEffect(() => {
    document.documentElement.classList.add('studio-theme')
    return () => document.documentElement.classList.remove('studio-theme')
  }, [])

  const onChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const onSubmit = async e => {
    e.preventDefault()
    if (!form.name || !form.email || !form.brief) {
      setError(t('Fill name, email and brief.', 'املأ الاسم والبريد والوصف.'))
      return
    }
    setError(''); setStatus('sending')
    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('failed')
      setStatus('sent')
    } catch {
      setError(t('Something went wrong. Try again or email us directly.', 'حدث خطأ ما. حاول مجددًا أو راسلنا مباشرة.'))
      setStatus('error')
    }
  }

  return (
    <div ref={revealRef}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <img
          className="absolute inset-0 w-full h-full object-cover"
          src="/locations/main.jpeg" alt="CashBack Studio location"
        />
        {/* Red cinematic wash + vignette */}
        <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgb(var(--bg-rgb)/0.55) 0%, rgb(var(--bg-rgb)/0.2) 40%, rgb(var(--bg-rgb)/0.95) 100%)' }} />
        <div className="absolute inset-0 mix-blend-multiply" style={{ background: 'radial-gradient(circle at 30% 60%, rgb(var(--accent-rgb)/0.45), transparent 60%)' }} />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 w-full">
          <p className="text-brand-red text-[10px] sm:text-xs tracking-[0.5em] uppercase mb-5">{t('The Global Stage', 'المسرح العالمي')}</p>
          <div className="w-12 h-[3px] bg-brand-red mb-6" />
          <h1 className="font-bebas text-7xl sm:text-9xl leading-[0.9] text-white max-w-4xl">
            {t(<>LOCATIONS &amp;<br /><span className="text-brand-red">INVESTMENT</span></>, <>المواقع<br /><span className="text-brand-red">والاستثمار</span></>)}
          </h1>
          <p className="text-brand-gray max-w-xl text-sm sm:text-base leading-relaxed mt-6">
            {t("Excellence requires the right environment. We pair world-class production environments with strategic investment packages tailored for brands that demand a cinematic edge.", 'التميّز يتطلب البيئة المناسبة. نجمع بيئات إنتاج عالمية المستوى مع باقات استثمار استراتيجية مصمّمة للعلامات التي تطلب لمسة سينمائية.')}
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10">
          <span className="text-[9px] tracking-[0.3em] uppercase text-brand-gray">{t('Scroll', 'مرّر')}</span>
          <span className="w-px h-10 bg-gradient-to-b from-brand-red to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── The Backdrops ────────────────────────────────── */}
      <section className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <p className="text-brand-red text-[10px] tracking-[0.4em] uppercase mb-3">{t('Curated Environments', 'بيئات منتقاة')}</p>
            <h2 className="font-bebas text-5xl sm:text-7xl text-white leading-none">{t('THE BACKDROPS', 'المواقع')}</h2>
          </div>
          <p className="text-brand-gray text-xs max-w-sm leading-relaxed">
            {t("The locations are selected for raw narrative potential. From brutalist concrete to high-tech infinitives, we provide the canvas for your brand's story.", 'المواقع مختارة لطاقتها السردية الخام. من الخرسانة الخام إلى الأستوديوهات عالية التقنية، نوفّر اللوحة لحكاية علامتك.')}
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 stagger">
          {BACKDROPS.map(b => (
            <div key={b.title} className="reveal group relative overflow-hidden rounded-2xl card-hover h-60 sm:h-72">
              <img src={b.img} alt={b.title} loading="lazy"
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, transparent 30%, rgb(var(--bg-rgb)/0.9) 100%)' }} />
              <div className="absolute bottom-0 left-0 p-5">
                <h3 className="font-bebas text-2xl text-white leading-none">{t(b.title, b.titleAr)}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Packages (EDUX, Arabic) ──────────────────────── */}
      <section className="py-24 px-4 sm:px-6" style={{ background: 'rgb(var(--bg2-rgb))' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-brand-red text-[10px] tracking-[0.4em] uppercase mb-3">{t('Studio Rental Pricing', 'أسعار إيجار الاستوديو')}</p>
            <h2 className="font-bebas text-5xl sm:text-7xl text-white leading-none">{t('PACKAGES & PRICING', 'الباقات والأسعار')}</h2>
          </div>

          {/* Hourly banner */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16 text-center">
            <span className="text-brand-gray text-sm">{t('Single Hour Rental', 'إيجار الساعة الواحدة')}</span>
            <span className="font-bebas text-4xl text-brand-red leading-none">{t('250 EGP', '250 جنيه')}</span>
            <span className="text-brand-gray text-xs">{t('/ per hour · Booking available all week', '/ للساعة · الحجز متاح طوال الأسبوع')}</span>
          </div>

          {/* Monthly */}
          <p className="text-center text-white/90 font-bebas text-3xl mb-8">{t('MONTHLY PACKAGES', 'الباقات الشهرية')}</p>
          <div className="grid lg:grid-cols-3 gap-6 items-stretch mb-16">
            {MONTHLY.map(p => <PackageCard key={p.name} p={p} />)}
          </div>

          {/* Long-term */}
          <p className="text-center text-white/90 font-bebas text-3xl mb-8">{t('LONG-TERM PACKAGES', 'الباقات الطويلة المدى')}</p>
          <div className="grid lg:grid-cols-2 gap-6 items-stretch max-w-4xl mx-auto">
            {LONGTERM.map(p => <PackageCard key={p.name} p={p} />)}
          </div>

          <p className="text-center text-brand-gray text-[11px] mt-10">
            {t('Prices include VAT and are subject to change — please confirm prices before booking.', 'الأسعار تشمل ضريبة القيمة المضافة وقابلة للتغيير — يرجى التأكد من الأسعار قبل الحجز.')}
          </p>
        </div>
      </section>

      {/* ── Start the Conversation ───────────────────────── */}
      <section className="relative py-24 px-4 sm:px-6 overflow-hidden">
        {/* Giant watermark */}
        <span className="pointer-events-none select-none absolute -right-10 bottom-0 font-bebas text-[20rem] leading-none text-white/[0.03]">CASHB</span>

        <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">
          {/* Left — pitch */}
          <div>
            <p className="text-brand-red text-[10px] tracking-[0.4em] uppercase mb-3">{t('Next Steps', 'الخطوات التالية')}</p>
            <h2 className="font-bebas text-5xl sm:text-7xl text-white leading-none mb-8">{t('START THE CONVERSATION', 'لنبدأ الحوار')}</h2>
            <a href="mailto:productions@cashback.studio" className="block text-xl sm:text-2xl text-white hover:text-brand-red transition-colors mb-3">
              productions@cashback.studio
            </a>
            <p className="text-brand-gray text-sm mb-8">+1 (555) 000-CINEMA</p>
            <div className="flex gap-3">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                  className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center text-brand-gray hover:text-brand-red hover:border-brand-red transition-colors">
                  <s.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Right — inquiry form */}
          <div>
            {status === 'sent' ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-10 border border-brand-red/40 rounded-3xl" style={{ background: 'rgb(var(--surface-rgb))' }}>
                <div className="w-12 h-12 border border-brand-red flex items-center justify-center mb-4">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgb(var(--accent-rgb))" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
                </div>
                <h3 className="font-bebas text-2xl text-white mb-1">{t('BRIEF RECEIVED', 'تم استلام طلبك')}</h3>
                <p className="text-brand-gray text-sm">{t("We'll reach out within 24 hours.", 'سنتواصل معك خلال 24 ساعة.')}</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input name="name" value={form.name} onChange={onChange} placeholder={t('Full Name', 'الاسم الكامل')}
                  className="inquiry-field" />
                <input name="email" type="email" value={form.email} onChange={onChange} placeholder={t('Email Address', 'البريد الإلكتروني')}
                  className="inquiry-field" />
                <textarea name="brief" value={form.brief} onChange={onChange} rows={5} placeholder={t('Tell us about your project brief…', 'أخبرنا عن تفاصيل مشروعك…')}
                  className="inquiry-field resize-none" />
                {error && <p className="text-xs text-brand-red">{error}</p>}
                <button type="submit" disabled={status === 'sending'} className="btn-primary text-center disabled:opacity-60">
                  {status === 'sending' ? t('Sending…', 'جارٍ الإرسال…') : t('Submit Inquiry →', 'إرسال الطلب →')}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}
