import ClientLoginPage from "@/components/login/ClientLoginPage";
import { Suspense } from "react";

export default function LoginWrapper() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ClientLoginPage />
    </Suspense>
  );
}
