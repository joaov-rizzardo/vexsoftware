import Link from "next/link";
import type { ReactNode } from "react";
import { IconArrowRight } from "./icons";

/** Casca compartilhada pelas páginas de política de privacidade e termos de uso. */
export default function LegalPage({
  title,
  updatedAt,
  children,
}: {
  title: string;
  updatedAt: string;
  children: ReactNode;
}) {
  return (
    <main className="bg-white">
      <div className="relative overflow-hidden bg-[radial-gradient(120%_120%_at_20%_0%,#12275a_0%,#0a1124_45%,#060b1a_100%)] pb-14 pt-12 text-white">
        <div className="bg-grid pointer-events-none absolute inset-0 bg-radial-fade" />
        <div className="relative container-narrow">
          <Link href="/" className="flex flex-col leading-none" aria-label="VEX Software">
            <span className="font-display text-2xl font-bold tracking-[0.35em] text-white">
              VEX
            </span>
            <span className="text-[0.55rem] tracking-[0.5em] text-slate-400">
              SOFTWARE
            </span>
          </Link>

          <h1 className="mt-10 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Última atualização: {updatedAt}
          </p>
        </div>
      </div>

      <div className="container-narrow py-14">
        <div className="space-y-10 text-slate-600 [&_a]:text-brand-600 [&_a]:underline [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-navy-800 [&_li]:leading-relaxed [&_p]:leading-relaxed [&_section>*+*]:mt-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>

        <Link
          href="/"
          className="group mt-12 inline-flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-0.5 hover:bg-brand-500"
        >
          Voltar para a página inicial
          <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </main>
  );
}
