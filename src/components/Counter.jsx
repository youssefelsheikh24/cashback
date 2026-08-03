import { useEffect, useRef, useState } from 'react'

export default function Counter({ target, suffix = '', className = 'font-bebas text-5xl sm:text-6xl text-brand-red' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    let timerId = null

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          let current = 0
          const duration = 2000
          const step = target / (duration / 16)
          timerId = setInterval(() => {
            current = Math.min(current + step, target)
            setCount(Math.floor(current))
            if (current >= target && timerId) {
              clearInterval(timerId)
              timerId = null
            }
          }, 16)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) obs.observe(ref.current)

    return () => {
      obs.disconnect()
      if (timerId) {
        clearInterval(timerId)
      }
    }
  }, [target])

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  )
}
