import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function ConsumerInformation() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 text-center gap-10">
      <div className="flex flex-col items-center gap-5">
        <Image
          width={110}
          height={110}
          src={"/heval.png"}
          alt="Heval"
          className="bg-black"
        />
        <p className="text-gray-700">
          Copyright {new Date().getFullYear()}, Heval®
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-extrabold pb-5">Información Legal</p>
        <Link href={"/"}>Políticas de privacidad</Link>
        <Link href={"/"}>Términos y condiciones de compra</Link>
      </div>
      <div className="flex flex-col gap-3">
        <p className="font-extrabold pb-5">Información util para el cliente</p>
        <Link href={"/"}>Envíos y devoluciones</Link>
        <Link href={"/"}>Seguimiento de pedidos</Link>
      </div>
      <div className="flex justify-center items-center">
        <Image
          src={"/libro-reclamaciones.jpg"}
          width={200}
          height={200}
          alt="Libro de reclamaciones"
        />
      </div>
    </div>
  );
}
