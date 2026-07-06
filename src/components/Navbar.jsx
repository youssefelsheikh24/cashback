import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

const links = [
  { en: 'Home', ar: 'الرئيسية', to: '/' },
  { en: 'Services', ar: 'الخدمات', to: '/services' },
  { en: 'Portfolio', ar: 'الأعمال', to: '/portfolio' },
  { en: 'Team', ar: 'الفريق', to: '/team' },
  { en: 'Contact', ar: 'تواصل', to: '/contact' },
]

export default function Navbar() {
  const { lang, toggle, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [theme, setTheme] = useState(
    () => (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) || 'dark'
  )
  const { pathname } = useLocation()
  const isStudio = pathname === '/studio'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  // Apply theme to <html> and persist
  useEffect(() => {
    document.documentElement.classList.toggle('light', theme === 'light')
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => setTheme(t => (t === 'light' ? 'dark' : 'light'))

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      {/* Top location strip — sits above the navbar */}
      <div className="w-full border-b border-white/10" style={{ background: 'rgb(var(--bg-rgb) / 0.9)' }}>
        <p className="max-w-7xl mx-auto px-4 sm:px-6 py-1.5 text-center text-brand-red text-[10px] sm:text-xs tracking-[0.3em] uppercase font-medium">
          {t('Creative Studio · Fayoum & Cairo, Egypt', 'استوديو إبداعي · الفيوم والقاهرة، مصر')}
        </p>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between transition-all duration-300 ${scrolled ? 'py-3' : 'py-5'}`}>
        {/* Logo — swaps to the Studio logo while on the /studio page */}
        <Link to="/" className="flex items-center group">
          {isStudio ? (
            // Sized so the "CashBack" caps match the main logo, inside a full-height
            // container so the navbar bar height stays identical to other pages.
            <span className="flex items-center h-16">
              <img
                src="/cashstudio-white.png"
                alt="CashBack Studio"
                className="logo-dark h-11 w-auto object-contain"
              />
              <img
                src="/cashstudio.png"
                alt="CashBack Studio"
                className="logo-light h-11 w-auto object-contain"
              />
            </span>
          ) : (
            <>
              <img
                src="/logo-white.png"
                alt="CashBack Advertising Agency"
                className="logo-dark h-16 w-auto object-contain"
              />
              <img
                src="/logo.png"
                alt="CashBack Advertising Agency"
                className="logo-light h-16 w-auto object-contain"
              />
            </>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {links.map(({ en, ar, to }) => (
            <Link
              key={to}
              to={to}
              className={`text-xs font-medium tracking-widest uppercase transition-colors duration-200 pb-0.5 border-b-2 ${
                pathname === to
                  ? 'text-white border-brand-red'
                  : 'text-brand-gray hover:text-white border-transparent hover:border-brand-red/50'
              }`}
            >
              {t(en, ar)}
            </Link>
          ))}
        </nav>

        {/* CTA + Hamburger */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Language toggle */}
          <button
            onClick={toggle}
            aria-label="Switch language"
            className="h-9 px-3 rounded-full border border-white/15 flex items-center justify-center text-[11px] font-bold tracking-wider text-white hover:text-brand-red hover:border-brand-red transition-colors duration-200"
          >
            {lang === 'ar' ? 'EN' : 'ع'}
          </button>
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle light/dark mode"
            className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white hover:text-brand-red hover:border-brand-red transition-colors duration-200"
          >
            {theme === 'light' ? (
              // Moon (click to go dark)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              // Sun (click to go light)
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            )}
          </button>
          <Link to="/contact" className="hidden sm:block btn-primary text-xs">
            {t('Book Appointment', 'احجز موعد')}
          </Link>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col gap-1.5 p-2"
            aria-label="Toggle menu"
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ background: 'rgb(var(--bg-rgb) / 0.97)', backdropFilter: 'blur(20px)' }}
      >
        <nav className="flex flex-col px-6 py-6 gap-1">
          {links.map(({ en, ar, to }) => (
            <Link
              key={to}
              to={to}
              className={`py-3 text-sm font-medium tracking-widest uppercase border-b border-white/5 transition-colors duration-200 ${
                pathname === to ? 'text-brand-red' : 'text-brand-gray hover:text-white'
              }`}
            >
              {t(en, ar)}
            </Link>
          ))}

          <Link to="/contact" className="btn-primary text-center mt-4">
            {t('Book Appointment', 'احجز موعد')}
          </Link>
        </nav>
      </div>
    </header>
  )
}
