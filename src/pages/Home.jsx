import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { videos, stats, embedUrl, categoriesAr } from '../data/projects'
import { clientLogos } from '../data/clients'
import { useLang } from '../i18n/LanguageContext'

// Distinct categories that have at least one video (used for the featured tabs)
const tabCats = [...new Set(videos.map(v => v.category))]
import VideoCard from '../components/VideoCard'
import useReveal from '../hooks/useReveal'

// Typewriter — types the slogan out, pauses, deletes it, then loops.
// `segments` = [{ text, className }] so a middle line can stay red while typing.
function Typewriter({ segments }) {
  const full = segments.map(s => s.text).join('')
  const [count, setCount] = useState(0)
  const [deleting, setDeleting] = useState(false)

  // Restart the animation whenever the text changes (e.g. language switch)
  useEffect(() => {
    setCount(0)
    setDeleting(false)
  }, [full])

  useEffect(() => {
    const typeSpeed = 55
    const deleteSpeed = 28
    const pauseAtEnd = 2000
    const pauseAtStart = 700

    let delay = typeSpeed
    if (!deleting && count >= full.length) delay = pauseAtEnd
    else if (deleting && count <= 0) delay = pauseAtStart
    else if (deleting) delay = deleteSpeed

    const id = setTimeout(() => {
      if (!deleting && count < full.length) setCount(c => c + 1)
      else if (!deleting && count >= full.length) setDeleting(true)
      else if (deleting && count > 0) setCount(c => c - 1)
      else setDeleting(false)
    }, delay)

    return () => clearTimeout(id)
  }, [count, deleting, full])

  // Slice `count` characters across the styled segments
  let remaining = count
  return (
    <span className="inline-flex flex-wrap justify-center items-stretch" style={{ whiteSpace: 'pre-line' }}>
      <span>
        {segments.map((s, i) => {
          const take = Math.max(0, Math.min(s.text.length, remaining))
          remaining -= s.text.length
          return (
            <span key={i} className={s.className}>
              {s.text.slice(0, take)}
            </span>
          )
        })}
      </span>
      <span className="type-caret" aria-hidden="true" />
    </span>
  )
}

// Animated counter
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true
        let start = 0
        const duration = 2000
        const step = target / (duration / 16)
        const timer = setInterval(() => {
          start = Math.min(start + step, target)
          setCount(Math.floor(start))
          if (start >= target) clearInterval(timer)
        }, 16)
      }
    }, { threshold: 0.5 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target])

  return (
    <span ref={ref} className="font-bebas text-5xl sm:text-6xl text-brand-red">
      {count}{suffix}
    </span>
  )
}


export default function Home() {
  const { t, lang } = useLang()
  const heroRef = useRef(null)

  // Hero slogan split into segments so the middle line stays red as it types
  const heroSegments = lang === 'ar'
    ? [
        { text: 'نحن لا نصنع\nمحتوى.\n' },
        { text: 'نحن نصنع علامات', className: 'text-brand-red' },
        { text: '\nيتذكرها الناس.' },
      ]
    : [
        { text: "WE DON'T CREATE\nCONTENT.\n" },
        { text: 'WE CREATE BRANDS', className: 'text-brand-red' },
        { text: '\nPEOPLE REMEMBER.' },
      ]
  const revealRef = useReveal()

  // Featured-videos category navigation
  const [activeCat, setActiveCat] = useState(tabCats[0])
  const catVideos = videos.filter(v => v.category === activeCat)
  const mainVideo = catVideos[0]

  // Parallax on hero text
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      {/* ─── HERO ─────────────────────────────────────────────── */}
      {/* Hero stays cinematic (dark overlay + white text) in both themes */}
      <section className="relative min-h-screen flex items-start justify-center overflow-hidden pt-32 sm:pt-36" style={{ ['--bg-rgb']: '13 13 13', ['--fg-rgb']: '255 255 255' }}>
        {/* Background video */}
        <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/logomotion-landscape-1080p.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          {/* Overlay */}
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, rgb(var(--bg-rgb) /0.35) 0%, rgb(var(--bg-rgb) /0.65) 55%, rgb(var(--bg-rgb) /1) 100%)' }} />
          {/* Red vignette */}
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgb(var(--bg-rgb) /0.7) 100%)' }} />
        </div>

        {/* Hero content — top-aligned so the logo motion (center) stays visible */}
        <div ref={heroRef} className="relative z-10 text-center px-4 sm:px-6 max-w-5xl mx-auto">
          <h1 className="font-bebas text-[clamp(2.5rem,8vw,6rem)] leading-none text-white text-shadow mb-6 min-h-[4.5em]">
            <Typewriter key={lang} segments={heroSegments} />
          </h1>
          <p className="text-brand-gray text-base sm:text-lg max-w-xl mx-auto mb-10">
            {t('Creative Studio for Marketing, Branding, Video & Ads', 'استوديو إبداعي للتسويق والهوية البصرية والفيديو والإعلانات')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/portfolio" className="btn-primary w-full sm:w-auto text-center">
              {t('View Our Work', 'شاهد أعمالنا')}
            </Link>
            <Link to="/contact" className="btn-ghost w-full sm:w-auto text-center">
              {t('Book Appointment', 'احجز موعد')}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
          <p className="text-[10px] tracking-[0.3em] uppercase text-white/60">{t('Scroll to Explore', 'مرّر للاستكشاف')}</p>
          <div className="w-px h-10 bg-gradient-to-b from-brand-red to-transparent animate-pulse" />
        </div>
      </section>

      {/* ─── CLIENT MARQUEE ─────────────────────────────────────── */}
      <section style={{ borderTop: '1px solid rgb(var(--fg-rgb) / 0.06)', borderBottom: '1px solid rgb(var(--fg-rgb) / 0.06)', background: 'rgb(var(--bg2-rgb))' }} className="py-4 overflow-hidden">
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
      </section>

      {/* ─── MISSION ──────────────────────────────────────────────── */}
      <section ref={revealRef} className="py-24 px-4 sm:px-6 max-w-7xl mx-auto">
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
      <section className="py-20 px-4 sm:px-6" style={{ background: 'rgb(var(--bg2-rgb))' }}>
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
              <div className="video-ratio" style={{ borderRadius: 0 }}>
                {mainVideo.src ? (
                  <video
                    key={mainVideo.src}
                    src={mainVideo.src}
                    poster={mainVideo.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    controls
                  />
                ) : (
                  <iframe
                    key={mainVideo.youtubeId}
                    src={embedUrl(mainVideo, { mute: true, loop: true })}
                    title={mainVideo.title}
                    allow="autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                  />
                )}
              </div>
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
      <section className="py-24 px-4 sm:px-6 relative overflow-hidden">
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
            {t('Book Appointment', 'احجز موعد')}
          </Link>
        </div>
      </section>
    </div>
  )
}
