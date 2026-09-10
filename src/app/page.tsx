import { randomArticle, topics } from "@/lib/db/pool";
import { TEXTOS } from "@/lib/i18n";
import { idiomaDaRequisicao } from "@/lib/idioma-servidor";
import Reader from "./reader";

export const runtime = "nodejs";
// O primeiro artigo é sorteado a cada visita, então a página não é estática.
export const dynamic = "force-dynamic";

export default async function Home() {
  const idioma = await idiomaDaRequisicao();
  const t = TEXTOS[idioma];
  const initial = randomArticle();

  if (!initial) {
    return (
      <main className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center gap-3 px-6 text-center">
        <h1 className="font-serif text-2xl">{t.poolVazioTitulo}</h1>
        <p className="text-sm text-muted">{t.poolVazioInstrucao}</p>
        <code className="rounded-lg border border-edge bg-surface px-4 py-3 text-sm text-accent">
          npm run ingest:unusual
        </code>
      </main>
    );
  }

  // O primeiro artigo e a lista de temas vêm renderizados do servidor: a tela
  // abre com conteúdo, sem estado de carregamento e sem um request extra só
  // para preencher o seletor. O idioma vai junto pelo mesmo motivo — sem ele o
  // cliente renderizaria em outro idioma antes de hidratar.
  return <Reader initial={initial} topics={topics()} idioma={idioma} />;
}
