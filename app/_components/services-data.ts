import type { ComponentType, SVGProps } from "react";
import {
  IconGlobe,
  IconMonitor,
  IconCalendar,
  IconChat,
  IconWrench,
  IconBars,
  IconPhone,
  IconUsersGear,
} from "./icons";

/**
 * Fonte única do catálogo de serviços.
 *
 * Consumida pelo componente `Services` e pelo JSON-LD (`OfferCatalog`).
 */
export type Service = {
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  title: string;
  desc: string;
};

export const services: Service[] = [
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
    icon: IconWrench,
    title: "Manutenção e evolução",
    desc: "Corrigimos bugs, atualizamos e adicionamos novas funcionalidades a sites e sistemas que já existem.",
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
