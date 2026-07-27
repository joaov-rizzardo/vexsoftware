import { IconPhoneCall, IconMail, IconMapPin, IconWhatsApp } from "./icons";
import { links } from "./nav-links";

const navLinks = links.filter((link) => link.label !== "Soluções");

const contacts = [
  { icon: IconPhoneCall, text: "(12) 99709-6351" },
  { icon: IconMail, text: "contato@vexsoftware.com.br" },
  { icon: IconMapPin, text: "Cachoeira Paulista - SP" },
];

const WHATSAPP_PHONE = "5512997096351";
const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site da VEX Software e gostaria de solicitar um orçamento.";
const WHATSAPP_HREF = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 pt-16 text-slate-400">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative container-page">
        <div className="grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-2xl font-bold tracking-[0.35em] text-white">
                VEX
              </span>
              <span className="text-[0.55rem] tracking-[0.5em] text-slate-500">
                SOFTWARE
              </span>
            </div>
            <p className="mt-5 max-w-xs text-sm leading-relaxed">
              Traduzimos a necessidade do seu negócio em soluções tecnológicas viáveis
              que geram resultados de verdade.
            </p>
          </div>

          {/* Navegação */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white">Navegação</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="transition-colors hover:text-brand-400">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-sm font-semibold text-white">Contato</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {contacts.map((c) => {
                const Icon = c.icon;
                return (
                  <li key={c.text} className="flex items-center gap-3">
                    <Icon className="h-4 w-4 text-brand-400" />
                    {c.text}
                  </li>
                );
              })}
            </ul>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-gradient-to-br from-accent-400 to-accent-500 px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-green-900/30 transition-all hover:-translate-y-0.5 hover:shadow-green-500/40"
            >
              <IconWhatsApp className="h-4 w-4" />
              Falar no WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs text-slate-500 sm:flex-row">
          <p>© {new Date().getFullYear()} VEX Software. Todos os direitos reservados.</p>
          <p className="flex gap-4">
            <a href="#" className="hover:text-slate-300">Política de privacidade</a>
            <a href="#" className="hover:text-slate-300">Termos de uso</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
