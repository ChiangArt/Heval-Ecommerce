"use client";
import { useOverlayStore } from "@/store/ui/use-overlay-store";

const Overlay = () => {
  const isVisible = useOverlayStore((state) => state.isOverlayVisible);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white/30 bg-opacity-40 z-100 flex items-center justify-center">
      <div className="flex-col gap-4 w-full flex items-center justify-center">
        <div className="w-20 h-20 border-4 border-transparent text-blue-400 text-4xl animate-spin flex items-center justify-center border-t-blue-400 rounded-full">
          <div className="w-16 h-16 border-4 border-transparent text-red-400 text-2xl animate-spin flex items-center justify-center border-t-red-400 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default Overlay;
