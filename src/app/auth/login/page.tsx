import { Suspense } from "react";
import ClientLoginPage from "@/components/login/ClientLoginPage";

export const dynamic = "force-dynamic";


export default function LoginPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <ClientLoginPage />
    </Suspense>
  );
}
