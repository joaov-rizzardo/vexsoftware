"use client";

import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { IconArrowRight } from "./icons";

/** Text-based wordmarks so we stay dependency-free while looking like real logos. */
const brands = [
  { name: "SeuCard", tag: "SOLUÇÕES FINANCEIRAS", cls: "font-display font-extrabold tracking-tight" },
  { name: "Casa & Estilo", tag: "DECORAÇÕES", cls: "font-serif italic font-semibold" },
  { name: "clínica vitalle", tag: "", cls: "font-display font-medium lowercase" },
  { name: "AGROFORTE", tag: "PRODUTOS AGROPECUÁRIOS", cls: "font-display font-bold tracking-wide" },
  { name: "PrimeFit", tag: "ACADEMIA", cls: "font-display font-extrabold uppercase tracking-tight" },
  { name: "Pizzaria Sabor & Arte", tag: "", cls: "font-serif italic font-semibold" },
];

export default function LogoCloud() {
  return (
    <section id="projetos" className="relative bg-white py-20">
      <div className="container-page">
        <Reveal as="h2" className="text-center font-display text-2xl font-bold tracking-tight text-navy-800 sm:text-3xl">
          Empresas que confiam no nosso trabalho
        </Reveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 items-center gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
          {brands.map((b) => (
            <StaggerItem key={b.name} className="flex justify-center">
              <div className="group flex flex-col items-center text-center text-slate-400 grayscale transition-all duration-300 hover:text-navy-800 hover:grayscale-0">
                <span className={`text-lg leading-none ${b.cls} group-hover:text-brand-600`}>
                  {b.name}
                </span>
                {b.tag && (
                  <span className="mt-1 text-[0.55rem] tracking-[0.2em] text-slate-400">
                    {b.tag}
                  </span>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <Reveal delay={0.15} className="mt-12 flex justify-center">
          <a
            href="#contato"
            className="group inline-flex cursor-pointer items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-navy-800 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:text-brand-600"
          >
            Ver mais projetos
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
