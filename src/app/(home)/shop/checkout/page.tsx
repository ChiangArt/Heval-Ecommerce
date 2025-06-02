import { QuantitySelector } from "@/components/shop/product/quantity-selector/QuantitySelector";
import Button from "@/components/ui/button/Button";
import StepForm from "@/components/ui/step-form/StepForm";
import { FormTexts } from "@/interfaces/stepForm.interface";
// import StepForm from "@/components/ui/step-form/StepForm";
import Image from "next/image";

import { FaRegTrashAlt } from "react-icons/fa";

const mockProducts = [
  {
    id: "1",
    title: "Pantalon Ledin Con corte superior",
    quantity: 2,
    price: 59.99,
    discountPrice: 49.99,
    image: "https://swiperjs.com/demos/images/nature-1.jpg",
  },
  {
    id: "2",
    title: "Producto 2",
    quantity: 1,
    price: 19.99,
    discountPrice: 20,
    image: "https://swiperjs.com/demos/images/nature-2.jpg",
  },
];

const formTexts: FormTexts = {
  formTitle: "Formulario de Contacto",
  fields: [
    {
      name: "name",
      label: "Nombre completo",
      placeholder: "Ej: Juan Pérez",
      type: "text",
      required: true,
    },
    {
      name: "phone",
      label: "Teléfono",
      placeholder: "Ej: 987654321",
      type: "tel",
      required: true,
    },
    {
      name: "email",
      label: "Correo electrónico",
      placeholder: "Ej: correo@ejemplo.com",
      type: "email",
      required: true,
    },
  ],
  documentLabel: "Tipo de documento",
  documentPlaceholder: "Número de documento",
  continueButton: {
    type: "link", 
    text: "CONTINUAR COMPRA",
    href: "/shop/checkout/address",
  },
  keepBuyingButton: {
    type: "button",
    text: "SEGUIR COMPRANDO",
  },
} as const; 

const options = [
  { id: 1, label: "DNI" },
  { id: 2, label: "C.E" },
  
];

export default function Checkout() {
  const total = mockProducts.reduce((sum, item) => {
    const price = item.discountPrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="w-full text-secundario  text-sm lg:text-lg flex justify-center items-start py-10 md:px-4 ">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-8xl">
        {/* ------------------------------ FORMULARIO ------------------------------ */}
        <section className="bg-white p-6 w-full ">
          <StepForm
            title="Completa tus datos personales"
            stepNumber={1}
            formTexts={formTexts}
            includeDocument={true}
            options={options}
          />
        </section>

        {/* --------------------------- RESUMEN DEL PEDIDO --------------------------- */}
        <div className="flex flex-col gap-6">
          <section className="bg-white p-6 w-full">
            <h2 className=" font-bold mb-4">RESUMEN DEL PEDIDO</h2>

            <div className="grid grid-cols-[3fr_2fr_2fr_1fr] gap-2 mb-2 text-[rgba(29,29,27,0.5)]  font-semibold">
              <span>Producto</span>
              <span>Precio</span>
              <span>Cantidad</span>
              <span></span>
            </div>
            <div className="border-b border-gray-300 mb-4" />

            <div className="space-y-4">
              {mockProducts.map((product, index) => {
                const effectivePrice = product.discountPrice ?? product.price;
                const isLast = index === mockProducts.length - 1;

                return (
                  <div
                    key={product.id}
                    className={`grid grid-cols-[3fr_2fr_2fr_1fr] gap-2 items-center pb-4 ${
                      !isLast ? "border-b border-secundario" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative w-[60px] h-[60px] flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.title}
                          fill
                          className=" object-cover object-center"
                        />
                      </div>
                      <h3 className="font-semibold text-xs">{product.title}</h3>
                    </div>

                    <p className=" font-bold text-xs">
                      S/{(effectivePrice * product.quantity).toFixed(2)}
                    </p>

                    <QuantitySelector
                      className="p-2"
                      quantity={product.quantity}
                    />

                    <button className="w-7 h-6 flex items-center justify-center border border-secundario hover:bg-gray-100 transition">
                      <FaRegTrashAlt className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* --------------------------- CUPÓN Y TOTALES --------------------------- */}
          <section className="bg-white p-6  w-full">
            <h2 className="font-bold mb-4 text-secundario">CANTIDAD A PAGAR</h2>
            <div className="mb-6">
              <div className="flex flex-col xl:flex-row items-center  gap-4 md:gap-8 justify-center">
                <label htmlFor="email" className="sr-only">
                  Código de cupón
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="Ingresa el código"
                  className="flex-1 px-4 py-2 border border-gray-300  focus:outline-none focus:border-secundario"
                  required
                />
                <Button
                  title="AGREGAR CUPÓN"
                  className="bg-secundario text-white px-4 py-2  hover:opacity-75 transition text-center"
                ></Button>
              </div>

              <button className="mt-4 w-full md:w-auto bg-turquesa text-white px-6 py-2 rounded hover:opacity-90 transition">
                Aplicar
              </button>
            </div>

            {/* Totales */}
            <div className="space-y-2 border-b border-t py-10 text-secundario">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Descuento</span>
                <span>S/ 0.00</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>S/ 0.00</span>
              </div>
              <div className="flex justify-between font-bold pt-2">
                <span>Total</span>
                <span>S/ {total.toFixed(2)}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
