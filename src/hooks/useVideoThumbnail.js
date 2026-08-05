import { useState, useEffect } from 'react'
import { thumbUrl } from '../data/projects'

// Global cache for dynamically generated frame data URLs
const thumbnailCache = new Map()

export function useVideoThumbnail(video) {
  const defaultThumb = video ? thumbUrl(video) : ''
  const [thumb, setThumb] = useState(() => {
    if (!video) return ''
    const key = video.id || video.src
    return thumbnailCache.get(key) || defaultThumb
  })

  useEffect(() => {
    if (!video) return

    const key = video.id || video.src
    if (thumbnailCache.has(key)) {
      setThumb(thumbnailCache.get(key))
      return
    }

    // If static poster, driveId, or youtubeId is present, standard thumbUrl is high quality
    if (video.poster || video.driveId || video.youtubeId) {
      setThumb(thumbUrl(video))
      return
    }

    // If direct MP4 src is available without static poster, dynamically extract first frame
    if (video.src) {
      let isMounted = true
      const vid = document.createElement('video')
      vid.crossOrigin = 'anonymous'
      vid.muted = true
      vid.playsInline = true
      vid.preload = 'metadata'
      vid.src = video.src

      const captureFrame = () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = vid.videoWidth || 640
          canvas.height = vid.videoHeight || 360
          const ctx = canvas.getContext('2d')
          ctx.drawImage(vid, 0, 0, canvas.width, canvas.height)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85)

          thumbnailCache.set(key, dataUrl)
          if (isMounted) {
            setThumb(dataUrl)
          }
        } catch (e) {
          // If CORS prevents canvas extraction, fallback gracefully
          if (isMounted) {
            setThumb(thumbUrl(video))
          }
        } finally {
          vid.remove()
        }
      }

      vid.addEventListener('loadeddata', () => {
        vid.currentTime = 0.5
      })

      vid.addEventListener('seeked', captureFrame)

      vid.addEventListener('error', () => {
        if (isMounted) {
          setThumb(thumbUrl(video))
        }
        vid.remove()
      })

      return () => {
        isMounted = false
        vid.remove()
      }
    }
  }, [video])

  const handleImageError = () => {
    if (video?.src && !thumbnailCache.has(video.id || video.src)) {
      // Try generating frame if static image failed
      const vid = document.createElement('video')
      vid.crossOrigin = 'anonymous'
      vid.muted = true
      vid.playsInline = true
      vid.preload = 'metadata'
      vid.src = video.src
      vid.addEventListener('loadeddata', () => { vid.currentTime = 0.5 })
      vid.addEventListener('seeked', () => {
        try {
          const canvas = document.createElement('canvas')
          canvas.width = vid.videoWidth || 640
          canvas.height = vid.videoHeight || 360
          const ctx = canvas.getContext('2d')
          ctx.drawImage(vid, 0, 0, canvas.width, canvas.height)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
          thumbnailCache.set(video.id || video.src, dataUrl)
          setThumb(dataUrl)
        } catch (err) {
          setThumb(`https://picsum.photos/seed/${video?.id || 1}/800/450`)
        } finally {
          vid.remove()
        }
      })
      vid.addEventListener('error', () => {
        setThumb(`https://picsum.photos/seed/${video?.id || 1}/800/450`)
        vid.remove()
      })
    } else {
      setThumb(`https://picsum.photos/seed/${video?.id || 1}/800/450`)
    }
  }

  return { thumb, handleImageError }
}
