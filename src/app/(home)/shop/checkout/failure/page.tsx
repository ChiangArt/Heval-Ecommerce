"use client";
import Modal from "@/components/ui/modal/Modal";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useOverlayStore } from "@/store/ui/use-overlay-store";
import FailedPayment from "@/components/checkout/FailedPayment";

export default function CheckoutFailedPage() {
  const { showOverlay, hideOverlay } = useOverlayStore();

  const [isSuccess, setIsSuccess] = useState(false);

  const searchParams = useSearchParams();
  const externalReference = searchParams.get("external_reference");

  useEffect(() => {
    if (!externalReference) return;

    showOverlay(); 

    const timeout = setTimeout(() => {
      hideOverlay();       
      setIsSuccess(true);    
    }, 1500);

    return () => clearTimeout(timeout);
  }, [externalReference, hideOverlay, showOverlay]);

  const handleClose = () => {
    setIsSuccess(false);
  };

  return (
    <>
      <Modal isOpen={isSuccess} onClose={handleClose}>
        <FailedPayment externalReference="externalReference" onClose={handleClose} />
      </Modal>
    </>
  );
}
