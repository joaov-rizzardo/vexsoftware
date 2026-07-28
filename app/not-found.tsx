import type { Metadata } from "next";
import Link from "next/link";
import { IconArrowRight } from "./_components/icons";

// Substitui a antiga rota curinga, que redirecionava tudo para "/" e produzia
// soft-404. Caminho inexistente agora responde 404 de verdade.
export const metadata: Metadata = {
  title: "Página não encontrada",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[radial-gradient(120%_120%_at_20%_0%,#12275a_0%,#0a1124_45%,#060b1a_100%)] text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 bg-radial-fade" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[600px] w-[600px] rounded-full bg-brand-600/20 blur-[130px]" />

      <div className="relative container-narrow flex flex-1 flex-col justify-center py-20">
        <Link href="/" className="flex flex-col leading-none" aria-label="VEX Software">
          <span className="font-display text-2xl font-bold tracking-[0.35em] text-white">
            VEX
          </span>
          <span className="text-[0.55rem] tracking-[0.5em] text-slate-400">
            SOFTWARE
          </span>
        </Link>

        <p className="mt-16 font-display text-6xl font-bold text-brand-400 sm:text-7xl">
          404
        </p>

        <h1 className="mt-4 font-display text-3xl font-bold tracking-tight sm:text-4xl">
          Essa página não existe.
        </h1>

        <p className="mt-4 max-w-md leading-relaxed text-slate-300">
          O endereço pode ter mudado ou o link estar incorreto. Volte para a
          página inicial ou fale com a gente — respondemos rápido.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/"
            className="group flex items-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-medium text-white shadow-lg shadow-blue-900/40 transition-all hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-blue-500/50"
          >
            Voltar para o início
            <IconArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>

          <Link
            href="/#fale-conosco"
            className="flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-medium text-slate-200 ring-1 ring-white/15 transition-all hover:-translate-y-0.5 hover:bg-white/5 hover:text-white"
          >
            Falar com a VEX
          </Link>
        </div>
      </div>
    </main>
  );
}
