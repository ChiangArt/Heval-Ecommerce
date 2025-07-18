// components/order/OrderDetails.tsx

import { Order } from "@/core/order/interface/order";

interface Props {
  order: Order;
  userName: string;
}

import { FaCreditCard, FaMoneyBillAlt, FaPaypal } from "react-icons/fa";

function getFormattedPaymentMethod(paymentType: string) {
  switch (paymentType.toLowerCase()) {
    case "credit_card":
      return {
        label: "Tarjeta de crédito",
        icon: <FaCreditCard className="inline text-blue-600 text-xl ml-2" />,
      };
    case "paypal":
      return {
        label: "Pago con PayPal",
        icon: <FaPaypal className="inline text-indigo-600 text-xl ml-2" />,
      };
    case "cash":
      return {
        label: "Pago en efectivo",
        icon: <FaMoneyBillAlt className="inline text-green-600 text-xl ml-2" />,
      };
    default:
      return {
        label: "Otro método de pago",
        icon: null,
      };
  }
}



export default function OrderDetails({ order, userName }: Props) {
  return (
    <div className="bg-white text-sm p-6">
      <div className="mb-4">
        <p className="text-secundario text-xl font-bold font-inter">
          ¡Gracias {userName}!
        </p>
        <p>Tu pedido está confirmado, revisa tu correo para más detalles.</p>
      </div>

      <p className="font-semibold mb-2">Detalles del pedido</p>
      <div className="flex flex-col gap-5 border border-secundario p-4 ">
        <div>
          <h3 className="text-secundario font-medium mb-1">
            Información de contacto:
          </h3>
          <p>Nombres: {order.contactInfo.fullName}</p>
          <p>Celular: {order.contactInfo.cel}</p>
          <p>Correo: {order.contactInfo.email}</p>
          <p>
            {order.contactInfo.documentType}:{" "}
            {order.contactInfo.identityDocument}
          </p>
        </div>

        <div>
          <h3 className="text-secundario font-medium mb-1">Datos de envío:</h3>
          <p>
            {order.shippingAddress.fullAddress} /{" "}
            {order.shippingAddress.apartmentOrFloor} /{" "}
            {order.shippingAddress.additionalInfo} /{" "}
            {order.shippingAddress.reference} /{" "}
            {order.shippingAddress.department} /{" "}
            {order.shippingAddress.province} / {order.shippingAddress.district}
          </p>
        </div>

        <div>
          <h3 className="text-secundario font-medium mb-1">Método de envío:</h3>
          <p>Delivery estándar (1 o 2 días hábiles)</p>
        </div>

        <div>
          <h3 className="text-secundario font-medium mb-1">Método de Pago:</h3>
          <p className="font-medium flex items-center">
            {getFormattedPaymentMethod(order.paymentDetails.paymentType).label}
            {getFormattedPaymentMethod(order.paymentDetails.paymentType).icon}
          </p>
          <p>Nro de Orden: {order.paymentDetails.externalReference}</p>
          <p>Total pagado: S/. {order.totalDiscountedPrice}</p>
        </div>
      </div>

      <p className="text-gray-500 mt-4">
        <strong>Importante:</strong> Te enviaremos un e-mail cuando tu pedido se
        encuentre en camino a tu domicilio. En caso requieras factura para tu
        pedido, puedes contactarte con nosotros al correo{" "}
        <span className="text-secundario font-semibold">
          hevalconfection@gmail.com
        </span>
        .
      </p>
    </div>
  );
}
