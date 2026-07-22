import {
  IconPhoneCall,
  IconMail,
  IconMapPin,
  IconInstagram,
  IconLinkedin,
  IconWhatsApp,
} from "./icons";

const nav = {
  Navegação: ["Início", "Soluções", "Projetos", "Como funciona", "Sobre nós", "Blog"],
  Soluções: [
    "Sites",
    "Sistemas de gestão",
    "Automação de WhatsApp",
    "Agendamento online",
    "Integrações",
    "Aplicativos",
  ],
};

const contacts = [
  { icon: IconPhoneCall, text: "(12) 98234-5678" },
  { icon: IconMail, text: "contato@vexsoftware.com.br" },
  { icon: IconMapPin, text: "Taubaté - SP" },
];

const socials = [
  { icon: IconInstagram, label: "Instagram" },
  { icon: IconLinkedin, label: "LinkedIn" },
  { icon: IconWhatsApp, label: "WhatsApp" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-navy-900 pt-16 text-slate-400">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-10">
        <div className="grid gap-12 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
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

          {/* Nav columns */}
          {Object.entries(nav).map(([title, items]) => (
            <div key={title}>
              <h3 className="font-display text-sm font-semibold text-white">{title}</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="transition-colors hover:text-brand-400">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

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
            <div className="mt-5 flex gap-3">
              {socials.map((s) => {
                const Icon = s.icon;
                return (
                  <a
                    key={s.label}
                    href="#"
                    aria-label={s.label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-slate-300 ring-1 ring-white/10 transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:text-white"
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
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
