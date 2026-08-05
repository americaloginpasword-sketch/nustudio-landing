import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import HeroTitle from '../components/HeroTitle';
import Magnet from '../components/Magnet';
import portrait from '../assets/portrait.webp';

const NAV_LINKS = [
  { label: 'О СТУДИИ', href: '#about' },
  { label: 'УСЛУГИ', href: '#price' },
  { label: 'НОВЫЕ ПРОЕКТЫ', href: '#projects' },
  { label: 'КОНТАКТЫ', href: '#contact' },
] as const;

const HERO_GUTTER = 'px-6 md:px-10';

export default function HeroSection() {
  return (
    <section className="relative flex h-screen flex-col overflow-x-clip">
      <FadeIn delay={0} y={-20} inView={false} className="relative z-30">
        <nav className="flex justify-between px-8 pt-6 md:px-12 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className={`relative flex min-h-0 flex-1 flex-col ${HERO_GUTTER}`}>
        <div className="relative z-0 mt-6 shrink-0 pointer-events-none sm:mt-4 md:-mt-5">
          <HeroTitle text="NUstudio" />
        </div>

        <div className="pointer-events-none absolute left-[60%] top-[60%] z-10 w-[410px] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:bottom-0 sm:w-[526px] sm:translate-y-[10vh] md:w-[643px] lg:w-[759px]">
          <FadeIn delay={0.6} y={30} inView={false} className="h-full w-full">
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              className="pointer-events-auto"
            >
              <img
                src={portrait}
                alt="Портрет Jack"
                className="h-auto w-full object-contain"
                draggable={false}
              />
            </Magnet>
          </FadeIn>
        </div>
      </div>

      <div className={`relative z-20 flex items-end justify-between ${HERO_GUTTER} pb-7 sm:pb-8 md:pb-10`}>
        <FadeIn delay={0.35} y={20} inView={false} className="pointer-events-none ml-[0.8%]">
          <p
            className="max-w-[160px] cursor-default select-none font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] md:max-w-[260px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            продюсеры, которые создают яркие и незабываемые проекты
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} inView={false} id="contact">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
