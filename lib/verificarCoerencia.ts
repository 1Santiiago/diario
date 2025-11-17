"use server";

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { GoogleGenAI, GenerateContentResponse, Model } from "@google/genai";

// Tipagem para o livro
interface Livro {
  id: string;
  titulo: string;
  descricao_capa: string;
  momento_marcante: string;
  analise_critica: string;
  comentario_final: string;
}

export async function verificarCoerencia(livroId: string): Promise<string> {
  if (!livroId) return "ID do livro não fornecido.";

  const supabase: SupabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  const { data: livro, error: fetchError } = (await supabase
    .from("livros")
    .select("*")
    .eq("id", livroId)
    .single()) as { data: Livro | null; error: any };

  if (fetchError || !livro) {
    console.error("Erro ao buscar livro:", fetchError);
    return "Livro não encontrado.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

    // Lista modelos disponíveis
    const pager = await ai.models.list();
    const modelos: Model[] = [];
    for await (const modelo of pager) modelos.push(modelo);

    const modelosValidos = modelos.filter(
      (m) =>
        m.name?.startsWith("models/gemini") && !m.name?.includes("embedding")
    );

    if (modelosValidos.length === 0) return "Nenhum modelo de IA disponível.";

    const modeloValido = modelosValidos[0].name;
    if (!modeloValido) return "Nenhum modelo de IA disponível.";

    // Chamada real à IA
    const resposta: GenerateContentResponse = await ai.models.generateContent({
      model: modeloValido,
      contents: `
Analise se as respostas fornecidas pelo usuário correspondem ao tema do livro.

Título: ${livro.titulo}
Descrição da capa: ${livro.descricao_capa}
Momento marcante: ${livro.momento_marcante}
Análise crítica: ${livro.analise_critica}
Comentário final: ${livro.comentario_final}

Responda:
- A resposta do usuário está coerente com o tema do livro? (SIM/NÃO)
- Explique em 3–4 linhas.
      `,
    });

    return resposta.text ?? "Resposta da IA vazia.";
  } catch (e: any) {
    console.error("Erro na chamada Gemini:", e);

    // Tratamento de limite de cota
    if (e?.status === 429) {
      return "Limite de cota da API excedido. Tente novamente mais tarde.";
    }

    return "Erro ao verificar coerência com a IA.";
  }
}
