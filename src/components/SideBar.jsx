import { socials, WHATSAPP_NUMBER, WhatsApp } from '../data/socials'

export default function SideBar() {
  return (
    <>
      {/* Left social bar — desktop only */}
      <div className="hidden xl:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-4">
        {socials.map(s => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            className="text-brand-gray hover:text-brand-red transition-colors duration-200 p-1"
          >
            <s.Icon className="w-4 h-4" />
          </a>
        ))}
        <div className="w-px h-16 bg-white/10 mt-2" />
      </div>

      {/* WhatsApp floating button */}
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-green-500 hover:bg-green-400 flex items-center justify-center rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label="WhatsApp"
      >
        <WhatsApp className="w-6 h-6 text-white" />
      </a>
    </>
  )
}
