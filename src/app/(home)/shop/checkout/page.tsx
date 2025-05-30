import Image from "next/image";
// import { QuantitySelector } from "@/components/shop/product/quantity-selector/QuantitySelector";
// import { useCartStore } from "@/store/cart-store"; // ← Si usas Zustand

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

export default function ResumenPage() {
  // const products = useCartStore(state => state.cart); // Si usas estado global

  const total = mockProducts.reduce((sum, item) => {
    const price = item.discountPrice ?? item.price;
    return sum + price * item.quantity;
  }, 0);

  return (
    <div className="bg-[#F7F3F3] max-w-5xl mx-auto p-6 grid md:grid-cols-2 gap-6">
      
      {/* Lista de Productos */}
      <section>
        <h1 className="text-2xl font-bold mb-4">Resumen del Pedido</h1>
        <div className="space-y-4">
          {mockProducts.map((product) => {
            const effectivePrice = product.discountPrice ?? product.price;

            return (
              <div key={product.id} className="flex gap-4 border-b pb-4">
                <div className="relative w-[100px] h-[100px] flex-shrink-0">
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="rounded object-cover object-center"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{product.title}</h3>
                  <p className="text-sm text-gray-500">
                    Cantidad: {product.quantity}
                  </p>
                  <p className="text-sm text-turquesa font-bold">
                    S/ {(effectivePrice * product.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex justify-between text-lg font-semibold">
          <span>Total:</span>
          <span>S/ {total.toFixed(2)}</span>
        </div>
      </section>

      {/* Formulario de Envío */}
      <section>
        <h2 className="text-xl font-bold mb-4">Datos de Envío</h2>
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Nombre completo"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Dirección"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Ciudad"
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Teléfono"
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-turquesa text-white py-2 rounded hover:opacity-90 transition"
          >
            Confirmar Pedido
          </button>
        </form>
      </section>
    </div>
  );
}
