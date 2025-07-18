import Logo from "@/components/ui/logo/Logo";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-black via-zinc-900 to-black text-white">
      <div className="relative w-32 h-32 flex items-center justify-center">
        {/* Aura Giratorio */}
        <div className="absolute w-full h-full rounded-full border-[6px] border-t-primary border-b-primary animate-spin-slow" />

        {/* Fondo del logo con efecto suave */}
        <div className="z-10 w-20 h-20 rounded-full bg-zinc-900 shadow-inner flex items-center justify-center animate-fadeZoomIn">
          <Logo />
        </div>
      </div>

      <div className="absolute bottom-12 text-center animate-fadeZoomIn">
        <p className="text-lg font-semibold tracking-wider">Cargando página...</p>
        <p className="text-sm text-gray-400 mt-1">Un momento, estamos preparando todo para ti</p>
      </div>
    </div>
  );
}
