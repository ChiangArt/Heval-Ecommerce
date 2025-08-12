"use client";

import Modal from "@/components/ui/modal/Modal";
import PagoSuccessful from "@/components/checkout/PagoSuccessful";
import OrderDetails from "@/components/order/OrderDetails";
import { useEffect, useState } from "react";
// import { useSearchParams } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { Order } from "@/core/order/interface/order";
import { getOrderById } from "@/core/order/action/order.actions";
import OrderSummary from "@/components/order/OrderSummary";
import { useOverlayStore } from "@/store/ui/use-overlay-store";

interface JwtPayload {
  name: string;
  sub: string;
  email: string;
}

export default function CheckoutSuccessPage() {
  const { showOverlay, hideOverlay } = useOverlayStore();

  const [isSuccess, setIsSuccess] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [userName, setUserName] = useState("");

  // const searchParams = useSearchParams();
  // const externalReference = searchParams.get("external_reference"); // orderId

  useEffect(() => {
    setIsSuccess(true);

    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode<JwtPayload>(token);
      setUserName(decoded.name);
    }
  }, []);

  const handleClose = async () => {
    setIsSuccess(false);
    setShowDetails(true);

    showOverlay(); 

    try {
      // if (!externalReference) throw new Error("No hay external_reference");
      const order = await getOrderById(`externalReference`);
      setOrder(order);
    } catch (error) {
      console.error("Error al obtener la orden:", error);
    } finally {
      hideOverlay(); 
    }
  };

  return (
    <>
      <Modal isOpen={isSuccess} onClose={handleClose}>
        <PagoSuccessful onClose={handleClose} />
      </Modal>

      {showDetails && order && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-4 pt-30 max-w-7xl mx-auto">
          <OrderDetails order={order} userName={userName} />
          <OrderSummary order={order} />
        </div>
      )}
    </>
  );
}
