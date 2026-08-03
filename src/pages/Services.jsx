import { Link } from 'react-router-dom'
import { stats } from '../data/projects'
import useReveal from '../hooks/useReveal'
import { useLang } from '../i18n/LanguageContext'
import Counter from '../components/Counter'

const departments = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="15" rx="2" ry="2"/>
        <polyline points="17 2 12 7 7 2"/>
      </svg>
    ),
    title: 'Production Studio', titleAr: 'استوديو الإنتاج',
    desc: 'Cinematic execution from concept to final render. We handle high-end commercial shoots, documentary-style storytelling, and complex VFX pipelines.',
    descAr: 'تنفيذ سينمائي من الفكرة حتى الإخراج النهائي. ننفّذ التصوير التجاري الراقي، والسرد الوثائقي، وخطوط المؤثرات البصرية المعقّدة.',
    services: ['Commercial Videography', 'Post-Production & VFX', 'Color Grading', 'Sound Design'],
    servicesAr: ['تصوير تجاري', 'مونتاج ومؤثرات بصرية', 'تصحيح الألوان', 'تصميم الصوت'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
      </svg>
    ),
    title: 'Marketing Lab', titleAr: 'مختبر التسويق',
    desc: 'Data-driven amplification. We distribute the narrative ensuring maximum impact across digital ecosystems through strategic placement and audience targeting.',
    descAr: 'تضخيم قائم على البيانات. نوزّع الرسالة لضمان أقصى تأثير عبر المنظومات الرقمية من خلال التموضع الاستراتيجي واستهداف الجمهور.',
    services: ['Campaign Strategy', 'Social Media Management', 'Performance Marketing', 'Analytics & Reporting'],
    servicesAr: ['استراتيجية الحملات', 'إدارة السوشيال ميديا', 'تسويق الأداء', 'التحليلات والتقارير'],
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10"/>
        <circle cx="12" cy="10" r="3"/>
        <path d="M7 20.662V19a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v1.662"/>
      </svg>
    ),
    title: 'Brand Identity', titleAr: 'الهوية البصرية',
    desc: 'Crafting the visual language. We build foundational aesthetic systems that resonate with prestige, ensuring your brand stands distinct in crowded markets.',
    descAr: 'صياغة اللغة البصرية. نبني أنظمة جمالية أساسية توحي بالرقيّ، لتظل علامتك متميزة في الأسواق المزدحمة.',
    services: ['Logo & System Design', 'Typography & Color Logic', 'Brand Guidelines', 'UI/UX Direction'],
    servicesAr: ['تصميم الشعار والنظام', 'منطق الخطوط والألوان', 'دليل الهوية', 'توجيه تجربة المستخدم'],
  },
]

const PROCESS = [
  { en: 'Discovery', ar: 'الاكتشاف', enD: 'Decoding the core truth of the brand. We dissect objectives, audiences, and market friction points to find the narrative pulse.', arD: 'فك شيفرة جوهر العلامة. نحلّل الأهداف والجماهير ونقاط الاحتكاك في السوق لإيجاد نبض الحكاية.' },
  { en: 'Strategy', ar: 'الاستراتيجية', enD: 'Architecting the visual language. Moodboards evolve into precise storyboards, shot lists, and logistical battle plans.', arD: 'هندسة اللغة البصرية. تتحول لوحات الإلهام إلى ستوري بورد دقيق وقوائم لقطات وخطط تنفيذ.' },
  { en: 'Production', ar: 'الإنتاج', enD: 'Execution with militaristic precision. High-end cinema cameras, complex lighting setups, and relentless direction on set.', arD: 'تنفيذ بدقّة صارمة. كاميرات سينما راقية، وإضاءة معقّدة، وإخراج لا يهدأ في موقع التصوير.' },
  { en: 'Review', ar: 'المراجعة', enD: 'Collaborative review cycles ensuring every frame serves the narrative before final delivery.', arD: 'دورات مراجعة تشاركية تضمن أن كل لقطة تخدم الحكاية قبل التسليم النهائي.' },
  { en: 'Launch', ar: 'الإطلاق', enD: 'Deploying the final cut. Formatting and encoding for all premium platforms, ensuring zero fidelity loss.', arD: 'إطلاق النسخة النهائية. تجهيز وترميز لكل المنصات بأعلى جودة دون أي فقد.' },
]

