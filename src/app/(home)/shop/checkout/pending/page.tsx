
import Link from 'next/link';
import React from 'react';

const PagoPendiente = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-6">
      <h1 className="text-3xl font-bold text-yellow-600 mb-4">
        🕓 Pago pendiente
      </h1>
      <p className="text-gray-700 mb-6">
        Tu pago está siendo procesado. Te enviaremos un correo cuando se confirme.
      </p>
      <Link href="/shop" className="text-blue-600 hover:underline">
        Volver a la tienda
      </Link>
    </div>
  );
};

export default PagoPendiente;
