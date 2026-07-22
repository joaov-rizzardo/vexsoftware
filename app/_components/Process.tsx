"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Reveal } from "./Reveal";
import {
  IconChatBubble,
  IconDoc,
  IconCode,
  IconEye,
  IconRocket,
  IconHeadset,
} from "./icons";

const steps = [
  { icon: IconChatBubble, title: "Entendemos seu negócio", desc: "Conversamos para entender seus desafios e objetivos." },
  { icon: IconDoc, title: "Planejamos a solução", desc: "Criamos a melhor estratégia e o plano de desenvolvimento." },
  { icon: IconCode, title: "Desenvolvemos", desc: "Nossa equipe transforma o plano em um sistema sob medida." },
  { icon: IconEye, title: "Você acompanha tudo", desc: "Acompanhe cada etapa com total transparência." },
  { icon: IconRocket, title: "Fazemos implantação", desc: "Implantamos, testamos e treinamos sua equipe." },
  { icon: IconHeadset, title: "Damos suporte", desc: "Suporte próximo e rápido sempre que precisar." },
];

export default function Process() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      // Pop the numbered circles in as they enter
      gsap.from(".process-node", {
        scale: 0.6,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(1.6)",
        stagger: 0.12,
        scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
      });

      // Fill the connecting line while scrolling through the section
      const fill = root.current?.querySelector<HTMLElement>(".process-fill");
      if (fill && !reduce) {
        gsap.fromTo(
          fill,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top 65%",
              end: "bottom 70%",
              scrub: 0.6,
            },
          }
        );
      } else if (fill) {
        gsap.set(fill, { scaleX: 1 });
      }
    },
    { scope: root }
  );

  return (
    <section id="processo" className="relative bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <Reveal as="h2" className="text-center font-display text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl">
          Como funciona o nosso <span className="text-brand-500">processo</span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Um método claro, do primeiro contato ao suporte contínuo — sem surpresas.
          </p>
        </Reveal>

        <div ref={root} className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div className="pointer-events-none absolute left-0 right-0 top-8 hidden lg:block">
            <div className="mx-[8.33%] h-0.5 rounded-full bg-slate-200" />
            <div className="mx-[8.33%] -mt-0.5 h-0.5 origin-left rounded-full bg-gradient-to-r from-brand-500 to-accent-500 process-fill" />
          </div>

          <ol className="grid gap-y-12 gap-x-6 sm:grid-cols-2 lg:grid-cols-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="relative flex flex-col items-center text-center">
                  <div className="process-node relative z-10 flex h-16 w-16 items-center justify-center rounded-full border border-brand-100 bg-white text-brand-600 shadow-soft">
                    <Icon className="h-7 w-7" />
                    <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-2 ring-white">
                      {i + 1}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-sm font-semibold text-navy-800">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-slate-500">
                    {step.desc}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
