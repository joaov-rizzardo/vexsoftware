"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  animate as animateValue,
  motion,
  useMotionValue,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
import { Reveal } from "./Reveal";
import {
  IconQuote,
  IconStar,
  IconCheckCircle,
  IconChevronLeft,
  IconChevronRight,
} from "./icons";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
};

/**
 * PLACEHOLDER — substituir por depoimentos reais (com autorização do cliente)
 * antes de publicar.
 */
const testimonials: Testimonial[] = [
  {
    quote:
      "Antes a gente controlava tudo no caderno e no WhatsApp. Hoje o sistema mostra estoque, vendas e agenda em tempo real. Em três meses paramos de perder pedido.",
    name: "Marina Alves",
    role: "Sócia-proprietária",
    company: "Bella Estética",
    rating: 5,
  },
  {
    quote:
      "O agendamento online foi o divisor de águas. Os clientes marcam sozinhos, de madrugada, e minha equipe parou de perder tempo no telefone.",
    name: "Rafael Menezes",
    role: "Diretor",
    company: "Auto Center Menezes",
    rating: 5,
  },
  {
    quote:
      "A automação do WhatsApp responde os clientes na hora. Triplicamos os orçamentos enviados sem contratar ninguém novo.",
    name: "Diego Fontana",
    role: "Fundador",
    company: "Fontana Reformas",
    rating: 5,
  },
  {
    quote:
      "O suporte é o que mais me impressiona: mandei mensagem num sábado e resolveram no mesmo dia. Parece que fazem parte da empresa.",
    name: "Camila Ribeiro",
    role: "Coordenadora administrativa",
    company: "Clínica VidaMais",
    rating: 5,
  },
  {
    quote:
      "Eles entenderam a rotina da loja antes de escrever uma linha de código. O sistema saiu com a nossa cara, não um pacote genérico.",
    name: "Bruno Tavares",
    role: "Gerente de operações",
    company: "Distribuidora Norte",
    rating: 5,
  },
  {
    quote:
      "O site novo trouxe orçamento qualificado já na primeira semana. Hoje chega gente que já sabe o que a gente faz e quanto custa.",
    name: "Patrícia Lemos",
    role: "Proprietária",
    company: "Lemos Arquitetura",
    rating: 5,
  },
];

/** Espaço (px) entre os cards do trilho. */
const SLIDE_GAP = 20;
/** Tempo que cada página fica visível no autoplay. */
const AUTOPLAY_MS = 6000;

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">{`Avaliação: ${rating} de 5`}</span>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar
          key={i}
          aria-hidden="true"
          fill="currentColor"
          strokeWidth={0}
          className={`h-4 w-4 ${i < rating ? "text-accent-500" : "text-slate-300"}`}
        />
      ))}
    </div>
  );
}

/** Botão redondo dos controles — 44px de área de toque. */
function ControlButton({
  label,
  onClick,
  children,
}: {
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-navy-800 shadow-soft transition duration-200 ease-out hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50 active:translate-y-0"
    >
      {children}
    </button>
  );
}

