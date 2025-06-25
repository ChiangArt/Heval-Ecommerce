"use client";
import { useCartUIStore } from "@/store/ui/ui-cart-store";
import Image from "next/image";
import Link from "next/link";
import { QuantitySelector } from "@/components/ui/quantity-selector/QuantitySelector";
import { useEffect } from "react";
import Button from "../button/Button";
import { useUnifiedCartStore } from "@/store/cart/use-unified-cart-store";

const CartSideBar = () => {
  const { isSideMenuOpen, closeCartSideMenu } = useCartUIStore();

  const {
    items: cartItems,
    fetchItems,
    updateItem,
    removeItem,
    total,
  } = useUnifiedCartStore();

  const cartItemsCount = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  useEffect(() => {
    const body = document.body;

    if (isSideMenuOpen) {
      fetchItems();
      body.style.overflow = "hidden";
      body.style.height = "100%";
      body.style.position = "fixed";
      body.style.width = "100%";
    } else {
      body.style.overflow = "";
      body.style.height = "";
      body.style.position = "";
      body.style.width = "";
    }
    return () => {
      body.style.overflow = "";
      body.style.height = "";
      body.style.position = "";
      body.style.width = "";
    };
  }, [isSideMenuOpen, fetchItems]);

  return (
    <>
      {isSideMenuOpen && (
        <>
          <div className="fixed inset-0 z-19 bg-primario opacity-30" />
          <div className="fixed inset-0 z-22" onClick={closeCartSideMenu} />
        </>
      )}

      <aside
        className={`fixed right-0 top-0 z-60 w-full sm:w-[480px] h-screen bg-white text-black shadow-2xl transform transition-transform duration-300 flex flex-col ${
          isSideMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-primario text-white text-center text-sm px-4 py-3">
          Estás a S/{(100 - total).toFixed(2)} de desbloquear envío gratis 🚚
        </div>

        <header className="p-5 text-center text-primario border-b">
          <h2 className="font-inter text-lg font-bold">
            CARRITO DE COMPRAS ({cartItemsCount})
          </h2>
          <p className="text-sm font-light">
            Agregaste {cartItemsCount} producto(s)
          </p>
        </header>

        <section className="flex-1 overflow-y-auto px-5 py-6 space-y-5">
          {cartItems.map((product) => {
            return (
              <div key={product.title} className="flex gap-4 pb-4">
                <div className="relative w-[100px] h-[130px] flex-shrink-0">
                  <Image
                    src={product.imageUrl}
                    alt={product.title || "Producto"}
                    fill
                    className="object-cover object-center"
                    sizes="70px"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-semibold text-primario">
                      {product.title || "Producto sin nombre"}
                    </h3>
                    <div className="mt-1 space-x-2 mb-2">
                      <span className="text-sm font-bold text-primario">
                        S/ {(product.discountedPrice ?? 0).toFixed(2)}
                      </span>
                      {typeof product.price === "number" &&
                        typeof product.discountedPrice === "number" &&
                        product.discountedPrice < product.price && (
                          <span className="text-sm text-gray-400 line-through">
                            S/ {product.price.toFixed(2)}
                          </span>
                        )}
                    </div>
                  </div>

                  <QuantitySelector
                    quantity={product.quantity}
                    onQuantityChange={(newQty) =>
                      updateItem(product.productId, newQty)
                    }
                    onRemove={() => removeItem(product.productId)}
                  />
                </div>
              </div>
            );
          })}
        </section>

        <div className="border-t px-5 py-4">
          <div className="flex justify-between text-sm mb-4">
            <span>Total</span>
            <span className="font-bold">S/ {total.toFixed(2)}</span>
          </div>

          <Link
            href="/shop/checkout"
            className="w-full block font-semibold text-white text-center border-2 bg-secundario py-2 hover:bg-opacity-90 transition-colors"
            onClick={closeCartSideMenu}
          >
            PAGAR AHORA
          </Link>

          <Button
            className="block sm:hidden w-full border-2 mt-2 border-primario text-primario py-2 text-center"
            onClick={closeCartSideMenu}
            title="REGRESAR"
          />
        </div>
      </aside>
    </>
  );
};

export default CartSideBar;
