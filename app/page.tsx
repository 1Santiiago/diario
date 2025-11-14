import { UserButton, SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      {/* NAVBAR */}
      <header className="flex justify-between items-center px-6 py-4 bg-background/60 backdrop-blur border-b">
        <h1 className="text-xl font-semibold tracking-tight">
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
        <Card className="max-w-md w-full shadow-md">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Bem-vindo ao seu Diário 📚
            </CardTitle>
          </CardHeader>

          <CardContent className="text-center text-muted-foreground">
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
                <Button className="w-full" variant="secondary">
                  Ir para dashboard
                </Button>
              </SignedIn>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
