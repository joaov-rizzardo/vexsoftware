import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "VEX Software — Tecnologia que faz sua empresa crescer",
  description:
    "Criamos sites, sistemas e automações para pequenas e médias empresas que querem profissionalizar seu negócio sem complicação.",
  keywords: [
    "software sob medida",
    "sistemas de gestão",
    "automação de WhatsApp",
    "desenvolvimento de sites",
    "aplicativos",
  ],
  openGraph: {
    title: "VEX Software — Tecnologia que faz sua empresa crescer",
    description:
      "Sites, sistemas e automações para pequenas e médias empresas venderem mais e economizarem tempo.",
    type: "website",
    locale: "pt_BR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${inter.variable} antialiased`}
    >
      <body className="min-h-screen bg-white text-[color:var(--foreground)]">
        {children}
      </body>
    </html>
  );
}
