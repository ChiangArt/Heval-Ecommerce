import Image from "next/image";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <div className="relative w-32 h-32 flex items-center justify-center">
        <div className="absolute w-full h-full rounded-full border-[6px] border-t-primary border-b-primary animate-spin-slow" />

        <div className="z-10 w-20 h-20 rounded-full bg-zinc-900 shadow-inner flex items-center justify-center animate-fadeZoomIn">
          <Image
            src="/ISOTIPO HEVAL.png"
            alt="Tercera"
            fill
            sizes="(max-width: 768px) 100vw, 100vw"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="absolute bottom-12 text-center animate-fadeZoomIn">
        <p className="text-lg font-semibold tracking-wider">
          Cargando página...
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Un momento, estamos preparando todo para ti
        </p>
      </div>
    </div>
  );
}
