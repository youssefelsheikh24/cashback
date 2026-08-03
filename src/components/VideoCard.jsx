import { useState } from 'react'
import VideoModal from './VideoModal'
import { thumbUrl } from '../data/projects'

export default function VideoCard({ video, large = false }) {
  const [open, setOpen] = useState(false)
  const thumb = thumbUrl(video)

  return (
    <>
      <div
        className={`group relative cursor-pointer card-hover border border-white/6 overflow-hidden rounded-2xl ${large ? 'col-span-2 row-span-2' : ''}`}
        style={{ background: 'rgb(var(--surface2-rgb))' }}
        onClick={() => setOpen(true)}
      >
        {/* Thumbnail */}
        <div className={`relative overflow-hidden ${large ? 'aspect-video' : 'aspect-video'}`}>
          <img
            src={thumb}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            loading="lazy"
            onError={e => { e.target.onerror = null; e.target.src = `https://picsum.photos/seed/${video.id}/800/450` }}
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-300" />

          {/* Category badge */}
          {video.tag && (
            <span className="absolute top-3 left-3 text-[9px] font-semibold tracking-widest uppercase px-2 py-1 bg-brand-red text-white rounded-full">
              {video.tag}
            </span>
          )}

          {/* Duration */}
          {video.duration && (
            <span className="absolute top-3 right-3 text-[10px] font-mono text-white/80 bg-black/60 px-2 py-0.5 rounded-full" style={{ ['--fg-rgb']: '255 255 255' }}>
              {video.duration}
            </span>
          )}

          {/* Play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full border-2 border-white/80 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:border-brand-red group-hover:bg-brand-red/20">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </div>
          </div>
        </div>

        {/* Info */}
        {(video.description || video.client || video.views || video.year) && (
          <div className="p-4">
            {video.description && <p className="text-[11px] text-brand-gray mb-3 line-clamp-2">{video.description}</p>}
            {(video.client || video.views || video.year) && (
              <div className="flex items-center justify-between">
                <span className="text-[10px] text-brand-gray uppercase tracking-wider">{video.client}</span>
                <div className="flex items-center gap-3">
                  {video.views && (
                    <span className="flex items-center gap-1 text-[10px] text-brand-gray">
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                      {video.views}
                    </span>
                  )}
                  <span className="text-[10px] text-brand-gray">{video.year}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom red line on hover */}
        <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-brand-red group-hover:w-full transition-all duration-500" />
      </div>

      {open && <VideoModal video={video} onClose={() => setOpen(false)} />}
    </>
  )
}
