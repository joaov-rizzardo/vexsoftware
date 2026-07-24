"use client";

import type { ComponentType, SVGProps } from "react";
import { StaggerGroup, StaggerItem, Reveal } from "./Reveal";
import {
  IconGlobe,
  IconMonitor,
  IconCalendar,
  IconChat,
  IconPuzzle,
  IconBars,
  IconPhone,
  IconUsersGear,
} from "./icons";

type Service = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

const services: Service[] = [
  {
    icon: IconGlobe,
    title: "Sites profissionais",
    desc: "Sites rápidos, modernos e responsivos que transmitem credibilidade e atraem clientes.",
  },
  {
    icon: IconMonitor,
    title: "Sistemas de gestão",
    desc: "Controle financeiro, estoque, clientes e vendas em um só lugar. Tudo organizado e seguro.",
  },
  {
    icon: IconCalendar,
    title: "Agendamento online",
    desc: "Permita que seus clientes agendem serviços 24h por dia, sem precisar ligar.",
  },
  {
    icon: IconChat,
    title: "Automação de WhatsApp",
    desc: "Atenda mais clientes, responda automaticamente e venda mais pelo WhatsApp.",
  },
  {
    icon: IconPuzzle,
    title: "Integrações",
    desc: "Integramos seu sistema com WhatsApp, ERP, gateways de pagamento e muito mais.",
  },
  {
    icon: IconBars,
    title: "Painéis administrativos",
    desc: "Tenha indicadores importantes na palma da mão para tomar decisões melhores.",
  },
  {
    icon: IconPhone,
    title: "Aplicativos",
    desc: "Aplicativos personalizados para Android e iOS que aproximam sua empresa dos seus clientes.",
  },
  {
    icon: IconUsersGear,
    title: "Consultoria em tecnologia",
    desc: "Analisamos seu negócio e criamos soluções tecnológicas viáveis que realmente funcionam.",
  },
];

export default function Services() {
  return (
    <section id="solucoes" className="relative bg-slate-50 py-24">
      <div className="container-page">
        <Reveal as="h2" className="text-center font-display text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
          Como podemos <span className="text-brand-500">ajudar</span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Soluções completas de tecnologia para tirar sua empresa do improviso e
            colocá-la para escalar.
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s) => {
            const Icon = s.icon;
            return (
              <StaggerItem key={s.title}>
                <article className="card-hover group h-full rounded-2xl border border-slate-200 bg-white p-6 shadow-soft">
                  <span className="relative inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 ring-1 ring-brand-100 transition-colors duration-300 group-hover:bg-brand-600 group-hover:text-white">
                    <span className="absolute inset-0 rounded-xl bg-brand-500/20 opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-100" />
                    <Icon className="relative h-6 w-6" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-semibold text-navy-800">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {s.desc}
                  </p>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
