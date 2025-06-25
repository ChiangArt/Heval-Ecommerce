import Link from "next/link";

export default function PagoSuccessful () {
  return (
    <div className="text-center mt-10">
      <h1 className="text-2xl font-bold text-red-600">¡Gracias por tu compra!</h1>
      <p className="mt-4">El pago fue realizado correctamente</p>
      <Link href={"/"}>CONTINUAR</Link>
    </div>
  );
}