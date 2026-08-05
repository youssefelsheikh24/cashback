import { useEffect, useState } from 'react'
import VideoPlayer from './VideoPlayer'
import { useLang } from '../i18n/LanguageContext'
import { categoriesAr } from '../data/projects'

export default function VideoModal({ video, onClose }) {
  const { t } = useLang()
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    // Trigger scale/fade-in transition on mount
    const timer = requestAnimationFrame(() => setAnimate(true))
    document.body.style.overflow = 'hidden'

    const onKey = e => {
      if (e.key === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(timer)
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [])

  const handleClose = () => {
    setAnimate(false)
    setTimeout(onClose, 200)
  }

  const categoryLabel = video?.category ? t(video.category, categoriesAr[video.category] || video.category) : video?.tag

  return (
    <div
      className={`fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 transition-all duration-300 ${
        animate ? 'bg-black/85 backdrop-blur-xl opacity-100' : 'bg-black/0 backdrop-blur-none opacity-0'
      }`}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-5xl bg-surface2 border border-white/10 rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/90 overflow-hidden transform transition-all duration-300 ${
          animate ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header bar */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-black/40 backdrop-blur-md">
          <div className="flex items-center gap-3 pr-8 rtl:pr-0 rtl:pl-8">
            {categoryLabel && (
              <span className="text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 bg-brand-red text-white rounded-full">
                {categoryLabel}
              </span>
            )}
            <h3 className="text-sm sm:text-base font-bold text-white tracking-wide truncate max-w-xs sm:max-w-md">
              {video?.title || t('Project Video', 'فيديو المشروع')}
            </h3>
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            aria-label="Close modal"
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-brand-red text-white flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 flex-shrink-0"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Video Player Container (Lazy loaded on modal open, autoplay enabled) */}
        <div className="relative bg-black aspect-video w-full">
          <VideoPlayer video={video} autoPlay={true} loop={false} rounded={false} />
        </div>

        {/* Meta details footer */}
        {(video?.description || video?.client || video?.views || video?.duration || video?.year) && (
          <div className="p-5 sm:p-6 bg-surface/50 backdrop-blur-sm border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="max-w-xl">
              {video?.client && <p className="text-[10px] font-semibold tracking-widest text-brand-red uppercase mb-1">{video.client}</p>}
              {video?.description && <p className="text-xs sm:text-sm text-brand-gray leading-relaxed">{video.description}</p>}
            </div>

            {(video?.views || video?.duration || video?.year) && (
              <div className="flex gap-6 text-center flex-shrink-0 items-center justify-end border-t sm:border-t-0 border-white/5 pt-3 sm:pt-0">
                {video?.views && (
                  <div>
                    <p className="font-bebas text-xl sm:text-2xl text-brand-red">{video.views}</p>
                    <p className="text-[9px] text-brand-gray uppercase tracking-wider">{t('Views', 'مشاهدة')}</p>
                  </div>
                )}
                {video?.duration && (
                  <div>
                    <p className="font-bebas text-xl sm:text-2xl text-white">{video.duration}</p>
                    <p className="text-[9px] text-brand-gray uppercase tracking-wider">{t('Duration', 'المدة')}</p>
                  </div>
                )}
                {video?.year && (
                  <div>
                    <p className="font-bebas text-xl sm:text-2xl text-white">{video.year}</p>
                    <p className="text-[9px] text-brand-gray uppercase tracking-wider">{t('Year', 'السنة')}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

