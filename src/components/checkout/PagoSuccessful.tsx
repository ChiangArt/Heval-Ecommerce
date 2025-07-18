import Button from "../ui/button/Button";

interface Props{
  onClose: () => void;
}

export default function PagoSuccessful({ onClose }: Props) {
  return (
    <div className="text-center text-sm text-secundario p-10">
      <h1 className="text-xl font-bold">¡Gracias por tu compra!</h1>
      <p>El pago fue realizado correctamente</p>
      <p className="p-2 mt-10 bg-[rgba(232,227,222,0.40)]">Estamos preparando tu pedido para enviarlo. Te notificaremos a tu correo cuando haya sido enviado. </p>
      <Button title="CONTINUAR" onClick={onClose} className="bg-secundario w-full mt-4 text-white"/>

    </div>
  );
}
