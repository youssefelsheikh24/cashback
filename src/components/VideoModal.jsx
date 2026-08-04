import { useEffect } from 'react'
import VideoPlayer from './VideoPlayer'

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(10px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-5xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute -top-10 right-0 text-white/60 hover:text-white text-sm tracking-widest uppercase flex items-center gap-2 transition-colors"
        >
          Close <span className="text-brand-red text-lg leading-none">✕</span>
        </button>

        {/* Video */}
        <VideoPlayer video={video} loop={false} />

        {/* Meta below video */}
        <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            {video.tag && (
              <span className="text-[9px] font-semibold tracking-widest uppercase px-2 py-1 bg-brand-red text-white mr-3">
                {video.tag}
              </span>
            )}
            {video.description && <p className="text-xs text-brand-gray mt-1">{video.description}</p>}
          </div>
          {(video.views || video.duration || video.year) && (
            <div className="flex gap-6 text-center flex-shrink-0">
              {video.views && (
                <div>
                  <p className="font-bebas text-2xl text-brand-red">{video.views}</p>
                  <p className="text-[10px] text-brand-gray uppercase tracking-wider">Views</p>
                </div>
              )}
              {video.duration && (
                <div>
                  <p className="font-bebas text-2xl text-white">{video.duration}</p>
                  <p className="text-[10px] text-brand-gray uppercase tracking-wider">Duration</p>
                </div>
              )}
              {video.year && (
                <div>
                  <p className="font-bebas text-2xl text-white">{video.year}</p>
                  <p className="text-[10px] text-brand-gray uppercase tracking-wider">Year</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
