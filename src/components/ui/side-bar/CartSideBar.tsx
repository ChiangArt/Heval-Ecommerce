"use client";

import clsx from "clsx";
import { useCartUIStore } from "@/store/ui/ui-cart-store";
import Image from "next/image";
import Link from "next/link";
import { QuantitySelector } from "@/components/shop/product/quantity-selector/QuantitySelector";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "../button/Button";

const mockProducts = [
  {
    id: "1",
    title: "Producto 1",
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

export const CartSideBar = () => {
  const isSideMenuOpen = useCartUIStore((state) => state.isSideMenuOpen);
  const closeCartMenu = useCartUIStore((state) => state.closeCartSideMenu);

  const total = mockProducts.reduce((sum, item) => {
    const effectivePrice = item.discountPrice ?? item.price;
    return sum + effectivePrice * item.quantity;
  }, 0);

  return (
    <>
      {isSideMenuOpen && (
        <>
          <div className="fixed inset-0 z-1 bg-primario opacity-30" />
          <div
            className="fixed inset-0 z-22"
            onClick={closeCartMenu}
          />
        </>
      )}

      <aside
        className={clsx(
          "fixed right-0 top-0 sm:top-[7.5vh] landscape:h-[90vh] landscape:top-[10vh] z-20 h-[100vh] sm:h-[93vh] w-full sm:w-[480px]  bg-white text-black shadow-2xl transform transition-transform duration-300 flex flex-col",
          {
            "translate-x-full": !isSideMenuOpen,
            "translate-x-0": isSideMenuOpen,
          }
        )}
      >
        {/* Barra superior */}
        <div className="bg-primario text-white text-center text-sm px-4 py-3">
          Estás a S/100.00 de desbloquear envío gratis 🚚
        </div>

        {/* Encabezado */}
        <header className="p-5 text-center text-primario border-b">
          <h2 className="font-inter text-lg font-bold">
            CARRITO DE COMPRAS ({mockProducts.length})
          </h2>
          <p className="text-sm font-light">
            Agregaste {mockProducts.reduce((sum, p) => sum + p.quantity, 0)}{" "}
            producto(s) a tu compra
          </p>
        </header>

        {/* Productos (scroll) */}
        <section className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
          {mockProducts.map((product) => {
            const hasDiscount = !!product.discountPrice;
            const effectivePrice = hasDiscount
              ? product.discountPrice
              : product.price;

            return (
              <div key={product.id} className="flex gap-4 pb-4">
                <div className="relative w-[100px] h-[130px] flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover object-center"
                    sizes="70px"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-primario">
                    {product.title}
                  </h3>

                  <div className="mt-1 space-x-2 mb-5">
                    <span className="text-sm font-bold text-primario">
                      S/ {(effectivePrice * product.quantity).toFixed(2)}
                    </span>
                    {hasDiscount && (
                      <span className="text-sm text-gray-400 line-through">
                        S/ {(product.price * product.quantity).toFixed(2)}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mb-1">
                    Cantidad: {product.quantity}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <QuantitySelector quantity={product.quantity} />
                    <button className="w-12 h-8 flex items-center justify-center border-1 border-primario text-center cursor-pointer">
                      <FaRegTrashAlt className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </section>

        {/* Footer fijo con total y botones */}
        <div className="border-t px-5 py-4">
          <div className="flex justify-between text-sm mb-4">
            <span>Total</span>
            <span className="font-bold">S/ {total.toFixed(2)}</span>
          </div>

          <Link
            href="/checkout"
            onClick={closeCartMenu}
            className="w-full block font-semibold text-white text-center border-2 bg-secundario py-2 hover:bg-opacity-90 transition-colors"
          >
            PAGAR AHORA
          </Link>

          <Button
            className="block sm:hidden w-full border-2 mt-2 border-primario text-primario py-2 text-center"
            onClick={closeCartMenu}
            title="REGRESAR"
          />
        </div>
      </aside>
    </>
  );
};
