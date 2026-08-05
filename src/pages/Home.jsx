import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { videos, stats, categoriesAr } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import VideoCard from '../components/VideoCard'
import VideoPlayer from '../components/VideoPlayer'
import Counter from '../components/Counter'
import ClientMarquee from '../components/ClientMarquee'
import useReveal from '../hooks/useReveal'

// Distinct categories that have at least one video (used for the featured tabs)
const tabCats = [...new Set(videos.map(v => v.category))]

export default function Home() {
  const { t } = useLang()
  const heroRef = useRef(null)
  const revealRef = useReveal()

  // Featured-videos category navigation
  const [activeCat, setActiveCat] = useState(tabCats[0])
  const catVideos = videos.filter(v => v.category === activeCat)
  const mainVideo = catVideos[0]

  // Parallax on hero text
  useEffect(() => {
    let ticking = false
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (heroRef.current) {
            heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
          }
          ticking = false
        })
        ticking = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      {/* Hero stays cinematic (dark overlay + white text) in both themes */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden pt-28 sm:pt-36 pb-10 sm:pb-16" style={{ ['--bg-rgb']: '13 13 13', ['--fg-rgb']: '255 255 255' }}>
        {/* Background video */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <VideoPlayer
            src="/hero-cashback.mp4"
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            className="absolute inset-0 w-full h-full object-cover"
          />
          {/* Dark gradient overlay — heavier on the left side to boost contrast for left-aligned text */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to right, rgb(var(--bg-rgb) /0.85) 0%, rgb(var(--bg-rgb) /0.5) 60%, rgb(var(--bg-rgb) /0.3) 100%)' }} />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgb(var(--bg-rgb) /0.35) 0%, transparent 60%, rgb(var(--bg-rgb) /1) 100%)' }} />
          {/* Red vignette */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgb(var(--bg-rgb) /0.7) 100%)' }} />
        </div>

        {/* Hero Top Content (Headline) — Positioned at Top */}
        <div ref={heroRef} className="relative z-10 text-left rtl:text-right px-6 sm:px-10 lg:px-16 max-w-4xl w-full mr-auto ml-0">
          <h1 className="font-bebas text-[clamp(2.5rem,7vw,5.8rem)] leading-[0.95] text-white text-shadow">
            {t(<>WE DON'T CREATE<br />CONTENT.<br /><span className="text-brand-red">WE CREATE BRANDS</span><br />PEOPLE REMEMBER.</>,
               <>نحن لا نصنع<br />محتوى.<br /><span className="text-brand-red">نحن نصنع علامات</span><br />يتذكرها الناس.</>)}
          </h1>
        </div>

        {/* Hero Bottom Content (Action Buttons) — Positioned at Bottom */}
        <div className="relative z-10 text-left rtl:text-right px-6 sm:px-10 lg:px-16 max-w-4xl w-full mr-auto ml-0 mt-8">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-3 sm:gap-4">
            <Link to="/portfolio" className="btn-primary text-center">
              {t('View Our Work', 'شاهد أعمالنا')}
            </Link>
            <Link to="/contact" className="btn-ghost text-center">
              {t('Contact Us', 'تواصل معنا')}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── CLIENT MARQUEE ─────────────────────────────────────── */}
      <ClientMarquee />

      {/* ─── MISSION ──────────────────────────────────────────────── */}
      <section ref={revealRef} className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-brand-red text-[10px] tracking-[0.4em] uppercase mb-4">{t('Our Mission', 'مهمتنا')}</p>
            <h2 className="reveal font-bebas text-5xl sm:text-6xl leading-tight text-white mb-6">
              {t(<>CINEMATIC PRECISION.<br /><span className="text-brand-red">REAL RESULTS.</span></>,
                 <>دقّة سينمائية.<br /><span className="text-brand-red">نتائج حقيقية.</span></>)}
            </h2>
            <p className="reveal text-brand-gray text-base leading-relaxed mb-6" style={{ transitionDelay: '0.1s' }}>
              {t('We engineer high-impact narratives across digital and physical mediums. Every frame, every cut, every pixel is crafted with the obsessive precision of a modern darkroom.', 'نصمّم حكايات عالية التأثير عبر الوسائط الرقمية والمادية. كل لقطة وكل قطع وكل بكسل يُصاغ بدقّة هوسية كغرفة تحميض حديثة.')}
            </p>
            <p className="reveal text-brand-gray text-base leading-relaxed mb-8" style={{ transitionDelay: '0.2s' }}>
              {t("We don't just capture footage — we engineer reality. Our methodology strips away the superfluous, leaving only high-impact, uncompromising visual truth.", 'نحن لا نلتقط لقطات فحسب — بل نهندس الواقع. منهجنا يزيل الزائد، ولا يترك سوى حقيقة بصرية عالية التأثير لا تقبل المساومة.')}
            </p>
            <Link to="/services" className="reveal btn-primary inline-block" style={{ transitionDelay: '0.3s' }}>
              {t('Explore Services', 'استكشف الخدمات')}
            </Link>
          </div>
          <div className="reveal grid grid-cols-2 gap-4" style={{ transitionDelay: '0.1s' }}>
            {stats.map(s => (
              <div key={s.label} className="p-6 border border-white/8 text-center rounded-2xl" style={{ background: 'rgb(var(--surface-rgb))' }}>
                <Counter target={s.value} suffix={s.suffix} />
                <p className="text-[10px] tracking-[0.2em] uppercase text-brand-gray mt-2">{t(s.label, s.labelAr)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FEATURED VIDEOS ─────────────────────────────────────── */}
      <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: 'rgb(var(--bg2-rgb))' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <p className="text-brand-red text-[10px] tracking-[0.4em] uppercase mb-3">{t('Selected Works', 'أعمال مختارة')}</p>
            <h2 className="font-bebas text-4xl sm:text-5xl text-white">{t('FEATURED REELS', 'أبرز الأعمال')}</h2>
          </div>

          {/* Category navbar */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {tabCats.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className={`px-5 py-2 rounded-full text-[11px] font-semibold tracking-widest uppercase transition-all duration-300 border ${
                  activeCat === cat
                    ? 'bg-brand-red border-brand-red text-white'
                    : 'bg-transparent border-white/15 text-brand-gray hover:text-white hover:border-white/40'
                }`}
              >
                {t(cat, categoriesAr[cat] || cat)}
              </button>
            ))}
          </div>

          {/* Main autoplay video of the active category */}
          {mainVideo && (
            <div className="rounded-3xl overflow-hidden border border-white/8 bg-black shadow-2xl">
              <VideoPlayer key={mainVideo.id} video={mainVideo} rounded={false} />
              <div className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  {mainVideo.tag && (
                    <span className="text-[9px] font-semibold tracking-widest uppercase px-2 py-1 bg-brand-red text-white rounded-full">
                      {mainVideo.tag}
                    </span>
                  )}
                  {mainVideo.description && <p className="text-xs text-brand-gray mt-1 max-w-xl">{mainVideo.description}</p>}
                </div>
                {(mainVideo.views || mainVideo.duration || mainVideo.year) && (
                  <div className="flex gap-6 text-center flex-shrink-0">
                    {mainVideo.views && (
                      <div>
                        <p className="font-bebas text-2xl text-brand-red">{mainVideo.views}</p>
                        <p className="text-[10px] text-brand-gray uppercase tracking-wider">{t('Views', 'مشاهدة')}</p>
                      </div>
                    )}
                    {mainVideo.duration && (
                      <div>
                        <p className="font-bebas text-2xl text-white">{mainVideo.duration}</p>
                        <p className="text-[10px] text-brand-gray uppercase tracking-wider">{t('Duration', 'المدة')}</p>
                      </div>
                    )}
                    {mainVideo.year && (
                      <div>
                        <p className="font-bebas text-2xl text-white">{mainVideo.year}</p>
                        <p className="text-[10px] text-brand-gray uppercase tracking-wider">{t('Year', 'السنة')}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Other videos in this category — 3 below the main (4 total), then "View More" */}
          {catVideos.length > 1 && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {catVideos.slice(1, 4).map(v => (
                <VideoCard key={v.id} video={v} />
              ))}
            </div>
          )}

          {/* View More button */}
          <div className="mt-12 text-center">
            <Link to="/portfolio" className="btn-primary inline-block text-sm px-10 py-4">
              {t('View More', 'عرض المزيد')}
            </Link>
          </div>
        </div>
      </section>

      {/* ─── PROCESS CTA ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, transparent 70%)' }} />
        </div>
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <p className="text-brand-red text-[10px] tracking-[0.4em] uppercase mb-4">{t('Ready?', 'جاهز؟')}</p>
          <h2 className="font-bebas text-5xl sm:text-7xl text-white mb-6">
            {t(<>LET'S CREATE SOMETHING <span className="text-brand-red">ICONIC.</span></>,
               <>لنصنع شيئًا <span className="text-brand-red">استثنائيًا.</span></>)}
          </h2>
          <p className="text-brand-gray mb-10 max-w-xl mx-auto">
            {t('Whether you need a comprehensive digital overhaul or a focused cinematic campaign, our studio is ready to bring your vision to life.', 'سواء كنت تحتاج إلى تحول رقمي شامل أو حملة سينمائية مركّزة، استوديونا جاهز لتحويل رؤيتك إلى واقع.')}
          </p>
          <Link to="/contact" className="btn-primary inline-block text-sm px-10 py-4">
            {t('Contact Us', 'تواصل معنا')}
          </Link>
        </div>
      </section>
    </div>
  )
}