export default function Testimonials() {
  const total = testimonials.length;
  const reduce = useReducedMotion();

  const [perView, setPerView] = useState(3);
  const [rawIndex, setIndex] = useState(0);
  const [interacting, setInteracting] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  const viewportRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);

  const maxIndex = Math.max(0, total - perView);
  /* Derivado em vez de corrigido por efeito: ao passar de 3 para 1 card por
     vez, um índice antigo fora do novo limite é apenas clampado no render. */
  const index = Math.min(rawIndex, maxIndex);
  /* Deslocamento de um card = (largura visível + gap) / cards por vez. */
  const step = viewportWidth ? (viewportWidth + SLIDE_GAP) / perView : 0;
  const autoplayOn = !interacting && !reduce && maxIndex > 0;

  /* Cards visíveis por breakpoint: 1 (mobile) / 2 (sm) / 3 (lg). */
  useEffect(() => {
    const breakpoints = [
      { mq: window.matchMedia("(min-width: 1024px)"), value: 3 },
      { mq: window.matchMedia("(min-width: 640px)"), value: 2 },
    ];
    const update = () =>
      setPerView(breakpoints.find(({ mq }) => mq.matches)?.value ?? 1);

    update();
    breakpoints.forEach(({ mq }) => mq.addEventListener("change", update));
    return () =>
      breakpoints.forEach(({ mq }) => mq.removeEventListener("change", update));
  }, []);

  /* Mede a largura visível para converter índice em deslocamento em px. */
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const observer = new ResizeObserver(([entry]) =>
      setViewportWidth(entry.contentRect.width),
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const slideTo = useCallback(
    (target: number) => {
      /* Circular: passar do fim volta ao começo (e vice-versa). */
      const next = target > maxIndex ? 0 : target < 0 ? maxIndex : target;
      setIndex(next);
      animateValue(
        x,
        -next * step,
        reduce
          ? { duration: 0 }
          : { type: "spring", stiffness: 280, damping: 36, mass: 0.9 },
      );
    },
    [maxIndex, reduce, step, x],
  );

  /* Ref sempre com a versão mais recente de slideTo: o timer de autoplay a
     lê por aqui em vez de depender da função diretamente, para que a troca
     de identidade dela (ex.: `step` recalculado por um resize do trilho) não
     cancele e reagende o timer sem uma mudança real de slide. */
  const slideToRef = useRef(slideTo);
  useEffect(() => {
    slideToRef.current = slideTo;
  }, [slideTo]);

  /* Reposiciona sem animar quando a largura ou o nº de cards muda (medição
     inicial, resize, rotação do device). Mudanças de índice animam em slideTo. */
  const lastLayout = useRef({ step, perView });
  useEffect(() => {
    if (lastLayout.current.step === step && lastLayout.current.perView === perView) {
      return;
    }
    lastLayout.current = { step, perView };
    animateValue(x, -index * step, { duration: 0 });
  }, [index, perView, step, x]);

  /* Autoplay — pausa no hover/foco do trilho, durante o arraste e com
     reduced motion. Usa slideToRef (não slideTo) para não reagendar o timer
     quando só a identidade da função muda. */
  useEffect(() => {
    if (!autoplayOn) return;
    const timer = window.setTimeout(() => slideToRef.current(index + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [autoplayOn, index]);

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    setInteracting(false);
    const projected = info.offset.x + info.velocity.x * 0.25;
    const threshold = Math.max(step * 0.25, 50);
    const moved = Math.round(-projected / step);

    if (Math.abs(projected) < threshold) slideTo(index);
    else slideTo(Math.min(Math.max(index + moved, 0), maxIndex));
  };

  return (
    <section id="depoimentos" className="relative overflow-hidden bg-slate-50 py-24">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full bg-brand-100/50 blur-3xl"
      />

      <div className="container-page relative">
        {/* Cabeçalho */}
        <Reveal className="flex justify-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-xs font-medium text-brand-600 shadow-soft">
            <IconCheckCircle aria-hidden="true" className="h-4 w-4" />
            Depoimentos verificados
          </p>
        </Reveal>

        <Reveal
          as="h2"
          delay={0.08}
          className="mt-5 text-center font-display text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl"
        >
          Quem já trabalha com a <span className="text-brand-500">VEX</span>
        </Reveal>

        <Reveal delay={0.14}>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Veja o que nossos clientes dizem após contratar a VEX.
          </p>
        </Reveal>

        {/* Carrossel */}
        <Reveal delay={0.1} amount={0.1} className="mt-12">
          <div
            role="group"
            aria-roledescription="carrossel"
            aria-label="Depoimentos de clientes"
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                slideTo(index + 1);
              } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                slideTo(index - 1);
              }
            }}
          >
            <div
              ref={viewportRef}
              className="overflow-hidden"
              aria-live={autoplayOn ? "off" : "polite"}
              onMouseEnter={() => setInteracting(true)}
              onMouseLeave={() => setInteracting(false)}
              onFocusCapture={() => setInteracting(true)}
              onBlurCapture={() => setInteracting(false)}
            >
              <motion.div
                className="flex w-full cursor-grab items-stretch active:cursor-grabbing"
                style={{ x, gap: SLIDE_GAP }}
                drag="x"
                dragConstraints={{ left: -maxIndex * step, right: 0 }}
                dragElastic={0.12}
                dragMomentum={false}
                onDragStart={() => setInteracting(true)}
                onDragEnd={handleDragEnd}
              >
                {testimonials.map((t, i) => {
                  const visible = i >= index && i < index + perView;

                  return (
                    <div
                      key={t.name}
                      /* Larguras em CSS (não via perView) para que o primeiro
                         paint no servidor já saia certo em cada breakpoint.
                         Os descontos são (cards-1) × SLIDE_GAP. */
                      className="w-full shrink-0 sm:w-[calc((100%-20px)/2)] lg:w-[calc((100%-40px)/3)]"
                      role="group"
                      aria-roledescription="slide"
                      aria-label={`${i + 1} de ${total}`}
                      aria-hidden={!visible}
                      inert={!visible}
                    >
                      <figure className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft transition duration-300 ease-out hover:border-brand-300 hover:shadow-[0_18px_40px_-24px_rgba(37,99,235,0.45)] sm:p-7">
                        <div className="flex items-center justify-between">
                          <Stars rating={t.rating} />
                          <IconQuote aria-hidden="true" className="h-7 w-7 text-brand-100" />
                        </div>

                        <blockquote className="mt-5 text-[0.95rem] leading-relaxed text-slate-600">
                          “{t.quote}”
                        </blockquote>

                        <figcaption className="mt-auto flex items-center gap-3 border-t border-slate-100 pt-6">
                          <span
                            aria-hidden="true"
                            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand-50 font-display text-sm font-semibold text-brand-600 ring-1 ring-brand-100"
                          >
                            {initials(t.name)}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-navy-800">{t.name}</p>
                            <p className="text-xs text-slate-500">
                              {t.role} · {t.company}
                            </p>
                          </div>
                        </figcaption>
                      </figure>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Indicadores + controles, centralizados sob os cards */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
              <div className="flex items-center gap-2">
                {Array.from({ length: maxIndex + 1 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => slideTo(i)}
                    aria-label={`Ir para a posição ${i + 1} de ${maxIndex + 1}`}
                    aria-current={i === index}
                    className="group relative h-11 w-6 focus-visible:outline-none"
                  >
                    <span
                      className={`absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full transition-all duration-300 ease-out group-focus-visible:ring-2 group-focus-visible:ring-brand-500 group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-slate-50 ${
                        i === index
                          ? "w-8 bg-brand-500"
                          : "w-4 bg-slate-300 group-hover:bg-slate-400"
                      }`}
                    />
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <ControlButton label="Depoimentos anteriores" onClick={() => slideTo(index - 1)}>
                  <IconChevronLeft aria-hidden="true" className="h-5 w-5" />
                </ControlButton>
                <ControlButton label="Próximos depoimentos" onClick={() => slideTo(index + 1)}>
                  <IconChevronRight aria-hidden="true" className="h-5 w-5" />
                </ControlButton>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
