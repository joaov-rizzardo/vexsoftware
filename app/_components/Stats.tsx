"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { IconUsersGear, IconClock, IconSmile, IconStar } from "./icons";

gsap.registerPlugin(useGSAP, ScrollTrigger);

type Stat = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  end: number;
  suffix?: string;
  label: string;
};

const stats: Stat[] = [
  { icon: IconUsersGear, end: 89, suffix: "+", label: "Projetos entregues" },
  { icon: IconClock, end: 5, suffix: "+ anos", label: "De experiência" },
  { icon: IconSmile, end: 68, suffix: "+", label: "Clientes atendidos" },
  { icon: IconStar, end: 98, suffix: "%", label: "Dos prazos cumpridos" },
];

export default function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const nums = gsap.utils.toArray<HTMLElement>(".stat-num");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      nums.forEach((node) => {
        const end = Number(node.dataset.end);
        const suffix = node.dataset.suffix ?? "";
        if (reduce) {
          node.textContent = `${end}${suffix}`;
          return;
        }
        const obj = { v: 0 };
        gsap.to(obj, {
          v: end,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: { trigger: node, start: "top 85%", once: true },
          onUpdate: () => (node.textContent = `${Math.round(obj.v)}${suffix}`),
        });
      });
    },
    { scope: root }
  );

  return (
    <section aria-labelledby="stats-heading" className="relative -mt-px bg-slate-50 pb-10">
      <h2 id="stats-heading" className="sr-only">
        Resultados da VEX Software em números
      </h2>
      <div ref={root} className="container-page">
        <div className="relative overflow-hidden rounded-3xl bg-[radial-gradient(120%_140%_at_0%_0%,#12275a_0%,#0a1124_60%)] px-6 py-10 shadow-glow ring-1 ring-white/10 sm:px-10">
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="flex items-center gap-4">
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/5 text-brand-400 ring-1 ring-white/10">
                    <Icon className="h-6 w-6" />
                  </span>
                  <div>
                    <p
                      className="stat-num font-display text-3xl font-bold tabular-nums text-white"
                      data-end={s.end}
                      data-suffix={s.suffix ?? ""}
                    >
                      0{s.suffix}
                    </p>
                    <p className="text-sm text-slate-400">{s.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
