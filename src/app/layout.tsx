import type { Metadata } from "next";
import { LOCALE, TEXTOS } from "@/lib/i18n";
import { idiomaDaRequisicao } from "@/lib/idioma-servidor";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const idioma = await idiomaDaRequisicao();
  return {
    title: TEXTOS[idioma].titulo,
    description: TEXTOS[idioma].descricao,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // O `lang` correto importa para leitor de tela e para a tradução automática
  // do navegador não se oferecer a traduzir uma página que já está no idioma
  // do leitor.
  const idioma = await idiomaDaRequisicao();
  return (
    <html lang={LOCALE[idioma]}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
