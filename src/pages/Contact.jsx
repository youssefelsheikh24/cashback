import { useState } from 'react'
import useReveal from '../hooks/useReveal'
import { useLang } from '../i18n/LanguageContext'
import { WHATSAPP_NUMBER, WhatsApp, Instagram, Facebook, TikTok } from '../data/socials'
import ClientMarquee from '../components/ClientMarquee'

export default function Contact() {
  const { t, lang } = useLang()
  const isAr = lang === 'ar'
  const [copiedPhone, setCopiedPhone] = useState(false)
  const [copiedEmail, setCopiedEmail] = useState(false)
  const revealRef = useReveal()

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text)
    if (type === 'phone') {
      setCopiedPhone(true)
      setTimeout(() => setCopiedPhone(false), 2000)
    } else {
      setCopiedEmail(true)
      setTimeout(() => setCopiedEmail(false), 2000)
    }
  }

  const socialPlatforms = [
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      handle: '+20 120 343 9058',
      badge: t('Instant Response', 'رد فوري'),
      desc: t('Direct chat with our creative directors & production team.', 'محادثة مباشرة مع فريقنا الإبداعي وفريق الإنتاج.'),
      cta: t('Chat on WhatsApp', 'محادثة عبر واتساب'),
      href: `https://wa.me/${WHATSAPP_NUMBER}`,
      accentColor: 'from-emerald-500/20 to-emerald-500/5',
      borderColor: 'group-hover:border-emerald-500/50',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      buttonBg: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      icon: <WhatsApp className="w-6 h-6 text-emerald-400" />
    },
    {
      id: 'instagram',
      name: 'Instagram',
      handle: '@cashhback.marketingagency',
      badge: t('Reels & Portfolio', 'الأعمال والريمكسات'),
      desc: t('Follow our cinematic visual showcases and send us a direct message.', 'تابع معارضنا السينمائية وراسلنا مباشرة.'),
      cta: t('Visit Instagram', 'زيارة إنستغرام'),
      href: 'https://www.instagram.com/cashhback.marketingagency/',
      accentColor: 'from-pink-500/20 to-purple-500/5',
      borderColor: 'group-hover:border-pink-500/50',
      badgeBg: 'bg-pink-500/10 text-pink-400 border-pink-500/20',
      buttonBg: 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white',
      icon: <Instagram className="w-6 h-6 text-pink-400" />
    },
    {
      id: 'facebook',
      name: 'Facebook',
      handle: 'Cashback Advertising Agency',
      badge: t('Official Page', 'الصفحة الرسمية'),
      desc: t('Stay updated with company announcements, reviews and campaign launches.', 'ابقَ على اطلاع بأحدث إعلاناتنا، التقييمات والحملات.'),
      cta: t('Visit Facebook', 'زيارة فيسبوك'),
      href: 'https://www.facebook.com/profile.php?id=61587427587361',
      accentColor: 'from-blue-500/20 to-blue-600/5',
      borderColor: 'group-hover:border-blue-500/50',
      badgeBg: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
      buttonBg: 'bg-blue-600 hover:bg-blue-500 text-white',
      icon: <Facebook className="w-6 h-6 text-blue-400" />
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      handle: '@cashback.9',
      badge: t('Behind The Scenes', 'كواليس العمل'),
      desc: t('Watch high-energy production vlogs, creative snippets and studio moments.', 'شاهد كواليس التصوير، المقاطع الإبداعية ولحظات الاستوديو.'),
      cta: t('Follow on TikTok', 'متابعة على تيك توك'),
      href: 'https://www.tiktok.com/@cashback.9',
      accentColor: 'from-cyan-500/20 to-red-500/5',
      borderColor: 'group-hover:border-cyan-500/50',
      badgeBg: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20',
      buttonBg: 'bg-neutral-800 hover:bg-neutral-700 text-white border border-white/20',
      icon: <TikTok className="w-6 h-6 text-cyan-400" />
    }
  ]

  return (
    <div>
      {/* Header */}
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-24 px-4 sm:px-6 text-center" style={{ background: 'linear-gradient(180deg, rgb(var(--surface-rgb)) 0%, rgb(var(--bg-rgb)) 100%)' }}>
        <p className="text-brand-red text-[10px] tracking-[0.5em] uppercase mb-4">{t('Get In Touch', 'تواصل معنا')}</p>
        <h1 className="font-bebas text-6xl sm:text-8xl text-white mb-4 leading-none">
          {t(<>LET'S CREATE SOMETHING <span className="text-brand-red">ICONIC.</span></>, <>لنصنع شيئًا <span className="text-brand-red">استثنائيًا.</span></>)}
        </h1>
        <p className="text-brand-gray max-w-lg mx-auto text-sm leading-relaxed">
          {t("Ready to elevate your brand's narrative? Reach out directly via our social media channels or connect via phone and email.", 'جاهز للارتقاء بحكاية علامتك التجارية؟ تواصل معنا مباشرة عبر منصات التواصل الاجتماعي أو عبر الهاتف والبريد الإلكتروني.')}
        </p>
      </section>

      {/* Client logos marquee */}
      <ClientMarquee />

      {/* Main Social Media & Contact Section */}
      <section ref={revealRef} className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Social Media Platforms Hub (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="p-6 sm:p-8 border border-white/8 rounded-3xl h-full flex flex-col justify-between" style={{ background: 'rgb(var(--surface-rgb))' }}>
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red animate-pulse" />
                  <h2 className="font-bebas text-3xl sm:text-4xl text-white tracking-wide">
                    {t('CONNECT ON SOCIAL MEDIA', 'تواصل عبر وسائل التواصل')}
                  </h2>
                </div>
                <p className="text-xs text-brand-gray mb-8 leading-relaxed max-w-xl">
                  {t('Reach out to us directly on your preferred platform. Our team is active across all channels and ready to bring your vision to life.', 'تواصل معنا مباشرة على منصتك المفضلة. فريقنا متواجد دائمًا وجاهز لتحويل رؤيتك إلى واقع.')}
                </p>

                {/* Social Media Grid */}
                <div className="grid sm:grid-cols-2 gap-4">
                  {socialPlatforms.map(s => (
                    <div
                      key={s.id}
                      className={`group relative p-5 rounded-2xl border border-white/10 bg-gradient-to-br ${s.accentColor} hover:bg-black/60 transition-all duration-300 flex flex-col justify-between ${s.borderColor}`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <div className="w-10 h-10 rounded-xl bg-black/50 border border-white/10 flex items-center justify-center">
                            {s.icon}
                          </div>
                          <span className={`text-[10px] font-semibold tracking-wider px-2.5 py-1 rounded-full border ${s.badgeBg}`}>
                            {s.badge}
                          </span>
                        </div>
                        <h3 className="font-bebas text-xl text-white tracking-wide">{s.name}</h3>
                        <p className="text-[11px] font-mono text-brand-gray mb-2">{s.handle}</p>
                        <p className="text-xs text-white/60 leading-relaxed mb-4">{s.desc}</p>
                      </div>

                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold tracking-wider flex items-center justify-center gap-2 transition-all duration-200 shadow-lg ${s.buttonBg}`}
                      >
                        <span>{s.cta}</span>
                        <svg className={`w-3.5 h-3.5 transition-transform duration-200 ${isAr ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Contact Info (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Quick Contact Info Card */}
            <div className="p-6 sm:p-8 border border-white/8 rounded-3xl h-full flex flex-col justify-between" style={{ background: 'rgb(var(--surface-rgb))' }}>
              <div>
                <h2 className="font-bebas text-3xl sm:text-4xl text-white mb-2">{t('DIRECT CHANNELS', 'قنوات التواصل المباشرة')}</h2>
                <p className="text-xs text-brand-gray mb-8 leading-relaxed">
                  {t('Call us directly or send an email anytime for instant support and collaboration.', 'اتصل بنا مباشرة أو أرسل بريدًا إلكترونيًا في أي وقت للحصول على الدعم المباشر والتعاون.')}
                </p>

                <div className="flex flex-col gap-4">
                  {/* Phone Call Card */}
                  <div className="p-5 border border-white/10 rounded-2xl bg-black/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <div className="w-10 h-10 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[10px] text-brand-gray uppercase tracking-widest">{t('Phone / WhatsApp', 'الهاتف / واتساب')}</p>
                        <a href="tel:+201203439058" className="text-sm font-semibold text-white hover:text-brand-red transition-colors">
                          +20 120 343 9058
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('+201203439058', 'phone')}
                      className="px-3 py-1.5 rounded-lg border border-white/15 text-[11px] font-medium text-white/70 hover:text-white hover:border-brand-red transition-all"
                    >
                      {copiedPhone ? t('Copied!', 'تم النسخ!') : t('Copy', 'نسخ')}
                    </button>
                  </div>

                  {/* Email Card */}
                  <div className="p-5 border border-white/10 rounded-2xl bg-black/40 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5 overflow-hidden">
                      <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div className="truncate">
                        <p className="text-[10px] text-brand-gray uppercase tracking-widest">{t('Official Email', 'البريد الرسمي')}</p>
                        <a href="mailto:cashbackagency1@gmail.com" className="text-xs font-semibold text-white hover:text-brand-red transition-colors truncate block">
                          cashbackagency1@gmail.com
                        </a>
                      </div>
                    </div>
                    <button
                      onClick={() => handleCopy('cashbackagency1@gmail.com', 'email')}
                      className="px-3 py-1.5 shrink-0 rounded-lg border border-white/15 text-[11px] font-medium text-white/70 hover:text-white hover:border-brand-red transition-all"
                    >
                      {copiedEmail ? t('Copied!', 'تم النسخ!') : t('Copy', 'نسخ')}
                    </button>
                  </div>

                  {/* Working Hours Card */}
                  <div className="p-5 border border-white/10 rounded-2xl bg-black/40 flex items-center gap-3.5">
                    <div className="w-10 h-10 shrink-0 rounded-xl bg-brand-red/10 border border-brand-red/30 flex items-center justify-center text-brand-red">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                        <polyline points="12 6 12 12 16 14" strokeWidth="2"/>
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] text-brand-gray uppercase tracking-widest">{t('Studio Working Hours', 'ساعات عمل الاستوديو')}</p>
                      <p className="text-xs font-semibold text-white">
                        {t('Sat – Thu: 10:00 AM – 8:00 PM', 'السبت – الخميس: 10:00 صباحًا – 8:00 مساءً')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
