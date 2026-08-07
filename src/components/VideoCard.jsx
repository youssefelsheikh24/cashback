import { useState } from 'react'
import VideoModal from './VideoModal'
import { categoriesAr } from '../data/projects'
import { useLang } from '../i18n/LanguageContext'
import { useVideoThumbnail } from '../hooks/useVideoThumbnail'

export default function VideoCard({ video, large = false }) {
  const { t } = useLang()
  const [open, setOpen] = useState(false)
  const { thumb, handleImageError } = useVideoThumbnail(video)
  const badgeText = video.tag ? (categoriesAr[video.tag] ? t(video.tag, categoriesAr[video.tag]) : video.tag) : null

  return (
    <>
      <div
        className={`group relative cursor-pointer card-hover border border-white/10 overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-brand-red/10 transition-all duration-300 ${large ? 'col-span-2 row-span-2' : ''}`}
        style={{ background: 'rgb(var(--surface2-rgb))' }}
        onClick={() => setOpen(true)}
      >
        {/* Thumbnail / Video Preview */}
        <div className={`relative overflow-hidden aspect-video`}>
          {video.src ? (
            <video
              src={`${video.src}#t=1`}
              preload="metadata"
              playsInline
              muted
              className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-105 pointer-events-none"
            />
          ) : (
            <img
              src={thumb}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out md:group-hover:scale-105"
              loading="lazy"
              onError={handleImageError}
            />
          )}
          {/* Subtle dark overlay */}
          <div className="absolute inset-0 bg-black/30 md:bg-black/20 md:group-hover:bg-black/50 transition-colors duration-300" />



          {/* Duration */}
          {video.duration && (
            <span className="absolute top-3 right-3 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded-full" style={{ ['--fg-rgb']: '255 255 255' }}>
              {video.duration}
            </span>
          )}

          {/* Centered Play button overlay */}
          {/* On Desktop: Fades in on hover; On Mobile: Large centered play button always visible */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 border-white/90 bg-black/50 backdrop-blur-md flex items-center justify-center text-white shadow-xl shadow-black/40 md:opacity-0 md:group-hover:opacity-100 md:scale-90 md:group-hover:scale-100 group-hover:border-brand-red group-hover:bg-brand-red/80 transition-all duration-300 ease-out">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="ml-1 text-white">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        {(video.title || video.description || video.client || video.views || video.year) && (
          <div className="p-4">
            {video.title && <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-brand-red transition-colors line-clamp-1">{video.title}</h3>}
            {video.description && <p className="text-[11px] text-brand-gray mb-3 line-clamp-2">{video.description}</p>}
            {(video.client || video.views || video.year) && (
              <div className="flex items-center justify-between pt-1 border-t border-white/5">
                <span className="text-[10px] text-brand-gray uppercase tracking-wider font-medium">{video.client}</span>
                <div className="flex items-center gap-3">
                  {video.views && (
                    <span className="flex items-center gap-1 text-[10px] text-brand-gray">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      {video.views}
                    </span>
                  )}
                  {video.year && <span className="text-[10px] text-brand-gray">{video.year}</span>}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom red line accent on hover */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-red group-hover:w-full transition-all duration-500" />
      </div>

      {open && <VideoModal video={video} onClose={() => setOpen(false)} />}
    </>
  )
}

