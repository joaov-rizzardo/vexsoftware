"use client";

import type { ComponentType, SVGProps } from "react";
import { Reveal, StaggerGroup, StaggerItem } from "./Reveal";
import { IconGlobe, IconPhone, IconDatabase, IconCloud, IconCode } from "./icons";

type Tech = { name: string; logo: string };

type Category = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  /* Gradiente do quadrado do ícone: azul da marca no primeiro card e tons de
     apoio nos demais, só para diferenciar as áreas. */
  gradient: string;
  title: string;
  desc: string;
  techs: Tech[];
};

const categories: Category[] = [
  {
    icon: IconGlobe,
    gradient: "from-brand-500 to-brand-600",
    title: "Desenvolvimento Web",
    desc: "Aplicações rápidas, responsivas e modernas para web.",
    techs: [
      { name: "React", logo: "react" },
      { name: "Next.js", logo: "nextjs" },
      { name: "Angular", logo: "angular" },
      { name: "Tailwind", logo: "tailwind" },
    ],
  },
  {
    icon: IconPhone,
    gradient: "from-violet-500 to-purple-600",
    title: "Sistemas e Aplicativos",
    desc: "Sistemas robustos e escaláveis para diferentes necessidades.",
    techs: [
      { name: "Node.js", logo: "nodejs" },
      { name: ".NET", logo: "dotnet" },
      { name: "PHP", logo: "php" },
      { name: "React Native", logo: "react-native" },
    ],
  },
  {
    icon: IconDatabase,
    gradient: "from-teal-500 to-emerald-600",
    title: "Dados e Armazenamento",
    desc: "Bancos de dados seguros, rápidos e preparados para crescer.",
    techs: [
      { name: "PostgreSQL", logo: "postgresql" },
      { name: "MongoDB", logo: "mongodb" },
      { name: "Redis", logo: "redis" },
      { name: "Firebase", logo: "firebase" },
    ],
  },
  {
    icon: IconCloud,
    gradient: "from-rose-500 to-pink-600",
    title: "Nuvem e Infraestrutura",
    desc: "Publicação em nuvem, ambientes isolados e versionamento do código.",
    techs: [
      { name: "AWS", logo: "aws" },
      { name: "Vercel", logo: "vercel" },
      { name: "Docker", logo: "docker" },
      { name: "Git", logo: "git" },
    ],
  },
];

function TechLogo({ tech }: { tech: Tech }) {
  return (
    <li className="group/logo flex w-[4.5rem] flex-col items-center gap-2 rounded-xl px-1 py-3 transition-colors duration-300 hover:bg-slate-50 sm:w-20">
      <img
        src={`/tech-logos/${tech.logo}.svg`}
        alt=""
        aria-hidden="true"
        width={36}
        height={36}
        loading="lazy"
        decoding="async"
        className="h-9 w-9 object-contain transition-transform duration-300 group-hover/logo:-translate-y-0.5 group-hover/logo:scale-110"
      />
      <span className="text-center text-[11px] font-medium leading-tight text-slate-500 sm:text-xs">
        {tech.name}
      </span>
    </li>
  );
}

export default function TechStack() {
  return (
    <section className="relative bg-gradient-to-b from-white via-brand-50/50 to-white py-24">
      <div className="container-page">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex justify-center">
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-xs font-medium text-brand-600 shadow-soft">
              <IconCode aria-hidden="true" className="h-4 w-4" />
              Tecnologias que dominamos
            </p>
          </Reveal>

          <Reveal
            as="h2"
            delay={0.08}
            className="mt-5 text-center font-display text-3xl font-bold tracking-tight text-navy-800 sm:text-4xl"
          >
            Tecnologia que transforma ideias em{" "}
            <span className="text-brand-500">resultados.</span>
          </Reveal>

          <Reveal delay={0.14}>
            <p className="mx-auto mt-4 max-w-xl text-center text-slate-500">
              Ferramentas modernas, confiáveis e escaláveis para construir
              produtos rápidos, seguros e prontos para crescer junto com o seu
              negócio.
            </p>
          </Reveal>

          <StaggerGroup className="mt-12 flex flex-col gap-4">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <StaggerItem key={cat.title}>
                  <article className="card-hover grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-soft sm:p-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-10">
                    <div className="flex items-start gap-5">
                      <span
                        className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-soft`}
                      >
                        <Icon className="h-6 w-6" />
                      </span>
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-semibold text-navy-800">
                          {cat.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
                          {cat.desc}
                        </p>
                      </div>
                    </div>

                    <ul className="flex flex-wrap justify-center gap-1 border-t border-slate-200/80 pt-4 sm:gap-2 lg:w-[27rem] lg:justify-end lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                      {cat.techs.map((tech) => (
                        <TechLogo key={tech.name} tech={tech} />
                      ))}
                    </ul>
                  </article>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
