import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClientLoginPage = dynamic(() => import("@/components/login/ClientLoginPage"), {
  ssr: false,
});

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ClientLoginPage />
    </Suspense>
  );
}
