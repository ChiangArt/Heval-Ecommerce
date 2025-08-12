import ClientLoginPage from "@/components/login/ClientLoginPage";

export default function LoginPage({ searchParams }: { searchParams: { from?: string } }) {
  // Obtener "from" de los parámetros de URL o fallback a "/"
  const from = searchParams.from || "/";

  // Pasar "from" como prop al componente cliente
  return <ClientLoginPage from={from} />;
}
