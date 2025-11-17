import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
import { createClient } from "@supabase/supabase-js";
import { revalidatePath } from "next/cache";
import { UserButton } from "@clerk/nextjs";
import { FormularioDialog } from "@/components/Formulario";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const supabase = supabaseServer();
  const { data: livros } = await supabase
    .from("livros")
    .select("*")
    .eq("user_id", userId);

  async function adicionarLivro(formData: FormData) {
    "use server";

    const titulo = formData.get("titulo");
    const autor = formData.get("autor");
    const paginas = formData.get("paginas");
    const editora = formData.get("editora");

    const descricao_capa = formData.get("descricao_capa");
    const momento_marcante = formData.get("momento_marcante");
    const analise_critica = formData.get("analise_critica");
    const comentario_final = formData.get("comentario_final");
    console.log("FORMDATA:", Object.fromEntries(formData));

    const { userId } = await auth();
    if (!userId) return;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    const { error } = await supabase.from("livros").insert({
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
    if (error) console.error("Erro ao adicionar livro:", error);
    revalidatePath("/dashboard");
  }

  return (
    <div
      className="
      min-h-screen 
      bg-linear-to-br from-blue-50 via-white to-purple-50
      dark:from-gray-900 dark:via-gray-950 dark:to-black
      p-6
    "
    >
      {/* WRAPPER CENTRAL */}
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <header
          className="
          sticky top-0 z-20 
          backdrop-blur-xl 
          bg-white/60 dark:bg-black/40
          border-b border-border 
          rounded-xl
        "
        >
          <div
            className="
            px-6 py-4
            flex flex-col md:flex-row 
            items-center justify-between
            gap-4
          "
          >
            {/* Título */}
            <div className="text-center md:text-left">
              <h1
                className="
                text-2xl md:text-3xl font-semibold
                bg-linear-to-r from-blue-600 to-purple-600
                bg-clip-text text-transparent
              "
              >
                Meu Diário de Leitura
              </h1>
              <p className="text-sm text-muted-foreground">
                Registre, organize e acompanhe seus livros.
              </p>
            </div>

            {/* Ações */}
            <div className="flex items-center gap-3">
              <FormularioDialog action={adicionarLivro} />
              <UserButton />
            </div>
          </div>
        </header>

        {/* LISTA DE LIVROS */}
        <main className="mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {livros && livros.length > 0 ? (
              livros.map((livro) => (
                <Card
                  key={livro.id}
                  className="
                  group
                  transition-all
                  hover:shadow-xl hover:-translate-y-1
                  border border-border/50
                  bg-white dark:bg-gray-900
                "
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold">
                      {livro.titulo}
                    </CardTitle>
                    <CardDescription>por {livro.autor}</CardDescription>
                  </CardHeader>

                  <CardContent className="space-y-3 text-sm">
                    <p className="text-muted-foreground">
                      <strong>Páginas:</strong> {livro.paginas}
                    </p>

                    <p className="text-muted-foreground">
                      <strong>Editora:</strong> {livro.editora}
                    </p>

                    <div>
                      <strong className="block">Descrição da capa:</strong>
                      <p className="line-clamp-3">{livro.descricao_capa}</p>
                    </div>

                    <div>
                      <strong className="block">Momento marcante:</strong>
                      <p className="line-clamp-3">{livro.momento_marcante}</p>
                    </div>

                    <div>
                      <strong className="block">Análise crítica:</strong>
                      <p className="line-clamp-3">{livro.analise_critica}</p>
                    </div>

                    <div>
                      <strong className="block">Comentário final:</strong>
                      <p className="line-clamp-3">{livro.comentario_final}</p>
                    </div>
                  </CardContent>

                  <CardFooter className="flex justify-between items-center border-t pt-4">
                    <p className="text-xs text-muted-foreground">
                      Adicionado em:{" "}
                      {new Date(livro.created_at).toLocaleDateString()}
                    </p>

                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                      <button className="text-xs text-blue-600 hover:underline">
                        Editar
                      </button>
                      <button className="text-xs text-red-500 hover:underline">
                        Excluir
                      </button>
                    </div>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center p-8 border-2 border-dashed rounded-xl backdrop-blur-sm bg-white/40 dark:bg-black/20">
                <p className="text-gray-800 dark:text-gray-200">
                  Nenhum livro encontrado.
                </p>
                <p className="text-sm text-muted-foreground">
                  Clique em “Novo Livro” para adicionar o primeiro.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