export default function Services() {
  const { t } = useLang()
  const revealRef = useReveal()

  return (
    <div>
      {/* Header */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-28 px-4 sm:px-6 overflow-hidden" style={{ background: 'linear-gradient(135deg, rgb(var(--surface-rgb)) 0%, rgb(var(--bg-rgb)) 60%)' }}>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(212,175,55,0.15) 40px, rgba(212,175,55,0.15) 41px)' }} />
        <div className="max-w-7xl mx-auto relative z-10">
          <p className="text-brand-red text-[10px] tracking-[0.5em] uppercase mb-4">{t('Capabilities', 'إمكاناتنا')}</p>
          <h1 className="font-bebas text-6xl sm:text-8xl text-white mb-6 leading-none">
            {t(<>STUDIO<br />DEPARTMENTS</>, <>أقسام<br />الاستوديو</>)}
          </h1>
          <p className="text-brand-gray max-w-xl text-base leading-relaxed">
            {t('We engineer high-impact narratives across digital and physical mediums. Our specialized departments operate with the precision of a modern darkroom, bringing raw ideas into sharp focus.', 'نصمّم حكايات عالية التأثير عبر الوسائط الرقمية والمادية. تعمل أقسامنا المتخصصة بدقّة غرفة تحميض حديثة لتحويل الأفكار الخام إلى صورة واضحة.')}
          </p>
        </div>
      </section>

      {/* Department Cards */}
      <section ref={revealRef} className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {departments.map((d, i) => (
            <div
              key={d.title}
              className="reveal card-hover p-6 sm:p-8 border border-white/8 group"
              style={{ background: 'rgb(var(--surface-rgb))' }}
            >
              <div className="text-brand-gray group-hover:text-brand-red transition-colors duration-300 mb-6">
                {d.icon}
              </div>
              <h2 className="font-bebas text-3xl text-white mb-4 group-hover:text-brand-red transition-colors duration-300">
                {t(d.title, d.titleAr)}
              </h2>
              <p className="text-brand-gray text-sm leading-relaxed mb-6">{t(d.desc, d.descAr)}</p>
              <ul className="flex flex-col gap-2">
                {(t(d.services, d.servicesAr)).map((s, si) => (
                  <li key={si} className="flex items-center gap-2 text-xs text-white/60">
                    <span className="w-3 h-px bg-brand-red flex-shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-14 sm:py-20 px-4 sm:px-6" style={{ background: 'rgb(var(--bg2-rgb))', borderTop: '1px solid rgb(var(--fg-rgb) / 0.06)' }}>
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map(s => (
            <div key={s.label} className="border border-white/6 py-10 px-4 rounded-2xl" style={{ background: 'rgb(var(--surface-rgb))' }}>
              <Counter target={s.value} suffix={s.suffix} className="font-bebas text-6xl sm:text-7xl text-brand-red block" />
              <p className="text-[10px] tracking-[0.25em] uppercase text-brand-gray mt-3">{t(s.label, s.labelAr)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="py-16 sm:py-24 px-4 sm:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-brand-red text-[10px] tracking-[0.4em] uppercase mb-3">{t('How We Work', 'كيف نعمل')}</p>
          <h2 className="font-bebas text-5xl text-white">{t('THE METHODOLOGY', 'منهجية العمل')}</h2>
        </div>
        <div className="relative max-w-2xl mx-auto">
          <div className="absolute left-4 rtl:left-auto rtl:right-4 top-0 bottom-0 w-px bg-brand-red/20" />
          {PROCESS.map((step, i) => (
            <div key={step.en} className="relative flex gap-5 sm:gap-8 mb-10 last:mb-0">
              <div className="flex-shrink-0 w-8 h-8 border border-brand-red flex items-center justify-center bg-brand-black relative z-10">
                <span className="font-bebas text-brand-red text-sm">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="pt-1">
                <h3 className="font-bebas text-xl text-white mb-1">{t(step.en, step.ar)}</h3>
                <p className="text-sm text-brand-gray leading-relaxed">{t(step.enD, step.arD)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 px-4 text-center" style={{ background: 'rgb(var(--surface2-rgb))' }}>
        <Link to="/contact" className="btn-primary inline-block px-12 py-4">{t('Start a Project', 'ابدأ مشروعًا')}</Link>
      </section>
    </div>
  )
}
