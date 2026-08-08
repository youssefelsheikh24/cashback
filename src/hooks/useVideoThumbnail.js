import { thumbUrl } from '../data/projects'

/**
 * DEPRECATED: Runtime video frame extraction has been replaced by pre-generated static thumbnails.
 * Cards now consume `video.poster` directly via native <img> tags with 0 offscreen video tags and 0 MP4 requests.
 */
export function useVideoThumbnail(video) {
  const thumb = video ? (video.poster || thumbUrl(video)) : ''
  return { targetRef: null, thumb, isVisible: true, handleImageError: () => {} }
}



