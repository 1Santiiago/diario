import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { userId }: any = auth();

  if (!userId) redirect("/sign-in");

  const supabase = supabaseServer();

  // exemplo: buscar dados
  // const { data } = await supabase.from("livros").select("*");

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Bem-vindo, usuário {userId}</p>
    </div>
  );
}
