import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { UserButton } from "@clerk/nextjs";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Usuário não autenticado.");
  }
  if (!userId) redirect("/sign-in");

  const supabase = supabaseServer();

  const { data: livros } = await supabase
    .from("livros")
    .select("*")
    .eq("user_id", userId); //

  async function adicionarLivro(formData: FormData) {
    "use server";

    const titulo = formData.get("titulo");
    const autor = formData.get("autor");
    const paginas = formData.get("paginas");
    const resumo = formData.get("resumo");

    // PEGAR USER ID (precisa do await)
    const { userId } = await auth();

    if (!userId) {
      console.error("Tentativa de inserir sem user logado");
      return;
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { error } = await supabase.from("livros").insert({
      titulo,
      autor,
      paginas,
      resumo,
      user_id: userId, // AGORA NÃO FICA MAIS NULL
    });

    if (error) {
      console.error("Erro ao adicionar livro:", error);
    }

    revalidatePath("/dashboard");
  }

  return (
    <div className="p-8">
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Meu Diário de Leitura</h1>
        <UserButton />
      </header>

      <main>
        {/* O FORMULÁRIO QUE CHAMA A ACTION */}
        <form
          action={adicionarLivro}
          className="mb-8 p-4 border rounded-lg shadow"
        >
          <h2 className="text-xl mb-4">Adicionar Novo Livro</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              name="titulo"
              placeholder="Título"
              required
              className="p-2 border rounded"
            />
            <input
              type="text"
              name="autor"
              placeholder="Autor"
              className="p-2 border rounded"
            />
            <input
              type="number"
              name="paginas"
              placeholder="Páginas"
              className="p-2 border rounded"
            />
          </div>
          <textarea
            name="resumo"
            placeholder="Resumo..."
            className="w-full mt-4 p-2 border rounded"
          ></textarea>
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Salvar Livro
          </button>
        </form>

        {/* A LISTA DE LIVROS */}
        <div>
          <h2 className="text-xl mb-4">Meus Livros</h2>
          <div className="space-y-4">
            {livros && livros.length > 0 ? (
              livros.map((livro) => (
                <div key={livro.id} className="p-4 border rounded shadow-sm">
                  <h3 className="font-bold text-lg">{livro.titulo}</h3>
                  <p className="text-gray-600">por {livro.autor}</p>
                </div>
              ))
            ) : (
              <p>Você ainda não adicionou nenhum livro.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
