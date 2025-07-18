"use client";

import { Wallet, initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect } from "react";

interface PaymentFormProps {
  preferenceId: string | null;
}

export default function PaymentForm({ preferenceId }: PaymentFormProps) {
  useEffect(() => {
    // Inicializa Mercado Pago
    initMercadoPago("APP_USR-be9ab63c-e140-49c2-9ca5-b1441a4cf678", {
      locale: "es-PE", // Puedes ajustar el idioma y región
    });
  }, []);

  return (
    <div className="bg-white">
      <div className="flex flex-row items-center gap-2 border-b-2 pb-4 mb-10">
        <span className="p-1 px-3 bg-primario text-white text-lg font-semibold">
          3
        </span>
        <h2 className="font-bold">Revisa y confirma tu compra</h2>
      </div>

      <h3 className="font-bold pb-3">MEDIOS DE PAGO</h3>

      {preferenceId ? (
        <>
          {console.log("Preference ID:", preferenceId)}
          <div className="w-full mt-6">
            <Wallet initialization={{ preferenceId }} />
          </div>
        </>
      ) : (
        <p className="text-sm text-gray-500">Cargando opciones de pago...</p>
      )}
    </div>
  );
}
