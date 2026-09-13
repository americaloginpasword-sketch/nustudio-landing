import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import AnimatedText from '../components/AnimatedText';
import { aboutDecorations as DECORATIONS } from '../assets/media';

const ABOUT_TEXT =
  'Более 10 лет опыта в дизайне. Специализация на ИИ и нейросетях более трех лет. Перевели клиентов с дорогостоящего производства CG графики на оптимизированный пайплайн нейроконтента. Студия задает тренды, ускоряет процесс согласования и генерирует лучшие креативные решения. Команда удостаивается престижных наград и работает не только с талантливыми креаторами, но и держит в штате несколько AI-агентов, работающих круглосуточно. Давайте создавать невероятное вместе!';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative flex min-h-screen flex-col items-center justify-center px-5 py-20 sm:px-8 md:px-10"
    >
      <FadeIn delay={0.1} x={-80} y={0} duration={0.9} className="absolute top-[4%] left-[1%] sm:left-[2%] md:left-[4%]">
        <img
          src={DECORATIONS.moon}
          alt="Декоративная 3D-иллюстрация в разделе о студии нейросетевого видео"
          width={714}
          height={714}
          loading="lazy"
          decoding="async"
          className="h-auto w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>

      <FadeIn
        delay={0.25}
        x={-80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] left-[3%] sm:left-[6%] md:left-[10%]"
      >
        <img
          src={DECORATIONS.object3d}
          alt="Декоративный 3D-объект в разделе о внедрении нейросетей"
          width={420}
          height={446}
          loading="lazy"
          decoding="async"
          className="h-auto w-[100px] sm:w-[140px] md:w-[180px]"
        />
      </FadeIn>

      <FadeIn delay={0.15} x={80} y={0} duration={0.9} className="absolute top-[4%] right-[1%] sm:right-[2%] md:right-[4%]">
        <img
          src={DECORATIONS.lego}
          alt="Декоративная иллюстрация LEGO в разделе о студии AI-контента"
          width={708}
          height={862}
          loading="lazy"
          decoding="async"
          className="h-auto w-[120px] sm:w-[160px] md:w-[210px]"
        />
      </FadeIn>

      <FadeIn
        delay={0.3}
        x={80}
        y={0}
        duration={0.9}
        className="absolute bottom-[8%] right-[3%] sm:right-[6%] md:right-[10%]"
      >
        <img
          src={DECORATIONS.group}
          alt="Декоративная графика команды NUstudio и AI-агентов"
          width={688}
          height={676}
          loading="lazy"
          decoding="async"
          className="h-auto w-[130px] sm:w-[170px] md:w-[220px]"
        />
      </FadeIn>

      <div className="relative z-10 flex flex-col items-center gap-16 sm:gap-20 md:gap-24">
        <div className="flex flex-col items-center gap-10 sm:gap-14 md:gap-16">
          <FadeIn delay={0} y={40} className="pointer-events-none">
            <h2 className="hero-heading section-title cursor-default select-none text-center font-black uppercase leading-none tracking-tight">
              О СТУДИИ
            </h2>
          </FadeIn>

          <AnimatedText
            text={ABOUT_TEXT}
            className="mx-auto w-full max-w-[840px] cursor-default select-none text-center font-medium leading-relaxed text-[#D7E2EA] [font-size:clamp(1rem,2vw,1.35rem)]"
          />
        </div>

        <ContactButton />
      </div>
    </section>
  );
}
