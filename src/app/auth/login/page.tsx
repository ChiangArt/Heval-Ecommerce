import ClientLoginPage from "@/components/login/ClientLoginPage";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <ClientLoginPage />
    </Suspense>
  );
}
