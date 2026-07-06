import { useState } from 'react'
import { embedUrl, thumbUrl } from '../data/projects'

// Shared video frame used by the modal and the Home featured reel.
// - Shows a loading state (thumbnail + spinner) until the player is ready,
//   because Drive-hosted videos can take a moment to open.
// - Starts MUTED so it never blasts audio; the viewer unmutes with the
//   player's own controls (native <video> controls, or the Drive player).
export default function VideoPlayer({ video, loop = true, rounded = true }) {
  const [loading, setLoading] = useState(true)
  const thumb = thumbUrl(video)

  return (
    <div className="video-ratio" style={rounded ? undefined : { borderRadius: 0 }}>
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black">
          {thumb && (
            <img
              src={thumb}
              alt=""
              className="absolute inset-0 w-full h-full object-cover opacity-25"
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          )}
          <div className="relative w-10 h-10 rounded-full border-2 border-white/20 border-t-brand-red animate-spin" />
          <p className="relative text-[10px] uppercase tracking-[0.3em] text-white/70">
            Loading video…
          </p>
        </div>
      )}

      {video.src ? (
        <video
          src={video.src}
          poster={video.poster}
          autoPlay
          muted
          loop={loop}
          playsInline
          controls
          onLoadedData={() => setLoading(false)}
        />
      ) : (
        <iframe
          src={embedUrl(video, { mute: true, loop })}
          title={video.title || 'Video'}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          onLoad={() => setLoading(false)}
        />
      )}
    </div>
  )
}
