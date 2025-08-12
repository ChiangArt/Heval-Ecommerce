import ClientLoginPage from "@/components/login/ClientLoginPage";

export default function LoginPage({ searchParams }: { searchParams: { from?: string } }) {
  const from = typeof searchParams.from === "string" ? searchParams.from : "/";

  return <ClientLoginPage from={from} />;
}
