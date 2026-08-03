import { clientLogos } from '../data/clients'

export default function ClientMarquee() {
  return (
    <section
      style={{
        borderTop: '1px solid rgb(var(--fg-rgb) / 0.06)',
        borderBottom: '1px solid rgb(var(--fg-rgb) / 0.06)',
        background: 'rgb(var(--bg2-rgb))',
      }}
      className="py-4 overflow-hidden"
    >
      <div className="flex items-center gap-5 animate-marquee whitespace-nowrap" style={{ width: 'max-content' }}>
        {[...clientLogos, ...clientLogos].map((c, i) => (
          <div
            key={i}
            className="shrink-0 flex items-center justify-center rounded-2xl h-20 px-6 overflow-hidden"
            style={{ backgroundColor: c.bg }}
          >
            <img src={c.src} alt="" loading="lazy" className="max-h-14 w-auto object-contain" />
          </div>
        ))}
      </div>
    </section>
  )
}
