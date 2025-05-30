export default function AnnouncementBar() {
  const messages = [
    "🚚 Envío gratis en compras mayores a $50",
    "🎉 ¡Descuentos hasta 70% por tiempo limitado!",
    "🛍️ Compra ahora y paga después",
    "🚚 Envío gratis en compras mayores a $110",
    "🚚 Envío gratis en compras mayores a $50",
  ];

  return (
    <div className="w-full bg-cielo select-none overflow-hidden relative">
      <div className="text-xs md:text-sm p-1 whitespace-nowrap flex">
        {/* Primer conjunto de mensajes */}
        <div className="flex animate-marquee">
          {messages.map((msg, i) => (
            <span key={`original-${i}`} className="px-4">
              {msg}
            </span>
          ))}
        </div>
        {/* Segundo conjunto (para efecto continuo) */}
        <div className="flex animate-marquee" aria-hidden="true">
          {messages.map((msg, i) => (
            <span key={`duplicate-${i}`} className="px-4">
              {msg}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
