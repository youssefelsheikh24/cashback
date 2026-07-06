import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

const posts = [
  { id:1, cat:'BTS', date:'OCT 24, 2024',
    title:'The Anatomy of a Global Campaign: Shooting in Volumetric Space', titleAr:'تشريح حملة عالمية: التصوير في الفضاء الحجمي',
    desc:'Discover how we leveraged state-of-the-art LED volume technology to transport a luxury automotive brand across three continents in a single day of shooting.', descAr:'اكتشف كيف استخدمنا أحدث تقنية شاشات LED الحجمية لنقل علامة سيارات فاخرة عبر ثلاث قارات في يوم تصوير واحد.',
    img:'https://picsum.photos/seed/blog1/800/450', featured: true },
  { id:2, cat:'TECH', date:'OCT 18, 2024',
    title:'Mastering the Shadows: Low-Light Cinematography', titleAr:'إتقان الظلال: التصوير في الإضاءة المنخفضة',
    desc:'Pushing sensors to their limits. A technical breakdown of our approach to maintaining pristine image quality in extreme low-light conditions.', descAr:'دفع المستشعرات إلى أقصى حدودها. تحليل تقني لنهجنا في الحفاظ على جودة صورة نقية في ظروف الإضاءة المنخفضة القصوى.',
    img:'https://picsum.photos/seed/blog2/600/400' },
  { id:3, cat:'MARKETING', date:'SEP 30, 2024',
    title:'ROI in the Age of Attention Deficit', titleAr:'العائد على الاستثمار في عصر تشتّت الانتباه',
    desc:'Why high-production value still matters in an era of ephemeral content, and how to structure campaigns for maximum narrative impact.', descAr:'لماذا تظل القيمة الإنتاجية العالية مهمة في عصر المحتوى العابر، وكيف تبني حملات لأقصى تأثير سردي.',
    img:'https://picsum.photos/seed/blog3/600/400' },
  { id:4, cat:'INDUSTRY', date:'SEP 15, 2024',
    title:'The Future of Post-Production Workflow', titleAr:'مستقبل سير عمل ما بعد الإنتاج',
    desc:'Integrating AI tools into the coloring suite without losing the human touch. A candid look at our evolving post pipeline.', descAr:'دمج أدوات الذكاء الاصطناعي في تصحيح الألوان دون فقدان اللمسة البشرية. نظرة صريحة على خط الإنتاج المتطور لدينا.',
    img:'https://picsum.photos/seed/blog4/600/400' },
]
const cats = [
  { en:'All Updates', ar:'كل التحديثات' },
  { en:'BTS', ar:'كواليس' },
  { en:'Marketing', ar:'تسويق' },
  { en:'Tech', ar:'تقنية' },
  { en:'Industry', ar:'الصناعة' },
]

export default function Blog() {
  const { t } = useLang()
  const [active, setActive] = useState('All Updates')
  const filtered = active === 'All Updates' ? posts : posts.filter(p => p.cat.toLowerCase() === active.toLowerCase())
  const featured = filtered.find(p => p.featured)
  const rest = filtered.filter(p => !p.featured)

  return (
    <div>
      <section className="pt-28 pb-14 sm:pt-36 sm:pb-20 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg,rgb(var(--surface-rgb)) 0%,rgb(var(--bg-rgb)) 100%)' }}>
        <div className="max-w-7xl mx-auto">
          <h1 className="font-bebas text-7xl sm:text-9xl leading-none mb-3">
            {t(<>INSIGHTS & <span className="text-brand-red">DISPATCHES</span></>, <>رؤى <span className="text-brand-red">ومقالات</span></>)}
          </h1>
          <p className="text-brand-gray text-sm max-w-lg leading-relaxed">
            {t('Behind-the-scenes deep dives, industry analysis, and creative perspectives from the bleeding edge of cinematic production.', 'غوص عميق في الكواليس، وتحليل للصناعة، ورؤى إبداعية من حافة الإنتاج السينمائي.')}
          </p>
        </div>
      </section>

      <section className="px-4 sm:px-6 py-6 border-b border-white/6">
        <div className="max-w-7xl mx-auto flex gap-2 overflow-x-auto">
          {cats.map(c => (
            <button
              key={c.en}
              onClick={() => setActive(c.en)}
              className={`flex-shrink-0 px-4 py-1.5 text-xs tracking-widest uppercase border transition-all duration-200 ${
                active === c.en ? 'bg-brand-red border-brand-red text-white' : 'border-white/15 text-brand-gray hover:text-white'
              }`}
            >
              {t(c.en, c.ar)}
            </button>
          ))}
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
        {featured && (
          <div className="group cursor-pointer border border-white/8 overflow-hidden mb-8 card-hover" style={{ background:'rgb(var(--surface-rgb))' }}>
            <div className="relative overflow-hidden" style={{ paddingBottom:'42%' }}>
              <img src={featured.img} alt={featured.title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 max-w-2xl" style={{ ['--fg-rgb']: '255 255 255' }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[9px] font-semibold tracking-widest px-2 py-1 bg-brand-red text-white uppercase">[{featured.cat}]</span>
                  <span className="text-[10px] text-white/50">{featured.date}</span>
                </div>
                <h2 className="font-bebas text-3xl sm:text-4xl text-white mb-2">{t(featured.title, featured.titleAr)}</h2>
                <p className="text-sm text-white/70 leading-relaxed mb-4">{t(featured.desc, featured.descAr)}</p>
                <span className="text-[10px] uppercase tracking-widest text-brand-red">{t('Read Article →', 'اقرأ المقال →')}</span>
              </div>
            </div>
          </div>
        )}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map(p => (
            <div key={p.id} className="group cursor-pointer border border-white/8 overflow-hidden card-hover" style={{ background:'rgb(var(--surface-rgb))' }}>
              <div className="overflow-hidden aspect-video">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[9px] font-semibold tracking-widest px-2 py-0.5 bg-brand-red/15 border border-brand-red/30 text-brand-red uppercase">[{p.cat}]</span>
                  <span className="text-[10px] text-brand-gray">{p.date}</span>
                </div>
                <h3 className="font-bebas text-xl text-white mb-2 leading-tight">{t(p.title, p.titleAr)}</h3>
                <p className="text-xs text-brand-gray leading-relaxed mb-4 line-clamp-2">{t(p.desc, p.descAr)}</p>
                <span className="text-[10px] uppercase tracking-widest text-white/40 hover:text-brand-red transition-colors">{t('Read →', 'اقرأ →')}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <button className="btn-ghost px-10">{t('Load More Articles', 'تحميل المزيد من المقالات')}</button>
          <p className="text-[10px] text-brand-gray mt-4 tracking-widest">{t(`Showing ${filtered.length} of 24`, `عرض ${filtered.length} من 24`)}</p>
        </div>
      </section>
    </div>
  )
}
