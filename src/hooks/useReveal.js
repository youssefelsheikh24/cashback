import { useEffect, useRef } from 'react'

export default function useReveal(threshold = 0.15) {
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold }
    )

    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('.reveal')
    targets.forEach(targetEl => observer.observe(targetEl))
    if (el.classList.contains('reveal')) observer.observe(el)

    return () => observer.disconnect()
  }, [threshold])

  return ref
}
