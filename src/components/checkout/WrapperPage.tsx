import CheckoutFailedPage from "@/app/(home)/shop/checkout/failure/page";
import { Suspense } from "react";

export default function WrapperPage() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <CheckoutFailedPage />
    </Suspense>
  );
}
