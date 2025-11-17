"use server";

import { createClient } from "@supabase/supabase-js";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function adicionarLivro(formData: FormData) {
  const titulo = formData.get("titulo");
  const autor = formData.get("autor");
  const paginas = formData.get("paginas");
  const editora = formData.get("editora");
  const descricao_capa = formData.get("descricao_capa");
  const momento_marcante = formData.get("momento_marcante");
  const analise_critica = formData.get("analise_critica");
  const comentario_final = formData.get("comentario_final");

  const { userId } = await auth();
  if (!userId) return;

  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_KEY!
  );

  await supabaseClient.from("livros").insert({
    titulo,
    autor,
    paginas,
    editora,
    descricao_capa,
    momento_marcante,
    analise_critica,
    comentario_final,
    user_id: userId,
  });

  revalidatePath("/dashboard");
}
