"use client";

import type { CSSProperties } from "react";
import { Reveal } from "./Reveal";

type Tech = { name: string; logo: string; color: string };

const techs: Tech[] = [
  { name: "React", logo: "react", color: "#61DAFB" },
  { name: "Next.js", logo: "nextjs", color: "#F0F0F8" },
  { name: "TypeScript", logo: "typescript", color: "#3178C6" },
  { name: "Node.js", logo: "nodejs", color: "#68A063" },
  { name: "React Native", logo: "react-native", color: "#61DAFB" },
  { name: "PostgreSQL", logo: "postgresql", color: "#336791" },
  { name: "MongoDB", logo: "mongodb", color: "#47A248" },
  { name: "Firebase", logo: "firebase", color: "#FFA000" },
  { name: "Docker", logo: "docker", color: "#2496ED" },
  { name: "AWS", logo: "aws", color: "#FF9900" },
  { name: "Redis", logo: "redis", color: "#DC382D" },
  { name: "Git", logo: "git", color: "#F05032" },
  { name: "Tailwind", logo: "tailwind", color: "#06B6D4" },
  { name: ".NET", logo: "dotnet", color: "#512BD4" },
  { name: "PHP", logo: "php", color: "#777BB4" },
  { name: "Angular", logo: "angular", color: "#DD0031" },
];

function MarqueeRow({
  techs,
  reverse,
  duration,
  delay = 0,
}: {
  techs: Tech[];
  reverse?: boolean;
  duration: number;
  delay?: number;
}) {
  const items = [...techs, ...techs];

  return (
    <div className="group relative">
      <div
        className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          animationDelay: `${delay}s`,
        }}
      >
        {items.map((tech, i) => (
          <div
            key={`${tech.name}-${i}`}
            aria-hidden={i >= techs.length}
            title={tech.name}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-[0_0_24px_-4px_var(--tech-c)]"
            style={{ "--tech-c": tech.color } as CSSProperties}
          >
            <img
              src={`/tech-logos/${tech.logo}.svg`}
              alt={tech.name}
              width={28}
              height={28}
              className="h-7 w-7 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

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

          <div className="relative flex flex-col gap-4">
            <MarqueeRow techs={techs} duration={36} />
          </div>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-navy-800 to-transparent sm:w-32" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-navy-800 to-transparent sm:w-32" />
        </Reveal>
      </div>
    </section>
  );
}
