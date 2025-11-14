/** @type {import('next').NextConfig} */
const nextConfig = {
  // ...suas outras configs (se tiver)
};

// --- TESTE DE DIAGNÓSTICO ---
// Vamos imprimir a variável EXATAMENTE como o processo de build da Vercel a vê.
console.log("--- INICIANDO TESTE DE BUILD NA VERCEL ---");
console.log(
  "Minha Chave Pública (lida pelo Next.js):",
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
);
console.log("------------------------------------------");

module.exports = nextConfig;
