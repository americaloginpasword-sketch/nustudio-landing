import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import HeroTitle from '../components/HeroTitle';
import Magnet from '../components/Magnet';
import { HERO_PORTRAIT_PATH } from '../content/videoPosters';

const NAV_LINKS = [
  { label: 'О СТУДИИ', href: '#about' },
  { label: 'УСЛУГИ', href: '#price' },
  { label: 'НОВЫЕ ПРОЕКТЫ', href: '#projects' },
  { label: 'КОНТАКТЫ', href: '#contact' },
] as const;

const HERO_GUTTER = 'px-6 md:px-10';

export default function HeroSection() {
  return (
    <section className="relative flex h-[100dvh] min-h-[580px] flex-col overflow-x-clip">
      <FadeIn delay={0} y={-20} inView={false} className="relative z-30 shrink-0">
        <nav className="grid grid-cols-2 gap-x-4 gap-y-2 px-6 pt-5 sm:flex sm:justify-between sm:px-8 sm:pt-6 md:px-12 md:pt-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-center text-[11px] font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 sm:text-left sm:text-sm md:text-lg lg:text-[1.4rem]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className={`relative flex min-h-0 flex-1 flex-col ${HERO_GUTTER}`}>
        <div className="pointer-events-none relative z-0 mt-4 shrink-0 sm:mt-4 md:-mt-5">
          <HeroTitle
            text="NUstudio"
            seoSuffix=" — студия нейросетевого видео и AI-контента"
          />
        </div>

        <div className="pointer-events-none absolute left-1/2 top-[54%] z-10 aspect-[10/11] w-[min(88vw,320px)] -translate-x-1/2 -translate-y-1/2 sm:top-auto sm:left-[60%] sm:bottom-0 sm:w-[526px] sm:-translate-x-1/2 sm:translate-y-[10vh] md:w-[643px] lg:w-[759px]">
          <FadeIn delay={0.6} y={30} inView={false} className="h-full w-full">
            <Magnet
              padding={150}
              strength={3}
              activeTransition="transform 0.3s ease-out"
              inactiveTransition="transform 0.6s ease-in-out"
              className="pointer-events-auto h-full w-full"
            >
              <img
                src={HERO_PORTRAIT_PATH}
                alt="Портрет продюсера NUstudio — студия нейросетевого видео и AI-контента"
                width={1000}
                height={1100}
                fetchPriority="high"
                decoding="async"
                className="h-full w-full object-contain"
                draggable={false}
              />
            </Magnet>
          </FadeIn>
        </div>
      </div>

      <div
        className={`relative z-20 flex shrink-0 items-end justify-between gap-4 ${HERO_GUTTER} pb-[max(1.75rem,env(safe-area-inset-bottom))] sm:pb-8 md:pb-10`}
      >
        <FadeIn delay={0.35} y={20} inView={false} className="pointer-events-none max-w-[42%] sm:ml-[0.8%] sm:max-w-none">
          <p className="cursor-default select-none text-[11px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[220px] sm:text-[clamp(0.75rem,1.4vw,1.5rem)] md:max-w-[260px]">
            продюсеры, которые создают яркие и незабываемые проекты
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20} inView={false} id="contact" className="shrink-0">
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
