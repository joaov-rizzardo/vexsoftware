"use client";

import { StaggerGroup, StaggerItem, Reveal } from "./Reveal";
import { IconQuote, IconStar, IconCheckCircle } from "./icons";

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
const featured: Testimonial = {
  quote:
    "Antes a gente controlava tudo no caderno e no WhatsApp. Hoje temos um sistema que mostra estoque, vendas e agenda em tempo real. Em três meses paramos de perder pedido e o faturamento cresceu.",
  name: "Marina Alves",
  role: "Sócia-proprietária",
  company: "Bella Estética",
  rating: 5,
};

const testimonials: Testimonial[] = [
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
];

function initials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

function Stars({ rating, tone = "light" }: { rating: number; tone?: "light" | "dark" }) {
  return (
    <div className="flex items-center gap-1">
      <span className="sr-only">{`Avaliação: ${rating} de 5`}</span>
      {Array.from({ length: 5 }, (_, i) => (
        <IconStar
          key={i}
          aria-hidden="true"
          fill="currentColor"
          strokeWidth={0}
          className={`h-4 w-4 ${
            i < rating
              ? tone === "dark"
                ? "text-accent-400"
                : "text-accent-500"
              : "text-slate-300"
          }`}
        />
      ))}
    </div>
  );
}

function Avatar({ name, tone = "light" }: { name: string; tone?: "light" | "dark" }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-semibold ${
        tone === "dark"
          ? "bg-white/10 text-brand-300 ring-1 ring-white/15"
          : "bg-brand-50 text-brand-600 ring-1 ring-brand-100"
      }`}
    >
      {initials(name)}
    </span>
  );
}

export default function Testimonials() {
  return (
    <section id="depoimentos" className="relative bg-slate-50 py-24">
      <div className="container-page">
        <Reveal
          as="h2"
          className="text-center font-display text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl"
        >
          Quem já trabalha com a <span className="text-brand-500">VEX</span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Empresas de verdade, resultados de verdade. Veja o que nossos clientes
            dizem depois de tirar o negócio do improviso.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Depoimento em destaque */}
          <StaggerItem className="sm:col-span-2">
            <figure className="card-hover relative h-full overflow-hidden rounded-2xl bg-[radial-gradient(120%_140%_at_0%_0%,#12275a_0%,#0a1124_60%)] p-8 shadow-glow ring-1 ring-white/10 sm:p-10">
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
              <IconQuote
                aria-hidden="true"
                className="pointer-events-none absolute -right-2 -top-2 h-28 w-28 text-white/[0.06]"
              />

              <div className="relative flex h-full flex-col">
                <Stars rating={featured.rating} tone="dark" />
                <blockquote className="mt-5 font-display text-xl font-medium leading-relaxed text-white sm:text-2xl">
                  “{featured.quote}”
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-4 pt-8">
                  <Avatar name={featured.name} tone="dark" />
                  <div>
                    <p className="font-semibold text-white">{featured.name}</p>
                    <p className="text-sm text-slate-400">
                      {featured.role} · {featured.company}
                    </p>
                  </div>
                </figcaption>
              </div>
            </figure>
          </StaggerItem>

          {/* Selo de confiança */}
          <StaggerItem>
            <div className="card-hover flex h-full flex-col justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-soft">
              <p className="font-display text-5xl font-bold tracking-tight text-navy-800">
                4,9
                <span className="text-2xl text-slate-400">/5</span>
              </p>
              <div className="mt-3 flex justify-center">
                <Stars rating={5} />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-500">
                Média de satisfação em mais de{" "}
                <strong className="font-semibold text-navy-800">80 projetos</strong>{" "}
                entregues para empresas de todo o Brasil.
              </p>
              <p className="mt-5 inline-flex items-center justify-center gap-2 text-sm font-medium text-accent-500">
                <IconCheckCircle aria-hidden="true" className="h-5 w-5" />
                Depoimentos verificados
              </p>
            </div>
          </StaggerItem>

          {/* Demais depoimentos */}
          {testimonials.map((t) => (
            <StaggerItem key={t.name}>
              <figure className="card-hover group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                <div className="flex items-center justify-between">
                  <Stars rating={t.rating} />
                  <IconQuote
                    aria-hidden="true"
                    className="h-7 w-7 text-brand-100 transition-colors duration-300 group-hover:text-brand-300"
                  />
                </div>

                <blockquote className="mt-4 text-sm leading-relaxed text-slate-600">
                  “{t.quote}”
                </blockquote>

                <figcaption className="mt-auto flex items-center gap-3 pt-6">
                  <Avatar name={t.name} />
                  <div>
                    <p className="text-sm font-semibold text-navy-800">{t.name}</p>
                    <p className="text-xs text-slate-500">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
