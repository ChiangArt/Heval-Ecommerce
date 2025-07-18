import React from "react";
import {  Wallet } from "@mercadopago/sdk-react";

interface Props {
  preferenceId: string;
}

const CheckoutButton = ({ preferenceId }: Props) => {


  return (
    <div className="mt-6">
      {/* Reemplaza el botón nativo por el de Mercado Pago */}
      <div className="w-full">
        <Wallet initialization={{ preferenceId }} />
      </div>
    </div>
  );
};

export default CheckoutButton;
