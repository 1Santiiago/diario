"use client";

import { useState } from "react";
import { verificarCoerencia } from "@/lib/verificarCoerencia";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

export function LivroCard({ livro }: { livro: any }) {
  const [resultado, setResultado] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleVerificar() {
    setLoading(true);
    const texto = await verificarCoerencia(livro.id);
    setResultado(texto);
    setLoading(false);
  }

  return (
    <Card className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="px-6 py-4">
        <CardTitle
          className="
            font-semibold text-xl
            bg-linear-to-r from-blue-600 to-purple-600
            bg-clip-text text-transparent
            tracking-tight
          "
        >
          {livro.titulo}
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground">
          por {livro.autor}
        </CardDescription>
      </CardHeader>

      <CardContent className="px-6 py-2 space-y-2 text-sm text-gray-700 dark:text-gray-300">
        <p>
          <strong>Páginas:</strong> {livro.paginas}
        </p>
        <p>
          <strong>Editora:</strong> {livro.editora}
        </p>
        <div>
          <strong>Descrição da capa:</strong>
          <p className="line-clamp-3">{livro.descricao_capa}</p>
        </div>
        <div>
          <strong>Momento marcante:</strong>
          <p className="line-clamp-3">{livro.momento_marcante}</p>
        </div>
        <div>
          <strong>Análise crítica:</strong>
          <p className="line-clamp-3">{livro.analisec_critica}</p>
        </div>
        <div>
          <strong>Comentário final:</strong>
          <p className="line-clamp-3">{livro.comentario_final}</p>
        </div>
      </CardContent>

      <CardFooter className="px-6 py-4 flex flex-col gap-2">
        <button
          onClick={handleVerificar}
          disabled={loading}
          className="flex items-center gap-2 text-sm font-semibold
            hover:text-blue-600 dark:hover:text-blue-400
            transition-colors"
        >
          <div className={`w-5 h-5 ${loading ? "animate-spin" : ""}`}>
            <Image
              src="/gem.png"
              alt="Gemini"
              width={20}
              height={20}
              className="object-contain"
            />
          </div>
          {loading ? "Verificando..." : "Analisar com Gemini"}
        </button>

        {resultado && (
          <p className="text-xs text-green-700 dark:text-green-400">
            {resultado}
          </p>
        )}

        <p className="text-xs text-muted-foreground">
          Entregue: {new Date(livro.created_at).toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
}
