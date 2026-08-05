import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { videos, categories, categoriesAr, thumbUrl } from '../data/projects'
import VideoCard from '../components/VideoCard'
import { useLang } from '../i18n/LanguageContext'

export default function Portfolio() {
  const { t } = useLang()
  const [active, setActive] = useState('All')
  const [filtered, setFiltered] = useState(videos)
  const [visible, setVisible] = useState(false)
  const headerRef = useRef(null)

  const filterRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const isDragging = useRef(false)
  const startX = useRef(0)
  const scrollLeftStart = useRef(0)

  const checkScroll = () => {
    if (!filterRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = filterRef.current
    const maxScroll = scrollWidth - clientWidth
    setCanScrollLeft(Math.abs(scrollLeft) > 5)
    setCanScrollRight(Math.abs(scrollLeft) < maxScroll - 5)
  }

  useEffect(() => {
    const container = filterRef.current
    if (!container) return

    const handleWheel = (e) => {
      if (e.deltaY !== 0) {
        e.preventDefault()
        container.scrollLeft += e.deltaY * 1.5
      }
    }

    container.addEventListener('wheel', handleWheel, { passive: false })
    container.addEventListener('scroll', checkScroll)
    window.addEventListener('resize', checkScroll)
    checkScroll()

    return () => {
      container.removeEventListener('wheel', handleWheel)
      container.removeEventListener('scroll', checkScroll)
      window.removeEventListener('resize', checkScroll)
    }
  }, [])

  const scroll = (direction) => {
    if (!filterRef.current) return
    const distance = 320
    const isRtl = document.documentElement.dir === 'rtl'
    const sign = isRtl ? -1 : 1
    const amount = direction === 'left' ? -distance * sign : distance * sign
    filterRef.current.scrollBy({ left: amount, behavior: 'smooth' })
  }

  const handleMouseDown = (e) => {
    isDragging.current = true
    startX.current = e.pageX - filterRef.current.offsetLeft
    scrollLeftStart.current = filterRef.current.scrollLeft
  }
  const handleMouseLeave = () => { isDragging.current = false }
  const handleMouseUp = () => { isDragging.current = false }
  const handleMouseMove = (e) => {
    if (!isDragging.current) return
    e.preventDefault()
    const x = e.pageX - filterRef.current.offsetLeft
    const walk = (x - startX.current) * 1.5
    filterRef.current.scrollLeft = scrollLeftStart.current - walk
  }

  const featuredAllCategories = [
    '🏢 Real Estate',
    '🎉 Grand Openings',
    '🚗 Automotive',
    '🍽️ Restaurants',
    '🩺 Medical Content'
  ]

  const handleSelectCategory = (cat) => {
    setActive(cat)
    setTimeout(() => {
      if (filterRef.current) {
        const activeBtn = filterRef.current.querySelector(`[data-cat="${cat}"]`)
        if (activeBtn) {
          activeBtn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
        }
      }
      const filterSection = document.getElementById('portfolio-filters')
      if (filterSection) {
        filterSection.scrollIntoView({ behavior: 'smooth' })
      }
    }, 50)
  }

  useEffect(() => {
    setVisible(false)
    const timer = setTimeout(() => {
      setFiltered(active === 'All' ? videos : videos.filter(v => v.category === active))
      setVisible(true)
    }, 150)
    return () => clearTimeout(timer)
  }, [active])

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
      <section id="portfolio-filters" className="px-4 sm:px-6 py-5 sticky top-[60px] z-30" style={{ background: 'rgb(var(--bg-rgb) /0.95)', backdropFilter: 'blur(16px)', borderBottom: '1px solid rgb(var(--fg-rgb) / 0.06)' }}>
        <div className="max-w-7xl mx-auto relative flex items-center group">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll('left')}
            className={`hidden sm:flex absolute left-0 z-10 w-9 h-9 rounded-full items-center justify-center bg-black/80 border border-white/20 text-white shadow-xl hover:bg-brand-red hover:border-brand-red transition-all duration-200 ${
              canScrollLeft ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll left"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          {/* Categories Container */}
          <div
            ref={filterRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className="flex gap-2 sm:gap-3 overflow-x-auto py-2 px-1 sm:px-10 scrollbar-hide items-center cursor-grab active:cursor-grabbing select-none"
            style={{ scrollBehavior: 'smooth' }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                data-cat={cat}
                onClick={() => handleSelectCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 border ${
                  active === cat
                    ? 'bg-brand-red text-white border-brand-red shadow-lg shadow-brand-red/20 scale-105'
                    : 'bg-white/5 text-brand-gray border-white/10 hover:border-white/30 hover:text-white'
                }`}
              >
                {t(cat, categoriesAr[cat] || cat)}
              </button>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll('right')}
            className={`hidden sm:flex absolute right-0 z-10 w-9 h-9 rounded-full items-center justify-center bg-black/80 border border-white/20 text-white shadow-xl hover:bg-brand-red hover:border-brand-red transition-all duration-200 ${
              canScrollRight ? 'opacity-100 cursor-pointer' : 'opacity-0 pointer-events-none'
            }`}
            aria-label="Scroll right"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </section>

      {/* Video Grid */}
      <section className="px-4 sm:px-6 py-12 max-w-7xl mx-auto">
        {/* Stats bar */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-xs text-brand-gray">
            {active === 'All' ? (
              t(
                <>Showing <span className="text-white font-medium">5 Featured Categories</span> (3 projects each)</>,
                <>عرض <span className="text-white font-medium">٥ فئات مختارة</span> (٣ مشاريع لكل فئة)</>
              )
            ) : (
              t(
                <>Showing <span className="text-white font-medium">{filtered.length}</span> projects in {t(active, categoriesAr[active] || active)}</>,
                <>عرض <span className="text-white font-medium">{filtered.length}</span> مشروع في {t(active, categoriesAr[active] || active)}</>
              )
            )}
          </p>
          <div className="flex items-center gap-1 text-brand-gray text-xs">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
            {t('Grid View', 'عرض شبكي')}
          </div>
        </div>

        <div className="transition-opacity duration-300" style={{ opacity: visible ? 1 : 0 }}>
          {active === 'All' ? (
            <div className="space-y-16">
              {featuredAllCategories.map(cat => {
                const catVids = videos.filter(v => v.category === cat).slice(0, 3)
                if (catVids.length === 0) return null
                return (
                  <div key={cat} className="border-b border-white/6 pb-12 last:border-b-0 last:pb-0">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-6 bg-brand-red rounded-full" />
                        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-wide">
                          {t(cat, categoriesAr[cat] || cat)}
                        </h2>
                      </div>
                      <button
                        onClick={() => handleSelectCategory(cat)}
                        className="flex items-center gap-2 text-xs font-semibold text-brand-red hover:text-white px-4 py-2 rounded-full border border-brand-red/30 hover:border-brand-red hover:bg-brand-red transition-all duration-300 group cursor-pointer"
                      >
                        <span>{t('See More', 'عرض المزيد')}</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {catVids.map(video => (
                        <VideoCard key={video.id} video={video} />
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            </div>
          )}
        </div>
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
                className="flex-shrink-0 w-64 sm:w-72"
                style={{ scrollSnapAlign: 'start' }}
              >
                <VideoCard video={v} />
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
        <Link to="/contact" className="btn-primary inline-block px-10">{t('Book a Call', 'احجز مكالمة')}</Link>
      </section>
    </div>
  )
}
