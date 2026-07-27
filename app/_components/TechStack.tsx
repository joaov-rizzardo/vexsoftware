"use client";

import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";

const techs = [
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#F0F0F8" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Node.js", color: "#68A063" },
  { name: "React Native", color: "#61DAFB" },
  { name: "PostgreSQL", color: "#336791" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Firebase", color: "#FFA000" },
  { name: "Docker", color: "#2496ED" },
  { name: "AWS", color: "#FF9900" },
  { name: "Redis", color: "#DC382D" },
  { name: "Git", color: "#F05032" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: ".NET", color: "#512BD4" },
  { name: "PHP", color: "#777BB4" },
  { name: "Angular", color: "#DD0031" },
];

/* Doubled so the track can loop seamlessly at translateX(-50%). */
const marqueeTechs = [...techs, ...techs];

export default function TechStack() {
  return (
    <section className="relative bg-white py-24">
      <div className="container-page">
        <Reveal
          as="h2"
          className="text-center font-display text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl"
        >
          Tecnologias que <span className="text-brand-500">dominamos</span>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
            Ferramentas modernas e comprovadas para construir produtos rápidos, seguros e prontos para escalar.
          </p>
        </Reveal>

        <Reveal
          delay={0.15}
          className="relative mt-14 overflow-hidden rounded-3xl bg-[radial-gradient(120%_140%_at_0%_0%,#12275a_0%,#0a1124_60%)] py-10 shadow-glow ring-1 ring-white/10 sm:py-12"
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />

          <div className="group relative mask-fade-x">
            <div className="flex w-max animate-marquee gap-3 group-hover:[animation-play-state:paused]">
              {marqueeTechs.map((tech, i) => (
                <span
                  key={`${tech.name}-${i}`}
                  aria-hidden={i >= techs.length}
                  className="flex shrink-0 items-center gap-2.5 rounded-full bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 ring-1 ring-white/10 transition-colors duration-300 hover:bg-white/10 hover:text-white hover:shadow-[0_0_0_1px_var(--tech-c),0_12px_28px_-12px_var(--tech-c)]"
                  style={{ "--tech-c": tech.color } as CSSProperties}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full transition-transform duration-300 hover:scale-125"
                    style={{ backgroundColor: tech.color }}
                  />
                  {tech.name}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
