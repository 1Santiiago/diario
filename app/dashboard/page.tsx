import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";
import { FormularioDialog } from "@/components/Formulario";
import { UserButton } from "@clerk/nextjs";
import { LivroCard } from "@/components/LivroCard";
import { adicionarLivro } from "@/lib/AdicionarLivro";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId } = await auth();
  if (!userId) redirect("/sign-in");

  const supabase = supabaseServer();
  const { data: livros } = await supabase
    .from("livros")
    .select("*")
    .eq("user_id", userId);

  return (
    <div
      className="min-h-screen p-6  bg-linear-to-br from-blue-50 via-purple-50 to-white
        dark:bg-linear-to-br dark:from-gray-900 dark:via-black dark:to-gray-900
        "
    >
      <div className="max-w-6xl mx-auto">
        <header className="sticky top-0 z-20 backdrop-blur-xl bg-white/60 border-b rounded-xl">
          <div className="px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h1
                className=" text-xl font-semibold
            bg-linear-to-r from-blue-600 to-purple-600
            bg-clip-text text-transparent
            tracking-tight"
              >
                Meu Diário de Leitura
              </h1>
              <p className="text-sm text-muted-foreground">
                Registre, organize e acompanhe seus livros.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <FormularioDialog action={adicionarLivro} />
              <UserButton />
            </div>
          </div>
        </header>

        <main className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {livros?.length ? (
            livros.map((livro) => <LivroCard key={livro.id} livro={livro} />)
          ) : (
            <div className="col-span-full text-center p-8 border-2 border-dashed rounded-xl">
              Nenhum livro encontrado.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
