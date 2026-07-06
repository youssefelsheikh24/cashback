import useReveal from '../hooks/useReveal'
import { Link } from 'react-router-dom'
import { useLang } from '../i18n/LanguageContext'

const team = [
  { name: 'Ahmed Yasser', role: 'Director', roleAr: 'مخرج' },
  { name: 'Youssef Tarek', role: 'Videographer', roleAr: 'مصوّر فيديو' },
  { name: 'Amir Ayman', role: 'Videographer', roleAr: 'مصوّر فيديو' },
  { name: 'Ebram Samy', role: 'Photographer', roleAr: 'مصوّر فوتوغرافي' },
  { name: 'Saif Hossam', role: 'Finance Manager', roleAr: 'مدير مالي' },
  { name: 'Youssef Salah', role: 'IT Manager', roleAr: 'مدير تقنية المعلومات' },
  { name: 'Shahd Adel', role: 'Account Manager', roleAr: 'مدير حسابات', img: '/shahd.jpeg' },
  { name: 'Rahma Bakry', role: 'Content Creator', roleAr: 'صانع محتوى', img: '/rahma%20bakry.jpeg' },
  { name: 'Mahmoud Zobaa', role: 'Content Creator', roleAr: 'صانع محتوى' },
  { name: 'Menna Mohsen', role: 'Video Editor', roleAr: 'محرّر فيديو', img: '/menna%20mohsen.jpeg' },
]

// Initials from a name, e.g. "Ahmed Yasser" → "AY"
const initials = (name) =>
  name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0].toUpperCase()).join('')

export default function Team() {
  const { t } = useLang()
  const revealRef = useReveal()
  return (
    <div>
      <section className="pt-28 pb-16 sm:pt-36 sm:pb-28 px-4 sm:px-6 text-center relative overflow-hidden" style={{ background: 'linear-gradient(180deg,rgb(var(--surface-rgb)) 0%,rgb(var(--bg-rgb)) 100%)' }}>
        <div className="absolute inset-0 opacity-5" style={{ background: 'radial-gradient(circle at 50% 50%, #D4AF37 0%, transparent 70%)' }} />
        <div className="relative z-10">
          <p className="text-brand-red text-[10px] tracking-[0.5em] uppercase mb-4">{t('The Movement', 'الحركة')}</p>
          <h1 className="font-bebas text-6xl sm:text-9xl text-white leading-none mb-6">
            {t(<>ARCHITECTS OF <span className="text-brand-red">ILLUSION</span></>, <>مهندسو <span className="text-brand-red">الوهم</span></>)}
          </h1>
          <p className="text-brand-gray max-w-xl mx-auto text-sm leading-relaxed">
            {t('We are a collective of directors, cinematographers, and visual artists dedicated to forging narratives that demand attention. Rooted in the darkroom, driven by the light.', 'نحن مجموعة من المخرجين ومديري التصوير والفنانين البصريين، نكرّس أنفسنا لصياغة حكايات تفرض الانتباه. جذورنا في غرفة التحميض، ويقودنا الضوء.')}
          </p>
        </div>
      </section>

      <section ref={revealRef} className="py-14 sm:py-20 px-4 sm:px-6 max-w-7xl mx-auto">
        <div>
          <p className="text-brand-red text-[10px] tracking-[0.4em] uppercase mb-2">{t('The Syndicate', 'النقابة')}</p>
          <h2 className="font-bebas text-4xl text-white mb-12">{t('STORYTELLING & TECHNICIANS', 'رواة وحرفيون')}</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger">
          {team.map(m => (
            <div key={m.name} className="reveal card-hover group border border-white/6 overflow-hidden rounded-2xl" style={{ background: 'rgb(var(--surface-rgb))' }}>
              {/* Photo when available, otherwise an initials avatar */}
              <div className="relative overflow-hidden" style={{ paddingBottom: '100%' }}>
                {m.img ? (
                  <img
                    src={m.img}
                    alt={m.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{ background: 'linear-gradient(135deg, rgb(var(--surface2-rgb)) 0%, rgb(var(--bg-rgb)) 100%)' }}
                  >
                    <span className="font-bebas text-6xl sm:text-7xl text-brand-red/70 group-hover:text-brand-red group-hover:scale-105 transition-all duration-500">
                      {initials(m.name)}
                    </span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>
              <div className="p-5" style={{ ['--fg-rgb']: '255 255 255' }}>
                <h3 className="font-bebas text-xl text-white">{m.name}</h3>
                <p className="text-[10px] text-brand-red uppercase tracking-wider mt-1">{t(m.role, m.roleAr)}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16 px-4 sm:px-6 text-center border-t border-white/6">
        <h2 className="font-bebas text-4xl text-white mb-4">{t('JOIN THE DARKROOM', 'انضم إلى غرفة التحميض')}</h2>
        <p className="text-brand-gray text-sm mb-8 max-w-md mx-auto">{t("We're always looking for obsessive visual storytellers. If you live and breathe cinema, let's talk.", 'نبحث دائمًا عن رواة بصريين شغوفين. إن كنت تعيش السينما وتتنفسها، فلنتحدث.')}</p>
        <Link to="/contact" className="btn-primary inline-block px-10">{t('Get In Touch', 'تواصل معنا')}</Link>
      </section>
    </div>
  )
}
