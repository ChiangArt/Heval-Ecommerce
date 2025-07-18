import { useRouter } from "next/navigation";
import { useOverlayStore } from "@/store/ui/use-overlay-store";
import { retryOrderFromFailedPayment } from "@/core/order/action/order.actions";

interface Props {
  onClose: () => void;
  externalReference: string;
}

export default function FailedPayment({ onClose, externalReference }: Props) {
  const router = useRouter();
  const { showOverlay, hideOverlay } = useOverlayStore();

  const handleRetry = async () => {
    try {
      showOverlay();
      await retryOrderFromFailedPayment(externalReference);
      router.push("/checkout");
    } catch (err) {
      console.error("Error reintentando la orden:", err);
    } finally {
      hideOverlay();
      onClose(); 
    }
  };

  return (
    <div className="text-center text-sm text-secundario p-10">
      <h1 className="text-xl font-bold">¡Lastimosamente no se procesó el pago!</h1>
      <p>Intenta nuevamente</p>

      <button onClick={handleRetry} className="bg-secundario w-full mt-4 text-white py-2 font-bold cursor-pointer">
        INTENTAR NUEVAMENTE
      </button>
    </div>
  );
}
