import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { CONTACT_EMAIL, CONTACT_MAILTO, CONTACT_TELEGRAM_URL } from '../content/contacts';

const NAV_LINKS = [
  { label: 'О СТУДИИ', href: '#about' },
  { label: 'УСЛУГИ', href: '#price' },
  { label: 'НОВЫЕ ПРОЕКТЫ', href: '#projects' },
  { label: 'КОНТАКТЫ', href: '#contact' },
] as const;

const FOOTER_GUTTER = 'px-6 md:px-10';

const FOOTER_SEO_TEXT =
  'NUstudio — студия AI-видеопродакшна. Делаем нейросетевые видео на заказ: рекламные ролики для брендов и соцсетей, открывающие интро и мотивационные ролики для ивентов, анонсы запусков, обложки музыкальных синглов, раскадровки и визуальные концепции. Также занимаемся внедрением нейросетей: AI-агенты, автоматизация и консалтинг.';

export default function FooterSection() {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      className={`relative border-t-2 border-[#D7E2EA]/20 bg-[#0C0C0C] ${FOOTER_GUTTER} pb-8 pt-16 sm:pb-10 sm:pt-20 md:pt-24`}
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <FadeIn className="flex flex-col gap-5">
            <p
              className="hero-heading font-black leading-none tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 8vw, 5rem)' }}
            >
              NUstudio
            </p>
            <p
              className="max-w-[280px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA]/70 sm:max-w-[320px]"
              style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.1rem)' }}
            >
              продюсеры, которые создают яркие и незабываемые проекты
            </p>
          </FadeIn>

          <FadeIn delay={0.1} className="flex flex-col gap-8 sm:flex-row sm:gap-16 md:gap-24">
            <nav className="flex flex-col gap-4">
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40">
                Навигация
              </span>
              <ul className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-base"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex flex-col gap-4">
              <span className="text-[0.65rem] font-medium uppercase tracking-[0.2em] text-[#D7E2EA]/40">
                Контакты
              </span>
              <a
                href={CONTACT_MAILTO}
                className="text-sm font-light text-[#D7E2EA]/80 transition-opacity duration-200 hover:text-[#D7E2EA] md:text-base"
              >
                {CONTACT_EMAIL}
              </a>
              <a
                href={CONTACT_TELEGRAM_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-light text-[#D7E2EA]/80 transition-opacity duration-200 hover:text-[#D7E2EA] md:text-base"
              >
                Telegram
              </a>
            </div>
          </FadeIn>
        </div>

        <FadeIn delay={0.15} className="mt-12 sm:mt-14">
          <p className="max-w-3xl text-sm font-light leading-relaxed text-[#D7E2EA]/50">
            {FOOTER_SEO_TEXT}
          </p>
        </FadeIn>

        <FadeIn
          delay={0.2}
          className="mt-14 flex flex-col gap-6 border-t border-[#D7E2EA]/15 pt-8 sm:mt-16 sm:flex-row sm:items-center sm:justify-between md:mt-20"
        >
          <p className="text-xs font-light uppercase tracking-[0.18em] text-[#D7E2EA]/40">
            © {year} NUstudio. Все права защищены.
          </p>
          <ContactButton />
        </FadeIn>
      </div>
    </footer>
  );
}
