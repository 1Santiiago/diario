import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  // Se for rota protegida, obrigar login
  if (isProtectedRoute(req)) {
    await auth(); // Isso já força autenticação
  }
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/dashboard(.*)"],
};
