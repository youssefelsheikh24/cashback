import { useState } from 'react'
import 'vidstack/styles/defaults.css'
import 'vidstack/styles/community-skin/video.css'
import { MediaPlayer, MediaOutlet, MediaCommunitySkin } from '@vidstack/react'
import { embedUrl, thumbUrl } from '../data/projects'

export default function VideoPlayer({
  src,
  video,
  title,
  poster,
  autoPlay = false,
  muted = false,
  loop = true,
  playsInline = true,
  controls = true,
  className = '',
  rounded = true,
}) {
  const [loading, setLoading] = useState(true)

  const resolvedSrc = src || video?.src
  const resolvedTitle = title || video?.title || 'Video'
  const resolvedPoster = poster || video?.poster || (video ? thumbUrl(video) : undefined)

  // Drive fallback for videos with embed URLs instead of direct MP4 sources
  if (!resolvedSrc && video) {
    return (
      <div className={`video-ratio overflow-hidden ${className}`} style={rounded ? undefined : { borderRadius: 0 }}>
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-black">
            {resolvedPoster && (
              <img
                src={resolvedPoster}
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
        <iframe
          src={embedUrl(video, { mute: muted, loop })}
          title={resolvedTitle}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          onLoad={() => setLoading(false)}
        />
      </div>
    )
  }

  const handlePlay = (e) => {
    if (!muted) {
      const currentMediaElement = e?.target
      document.querySelectorAll('video').forEach(v => {
        if (v !== currentMediaElement && !v.muted && !v.paused) {
          v.pause()
        }
      })
      document.querySelectorAll('iframe').forEach(iframe => {
        try {
          const iframeSrc = iframe.src
          if (iframeSrc && (iframeSrc.includes('drive.google.com') || iframeSrc.includes('youtube.com'))) {
            if (!iframe.contains(currentMediaElement)) {
              iframe.src = iframeSrc
            }
          }
        } catch (err) {}
      })
    }
  }

  // Background / Ambient player without controls overlay
  if (!controls) {
    return (
      <MediaPlayer
        src={resolvedSrc}
        title={resolvedTitle}
        autoplay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        onPlay={handlePlay}
        load="visible"
        className={`absolute inset-0 w-full h-full object-cover overflow-hidden ${className}`}
      >
        <MediaOutlet />
      </MediaPlayer>
    )
  }

  // Vidstack Player with Default Community Skin & Controls
  return (
    <div className={`video-ratio overflow-hidden ${className}`} style={rounded ? undefined : { borderRadius: 0 }}>
      <MediaPlayer
        src={resolvedSrc}
        title={resolvedTitle}
        poster={resolvedPoster}
        autoplay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        onPlay={handlePlay}
        load="visible"
        className="absolute inset-0 w-full h-full overflow-hidden"
      >
        <MediaOutlet />
        <MediaCommunitySkin />
      </MediaPlayer>
    </div>
  )
}
