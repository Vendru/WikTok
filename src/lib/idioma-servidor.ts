import "server-only";
import { cookies } from "next/headers";
import { COOKIE_IDIOMA, IDIOMA_PADRAO, type Idioma, ehIdioma } from "./i18n";

/**
 * Idioma da interface pedido pelo visitante, lido do cookie.
 *
 * Lido no servidor de propósito: a página é `force-dynamic` e já renderiza por
 * request, então dá para mandar o HTML no idioma certo de saída. Resolver isso
 * só no cliente faria a tela abrir em um idioma e trocar depois da hidratação,
 * que é justamente o tipo de piscada que se nota num app de um clique.
 */
export async function idiomaDaRequisicao(): Promise<Idioma> {
  const valor = (await cookies()).get(COOKIE_IDIOMA)?.value;
  return ehIdioma(valor) ? valor : IDIOMA_PADRAO;
}
