import { useState, useEffect, useRef } from 'react'
import { videos, categories, categoriesAr, thumbUrl } from '../data/projects'
import VideoCard from '../components/VideoCard'
import { useLang } from '../i18n/LanguageContext'

export default function Portfolio() {
  const { t } = useLang()
  const [active, setActive] = useState('All')
  const [filtered, setFiltered] = useState(videos)
  const [visible, setVisible] = useState(false)
  const headerRef = useRef(null)

  useEffect(() => {
    setVisible(false)
    const t = setTimeout(() => {
      setFiltered(active === 'All' ? videos : videos.filter(v => v.category === active))
      setVisible(true)
    }, 150)
    return () => clearTimeout(t)
  }, [active])

  useEffect(() => {
    setVisible(true)
  }, [])

  return (
    <div>
      {/* Header */}
      <section className="pt-28 pb-14 sm:pt-36 sm:pb-20 px-4 sm:px-6 text-center" style={{ background: 'linear-gradient(180deg, rgb(var(--surface-rgb)) 0%, rgb(var(--bg-rgb)) 100%)' }}>
        <p className="text-brand-red text-[10px] tracking-[0.5em] uppercase mb-4">{t('Our Work', 'أعمالنا')}</p>
        <h1 className="font-bebas text-6xl sm:text-8xl text-white mb-4">
          {t(<>SELECTED <span className="text-brand-red">WORKS</span></>, <>أعمال <span className="text-brand-red">مختارة</span></>)}
        </h1>
        <p className="text-brand-gray max-w-lg mx-auto text-sm leading-relaxed">
          {t('Explore our portfolio of high-impact storytelling, blending cinematic artistry with cutting-edge visual techniques for global brands.', 'استكشف معرض أعمالنا في السرد عالي التأثير، الذي يمزج الفن السينمائي بأحدث التقنيات البصرية لعلامات عالمية.')}
        </p>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 py-8 sticky top-[60px] z-30" style={{ background: 'rgb(var(--bg-rgb) /0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgb(var(--fg-rgb) / 0.06)' }}>
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`flex-shrink-0 px-5 py-2 text-xs tracking-widest uppercase font-medium transition-all duration-200 border ${
                active === cat
                  ? 'bg-brand-red text-white border-brand-red'
                  : 'text-brand-gray border-white/10 hover:border-white/30 hover:text-white'
              }`}
            >
              {t(cat, categoriesAr[cat] || cat)}
            </button>
          ))}
        </div>
      </section>

      {/* Video Grid */}
      <section className="px-4 sm:px-6 py-12 max-w-7xl mx-auto">
        {/* Stats bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs text-brand-gray">
            {t(<>Showing <span className="text-white font-medium">{filtered.length}</span> of {videos.length} projects</>,
               <>عرض <span className="text-white font-medium">{filtered.length}</span> من {videos.length} مشروع</>)}
          </p>
          <div className="flex items-center gap-1 text-brand-gray text-xs">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            {t('Grid View', 'عرض شبكي')}
          </div>
        </div>

        <div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-opacity duration-300"
          style={{ opacity: visible ? 1 : 0 }}
        >
          {filtered.map((video, i) => (
            <div
              key={video.id}
              style={{ transitionDelay: `${i * 60}ms`, transform: visible ? 'translateY(0)' : 'translateY(20px)', opacity: visible ? 1 : 0, transition: 'all 0.4s ease' }}
            >
              <VideoCard video={video} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24 text-brand-gray">
            <p className="text-4xl mb-3">📽</p>
            <p>{t('No projects in this category yet.', 'لا توجد مشاريع في هذه الفئة بعد.')}</p>
          </div>
        )}
      </section>

      {/* Director's Cut */}
      <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: 'rgb(var(--bg2-rgb))', borderTop: '1px solid rgb(var(--fg-rgb) / 0.06)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-10">
            <div>
              <p className="text-brand-red text-[10px] tracking-[0.4em] uppercase mb-2">{t('Behind the Scenes', 'خلف الكواليس')}</p>
              <h2 className="font-bebas text-4xl text-white">{t("DIRECTOR'S CUT", 'نسخة المخرج')}</h2>
            </div>
            <span className="hidden sm:block text-xs text-brand-gray uppercase tracking-widest">{t('Extended Reels →', 'أعمال موسّعة →')}</span>
          </div>

          {/* Horizontal scroll row */}
          <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollSnapType: 'x mandatory' }}>
            {videos.slice(0, 5).map(v => (
              <div
                key={v.id}
                className="flex-shrink-0 w-64 sm:w-72 group cursor-pointer relative overflow-hidden border border-white/6 rounded-2xl"
                style={{ scrollSnapAlign: 'start', background: 'rgb(var(--surface2-rgb))' }}
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={thumbUrl(v)}
                    alt={v.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={e => { e.target.src = `https://picsum.photos/seed/${v.id + 10}/320/180` }}
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 rounded-full border border-white/60 flex items-center justify-center group-hover:border-brand-red group-hover:bg-brand-red/20 transition-all">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="ml-0.5">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                  {v.duration && <span className="absolute top-2 right-2 text-[9px] font-mono text-white/70 bg-black/60 px-1.5 py-0.5" style={{ ['--fg-rgb']: '255 255 255' }}>{v.duration}</span>}
                </div>
                <div className="p-3">
                  {v.tag && <p className="text-[9px] text-brand-red uppercase tracking-widest mb-1">{v.tag}</p>}
                  {v.views && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A0A0A0" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      <span className="text-[10px] text-brand-gray">{v.views}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 sm:py-20 px-4 text-center">
        <h2 className="font-bebas text-5xl text-white mb-4">
          {t(<>READY TO <span className="text-brand-red">COLLABORATE?</span></>, <>جاهز <span className="text-brand-red">للتعاون؟</span></>)}
        </h2>
        <p className="text-brand-gray mb-8 max-w-md mx-auto text-sm">{t("Let's build something that demands attention.", 'لنصنع شيئًا يفرض الانتباه.')}</p>
        <a href="/contact" className="btn-primary inline-block px-10">{t('Book a Call', 'احجز مكالمة')}</a>
      </section>
    </div>
  )
}
