'use client'
import VerifyCodeForm from "@/components/login/VerifyCodeForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <VerifyCodeForm />
    </Suspense>
  );
}
