import { createContext, useContext, useEffect, useState } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(
    () => (typeof localStorage !== 'undefined' && localStorage.getItem('lang')) || 'en'
  )

  useEffect(() => {
    const isAr = lang === 'ar'
    document.documentElement.lang = lang
    document.documentElement.dir = isAr ? 'rtl' : 'ltr'
    document.documentElement.classList.toggle('rtl', isAr)
    localStorage.setItem('lang', lang)
  }, [lang])

  const toggle = () => setLang(l => (l === 'ar' ? 'en' : 'ar'))
  // t('English text', 'النص العربي') — returns the active language string.
  const t = (en, ar) => (lang === 'ar' ? ar : en)

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLang must be used within LanguageProvider')
  return ctx
}
