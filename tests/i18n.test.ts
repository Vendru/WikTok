import fs from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { CONFIG_DIR } from "../src/lib/config";
import {
  IDIOMAS,
  IDIOMA_PADRAO,
  LOCALE,
  NOME_DO_IDIOMA,
  TEXTOS,
  ehIdioma,
  rotuloDoTema,
} from "../src/lib/i18n";
import { MODOS } from "../src/lib/modes";

// Lido do config, e não de uma lista repetida aqui, para o teste falhar
// quando um tema novo for acrescentado sem tradução — que é o jeito
// silencioso de quebrar isto.
const { temas } = JSON.parse(
  fs.readFileSync(path.join(CONFIG_DIR, "topics.json"), "utf8"),
) as { temas: { slug: string; label: string }[] };

describe("dicionário de textos", () => {
  it("tem exatamente as mesmas chaves em todos os idiomas", () => {
    const referencia = Object.keys(TEXTOS[IDIOMA_PADRAO]).sort();
    for (const idioma of IDIOMAS) {
      expect(Object.keys(TEXTOS[idioma]).sort(), `idioma ${idioma}`).toEqual(
        referencia,
      );
    }
  });

  it("não deixa nenhum texto vazio", () => {
    for (const idioma of IDIOMAS) {
      for (const [chave, valor] of Object.entries(TEXTOS[idioma])) {
        if (typeof valor === "string") {
          expect(valor.trim(), `${idioma}.${chave}`).not.toBe("");
        }
      }
    }
  });

  it("traduz todos os modos de sorteio", () => {
    for (const idioma of IDIOMAS) {
      for (const modo of MODOS) {
        expect(TEXTOS[idioma].modos[modo], `${idioma}.modos.${modo}`).toBeTruthy();
      }
    }
  });

  it("traduz todos os temas que existem no config", () => {
    // Um tema novo em config/topics.json sem entrada aqui cairia no rótulo do
    // banco, que é português, e apareceria sozinho no meio da interface em
    // inglês. É esse desalinhamento que o teste pega.
    for (const idioma of IDIOMAS) {
      for (const { slug } of temas) {
        expect(TEXTOS[idioma].temas[slug], `${idioma}.temas.${slug}`).toBeTruthy();
      }
    }
  });

  it("não guarda tradução para tema que não existe mais", () => {
    const conhecidos = new Set(temas.map((t) => t.slug));
    for (const idioma of IDIOMAS) {
      for (const slug of Object.keys(TEXTOS[idioma].temas)) {
        expect(conhecidos.has(slug), `${idioma}.temas.${slug} é órfão`).toBe(true);
      }
    }
  });

  it("declara locale e nome próprio para cada idioma", () => {
    for (const idioma of IDIOMAS) {
      expect(LOCALE[idioma]).toBeTruthy();
      expect(NOME_DO_IDIOMA[idioma]).toBeTruthy();
    }
  });
});

describe("ehIdioma", () => {
  it("aceita os idiomas conhecidos e recusa o resto", () => {
    for (const i of IDIOMAS) expect(ehIdioma(i)).toBe(true);
    // O valor vem de um cookie, que qualquer um edita.
    for (const lixo of ["fr", "", "PT", null, undefined, 1, {}]) {
      expect(ehIdioma(lixo), String(lixo)).toBe(false);
    }
  });
});

describe("rotuloDoTema", () => {
  it("usa a tradução quando ela existe", () => {
    expect(rotuloDoTema("en", "ciencia", "Ciência")).toBe("Science");
  });

  it("cai para o rótulo do banco quando o slug é desconhecido", () => {
    expect(rotuloDoTema("en", "inexistente", "Do banco")).toBe("Do banco");
  });
});
