import ShippingAddressForm from "@/components/ui/form/ShippingAddressForm";
import React from "react";

export default function Address() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 pt-30 md:px-3 landscape:px-20">
      <ShippingAddressForm />
    
    </div>
  );
}
