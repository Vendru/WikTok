/**
 * Textos da interface, em português e inglês.
 *
 * Só a interface: o conteúdo dos artigos continua vindo do pool no idioma da
 * wiki ingerida (`WIKI_LANG`), que é outra coisa e não muda com este seletor.
 * Um leitor pode querer a interface em português lendo artigos em inglês.
 *
 * Sem `import` de nada: este módulo é carregado tanto pelo componente de
 * cliente quanto pelo servidor, e qualquer dependência de `node:` quebraria o
 * pacote do navegador — foi o que já aconteceu uma vez com os modos.
 */

export const IDIOMAS = ["pt", "en"] as const;
export type Idioma = (typeof IDIOMAS)[number];

export const IDIOMA_PADRAO: Idioma = "pt";

/** Nome do cookie que guarda a escolha. Lido no servidor, escrito no cliente. */
export const COOKIE_IDIOMA = "wiktok_idioma";

export const ehIdioma = (v: unknown): v is Idioma =>
  typeof v === "string" && (IDIOMAS as readonly string[]).includes(v);

/** Locale completo, para `<html lang>` e formatação de número. */
export const LOCALE: Record<Idioma, string> = { pt: "pt-BR", en: "en" };

/** Como cada idioma se chama em si mesmo, que é a convenção de seletor. */
export const NOME_DO_IDIOMA: Record<Idioma, string> = {
  pt: "Português",
  en: "English",
};

export interface Textos {
  titulo: string;
  descricao: string;
  autoria: string;
  tema: string;
  modo: string;
  idioma: string;
  surpreendaMe: string;
  modos: { mixed: string; quality: string; surprise: string };
  /**
   * Rótulo de tema por slug.
   *
   * Vem daqui e não da tabela `topics` de propósito: traduzir no banco
   * obrigaria a regerar e versionar de novo os 66 MB do pool a cada idioma
   * novo. O slug é identificador estável; o rótulo é apresentação.
   */
  temas: Record<string, string>;
  lerNaWikipedia: string;
  anterior: string;
  outroArtigo: string;
  buscando: string;
  tentarDeNovo: string;
  dicaTeclado: string;
  conteudoDa: string;
  wikipedia: string;
  sobALicenca: string;
  licencaUrl: string;
  erroSemArtigo: string;
  erroSemResposta: string;
  erroTemaEsgotado: string;
  erroPoolVazio: string;
  /** Recebe o status HTTP quando ele não é um dos casos conhecidos. */
  erroGenerico: (status: number) => string;
  sugestaoTema: string;
  poolVazioTitulo: string;
  poolVazioInstrucao: string;
}

export const TEXTOS: Record<Idioma, Textos> = {
  pt: {
    titulo: "WikTok — um artigo interessante por vez",
    descricao:
      "Descubra artigos peculiares e fascinantes da Wikipédia, um de cada vez.",
    autoria: "Código e outros projetos no GitHub",
    tema: "Tema",
    modo: "Modo",
    idioma: "Idioma da interface",
    surpreendaMe: "Surpreenda-me",
    modos: {
      mixed: "Equilibrado",
      quality: "Mais completos",
      surprise: "Mais obscuros",
    },
    temas: {
      cultura: "Cultura e artes",
      ciencia: "Ciência",
      lugares: "Lugares",
      sociedade: "Sociedade",
      esportes: "Esportes",
      tecnologia: "Tecnologia",
      lingua: "Língua",
      militar: "Militar",
      historia: "História",
      comida: "Comida",
      religiao: "Religião",
      matematica: "Matemática",
      folclore: "Folclore",
      morte: "Morte",
    },
    lerNaWikipedia: "Ler na Wikipédia →",
    anterior: "← Anterior",
    outroArtigo: "Outro artigo",
    buscando: "Buscando…",
    tentarDeNovo: "Tentar de novo",
    dicaTeclado: "Use ← e → ou espaço para navegar.",
    conteudoDa: "Conteúdo da",
    wikipedia: "Wikipédia",
    sobALicenca: ", sob a licença",
    licencaUrl: "https://creativecommons.org/licenses/by-sa/4.0/deed.pt-BR",
    erroSemArtigo: "A resposta veio sem artigo.",
    erroSemResposta: "Sem resposta do servidor.",
    erroTemaEsgotado: "Nenhum artigo para este tema neste modo.",
    erroPoolVazio: "O acervo está vazio.",
    erroGenerico: (status) => `A busca falhou (${status}).`,
    sugestaoTema: " Tente outro tema ou volte para “Surpreenda-me”.",
    poolVazioTitulo: "Acervo vazio",
    poolVazioInstrucao: "Rode a ingestão antes de subir o app:",
  },
  en: {
    titulo: "WikTok — one interesting article at a time",
    descricao:
      "Discover unusual and fascinating Wikipedia articles, one at a time.",
    autoria: "Code and other projects on GitHub",
    tema: "Topic",
    modo: "Mode",
    idioma: "Interface language",
    surpreendaMe: "Surprise me",
    modos: {
      mixed: "Balanced",
      quality: "Most developed",
      surprise: "Most obscure",
    },
    temas: {
      cultura: "Culture & arts",
      ciencia: "Science",
      lugares: "Places",
      sociedade: "Society",
      esportes: "Sports",
      tecnologia: "Technology",
      lingua: "Language",
      militar: "Military",
      historia: "History",
      comida: "Food",
      religiao: "Religion",
      matematica: "Mathematics",
      folclore: "Folklore",
      morte: "Death",
    },
    lerNaWikipedia: "Read on Wikipedia →",
    anterior: "← Previous",
    outroArtigo: "Another article",
    buscando: "Loading…",
    tentarDeNovo: "Try again",
    dicaTeclado: "Use ← and → or space to navigate.",
    conteudoDa: "Content from",
    wikipedia: "Wikipedia",
    sobALicenca: ", licensed",
    licencaUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
    erroSemArtigo: "The response came back without an article.",
    erroSemResposta: "No response from the server.",
    erroTemaEsgotado: "No articles for this topic in this mode.",
    erroPoolVazio: "The pool is empty.",
    erroGenerico: (status) => `The request failed (${status}).`,
    sugestaoTema: " Try another topic, or go back to “Surprise me”.",
    poolVazioTitulo: "Empty pool",
    poolVazioInstrucao: "Run the ingestion before starting the app:",
  },
};

/** Rótulo do tema, caindo para o do banco se o slug for novo no config. */
export function rotuloDoTema(
  idioma: Idioma,
  slug: string,
  doBanco: string,
): string {
  return TEXTOS[idioma].temas[slug] ?? doBanco;
}
