import { Link } from 'react-router-dom'
import useReveal from '../hooks/useReveal'
import { useLang } from '../i18n/LanguageContext'

const cases = [
  {
    id: 1, tag: 'AUTOMOTIVE', title: 'PROJECT APEX',
    desc: 'Redefining the digital launch experience for the next generation of electric performance.',
    descAr: 'إعادة تعريف تجربة الإطلاق الرقمي للجيل القادم من الأداء الكهربائي.',
    before: '12K Reach', after: '1.2M+',
    img: 'https://picsum.photos/seed/apex/600/400',
  },
  {
    id: 2, tag: 'APPAREL', subtag: 'VFX', title: 'VELOCITY X',
    desc: 'A high-octane global campaign that captured the raw energy of urban running culture.',
    descAr: 'حملة عالمية عالية الطاقة التقطت الطاقة الخام لثقافة الجري في المدن.',
    before: '2.4%', after: '8.7%↑',
    img: 'https://picsum.photos/seed/velx/600/400',
  },
  {
    id: 3, tag: 'FINTECH', subtag: 'MOTION DESIGN', title: 'NEXUS BANK',
    desc: 'Translating complex financial ecosystems into compelling, accessible visual narratives.',
    descAr: 'تحويل المنظومات المالية المعقّدة إلى حكايات بصرية جذّابة وسهلة الفهم.',
    before: '45%', after: '82%↑',
    img: 'https://picsum.photos/seed/nexus/600/400',
  },
]

export default function CaseStudies() {
  const { t } = useLang()
  const revealRef = useReveal()
  return (
    <div>
      <section className="pt-36 pb-24 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg,rgb(var(--surface-rgb)) 0%,rgb(var(--bg-rgb)) 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <p className="text-brand-red text-[10px] tracking-[0.5em] uppercase mb-3">{t('Success Stories', 'قصص نجاح')}</p>
          <h1 className="font-bebas text-7xl sm:text-9xl text-white leading-none mb-6">
            {t(<>PROVEN <span className="text-brand-red">IMPACT</span></>, <>تأثير <span className="text-brand-red">مثبت</span></>)}
          </h1>
          <p className="text-brand-gray max-w-xl text-sm leading-relaxed">
            {t('Explore how our cinematic approach to digital storytelling has transformed brands, driven engagement, and redefined industry standards across global markets.', 'اكتشف كيف حوّل نهجنا السينمائي في السرد الرقمي العلامات التجارية، وزاد التفاعل، وأعاد تعريف معايير الصناعة في الأسواق العالمية.')}
          </p>
        </div>
      </section>

      <section ref={revealRef} className="py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {cases.map(c => (
            <div key={c.id} className="reveal card-hover border border-white/8 overflow-hidden group" style={{ background: 'rgb(var(--surface-rgb))' }}>
              <div className="relative overflow-hidden aspect-video">
                <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/30" />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="text-[9px] font-semibold tracking-widest uppercase px-2 py-1 bg-brand-red text-white">{c.tag}</span>
                  {c.subtag && <span className="text-[9px] font-semibold tracking-widest uppercase px-2 py-1 border border-white/30 text-white">{c.subtag}</span>}
                </div>
              </div>
              <div className="p-6">
                <h2 className="font-bebas text-2xl text-white mb-2">{c.title}</h2>
                <p className="text-xs text-brand-gray leading-relaxed mb-5">{t(c.desc, c.descAr)}</p>
                <div className="flex items-center gap-4 mb-5 pt-4 border-t border-white/6">
                  <div>
                    <p className="text-[10px] text-brand-gray uppercase tracking-wider mb-1">{t('Before', 'قبل')}</p>
                    <p className="font-bebas text-xl text-white/60">{c.before}</p>
                  </div>
                  <div className="text-brand-red text-xl">→</div>
                  <div>
                    <p className="text-[10px] text-brand-gray uppercase tracking-wider mb-1">{t('After', 'بعد')}</p>
                    <p className="font-bebas text-xl text-brand-red">{c.after}</p>
                  </div>
                </div>
                <button className="text-[10px] uppercase tracking-widest text-white/50 hover:text-brand-red transition-colors flex items-center gap-2">
                  {t('View Case Study', 'عرض دراسة الحالة')} <span>→</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 text-center">
        <Link to="/contact" className="btn-primary inline-block px-10">{t('Start Your Project', 'ابدأ مشروعك')}</Link>
      </section>
    </div>
  )
}
