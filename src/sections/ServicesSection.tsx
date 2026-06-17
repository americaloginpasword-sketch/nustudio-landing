import FadeIn from '../components/FadeIn';

const SERVICES = [
  {
    number: '01',
    name: 'Видео',
    description:
      'Генерация в нейросетях, монтаж, SFX и цветокоррекция под ключ. Создаём видео любой сложности под задачи бренда. Максимальный реализм — результат неотличим от реальной съёмки.',
  },
  {
    number: '02',
    name: 'Креатив',
    description:
      'Интегрируем новые технологии в привычные процессы. Заменяем устаревшие решения на свежие, нестандартные и эффективные.',
  },
  {
    number: '03',
    name: 'Дизайн',
    description:
      'От айдентики до карточек товаров для e-commerce. Афиши, постеры, сайты. Первые концепты — уже на следующий день.',
  },
  {
    number: '04',
    name: 'ИИ-агенты',
    description:
      'Внедряем ИИ в бизнес-процессы. Настраиваем автоматизацию и ботов для креатива и операционных задач. Снижаем затраты и ускоряем производство.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="price"
      className="rounded-t-[40px] bg-white px-5 pb-16 sm:rounded-t-[50px] sm:px-8 sm:pb-20 md:rounded-t-[60px] md:px-10 md:pb-24"
    >
      <FadeIn delay={0} y={40} className="pointer-events-none">
        <div className="py-10 sm:py-12 md:py-14">
          <h2 className="hero-heading-light section-title cursor-default select-none text-center font-black uppercase leading-none tracking-tight">
            УСЛУГИ
          </h2>
        </div>
      </FadeIn>

      <ul className="mx-auto max-w-5xl">
        {SERVICES.map((service, i) => (
          <FadeIn
            key={service.number}
            as="li"
            delay={i * 0.1}
            className="flex cursor-default select-none flex-col gap-4 border-t border-[rgba(12,12,12,0.15)] py-8 sm:flex-row sm:items-start sm:gap-8 sm:py-10 md:py-12"
            style={
              i === SERVICES.length - 1
                ? { borderBottom: '1px solid rgba(12, 12, 12, 0.15)' }
                : undefined
            }
          >
            <span
              className="shrink-0 font-black text-[#0C0C0C]"
              style={{ fontSize: 'clamp(3rem, 10vw, 140px)', lineHeight: 1 }}
            >
              {service.number}
            </span>
            <div className="flex flex-col gap-2">
              <h3
                className="font-medium uppercase text-[#0C0C0C]"
                style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
              >
                {service.name}
              </h3>
              <p
                className="max-w-2xl font-light leading-relaxed text-[#0C0C0C] opacity-60"
                style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
              >
                {service.description}
              </p>
            </div>
          </FadeIn>
        ))}
      </ul>
    </section>
  );
}
