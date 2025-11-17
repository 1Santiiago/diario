import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <div
      className="
        min-h-screen 
        bg-linear-to-br from-blue-50 via-purple-50 to-white
        dark:bg-linear-to-br dark:from-gray-900 dark:via-black dark:to-gray-900
        flex flex-col
      "
    >
      {/* NAVBAR */}
      <header
        className="
          sticky top-0 z-20 
          w-full 
          backdrop-blur-lg 
          bg-white/40 dark:bg-black/40 
          border-b border-black/10 dark:border-white/10
          px-6 py-4 
          flex justify-between items-center
        "
      >
        <h1
          className="
            text-xl font-semibold 
            bg-linear-to-r from-blue-600 to-purple-600 
            bg-clip-text text-transparent
            tracking-tight
          "
        >
          Diário de Leitura
        </h1>

        <div className="flex items-center gap-4">
          <SignedOut>
            <SignInButton>
              <Button variant="default">Entrar</Button>
            </SignInButton>
          </SignedOut>

          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </header>

      {/* MAIN */}
      <main className="flex flex-1 items-center justify-center px-4">
        <Card
          className="
            max-w-md w-full 
            shadow-xl 
            border border-black/10 dark:border-white/10 
            backdrop-blur-xl 
            bg-white/60 dark:bg-black/60
          "
        >
          <CardHeader>
            <CardTitle
              className="
                text-center text-3xl font-bold 
                bg-linear-to-r from-blue-600 to-purple-600 
                bg-clip-text text-transparent
              "
            >
              Bem-vindo ao seu Diário 📚
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center text-gray-700 dark:text-gray-300">
            <p>
              Registre suas leituras, acompanhe seu progresso e descubra novas
              histórias.
            </p>

            <div className="mt-6">
              <SignedOut>
                <SignInButton>
                  <Button className="w-full">Começar agora</Button>
                </SignInButton>
              </SignedOut>

              <SignedIn>
                <Link href="/dashboard">
                  <Button className="w-full" variant="secondary">
                    Ir para o Dashboard
                  </Button>
                </Link>
              </SignedIn>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
