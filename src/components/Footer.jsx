import { Link, useLocation } from 'react-router-dom'
import { socials } from '../data/socials'
import { useLang } from '../i18n/LanguageContext'

const navCol = [
  { en: 'Navigation', ar: 'التنقل', links: [
    { en: 'Home', ar: 'الرئيسية', to: '/' },
    { en: 'Services', ar: 'الخدمات', to: '/services' },
    { en: 'Portfolio', ar: 'الأعمال', to: '/portfolio' },
  ]},
  { en: 'Work', ar: 'أعمالنا', links: [
    { en: 'Team', ar: 'الفريق', to: '/team' },
    { en: 'Blog', ar: 'المدونة', to: '/blog' },
  ]},
  { en: 'Connect', ar: 'تواصل', links: [
    { en: 'Contact', ar: 'اتصل بنا', to: '/contact' },
    { en: 'Book Appointment', ar: 'احجز موعد', to: '/contact' },
  ]},
  { en: 'Legal', ar: 'قانوني', links: [
    { en: 'Privacy Policy', ar: 'سياسة الخصوصية', to: '/privacy' },
    { en: 'Terms of Service', ar: 'شروط الخدمة', to: '/terms' },
  ]},
]

export default function Footer() {
  const { t } = useLang()
  const isStudio = useLocation().pathname === '/studio'
  return (
    <footer style={{ background: 'rgb(var(--bg3-rgb))', borderTop: '1px solid rgb(var(--fg-rgb) / 0.06)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <Link to="/" className="inline-flex items-center mb-4">
              {isStudio ? (
                // Caps sized to match the main footer logo, in a full-height container.
                <span className="flex items-center h-20">
                  <img
                    src="/cashstudio-white.png"
                    alt="CashBack"
                    className="logo-dark h-14 w-auto object-contain"
                  />
                  <img
                    src="/cashstudio.png"
                    alt="CashBack"
                    className="logo-light h-14 w-auto object-contain"
                  />
                </span>
              ) : (
                <>
                  <img
                    src="/logo-white.png"
                    alt="CashBack Advertising Agency"
                    className="logo-dark h-20 w-auto object-contain"
                  />
                  <img
                    src="/logo.png"
                    alt="CashBack Advertising Agency"
                    className="logo-light h-20 w-auto object-contain"
                  />
                </>
              )}
            </Link>
            <p className="text-xs text-brand-gray leading-relaxed">
              {t('Forging visual narratives with uncompromising precision and cinematic scale.', 'نصنع حكايات بصرية بدقّة لا تقبل المساومة وبمقياس سينمائي.')}
            </p>
            <div className="flex gap-3 mt-5">
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-brand-gray hover:border-brand-red hover:text-brand-red transition-colors duration-200">
                  <s.Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {navCol.map(col => (
            <div key={col.en}>
              <h4 className="text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-gray mb-4">
                {t(col.en, col.ar)}
              </h4>
              <ul className="flex flex-col gap-1">
                {col.links.map(l => (
                  <li key={l.en}>
                    <Link to={l.to} className="inline-block py-1 text-xs text-white/60 hover:text-white transition-colors duration-200">
                      {t(l.en, l.ar)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[10px] tracking-widest uppercase text-white/30">
            {t('© 2024 CashBack. All Rights Reserved.', '© 2024 كاش باك. جميع الحقوق محفوظة.')}
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-brand-red rounded-full animate-pulse" />
            <span className="text-[10px] text-white/30 tracking-widest uppercase">{t('Available for Projects', 'متاح للمشاريع')}</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
