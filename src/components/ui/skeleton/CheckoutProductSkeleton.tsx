// components/ui/skeleton/ProductSkeleton.tsx
export default function CheckoutProductSkeleton() {
  return (
    <div className="grid grid-cols-6 gap-2 py-4 items-center animate-pulse">
      <div className="col-span-3 flex gap-4 items-center">
        <div className="bg-gray-300 w-[60px] h-[80px] rounded" />
        <div className="bg-gray-300 h-4 w-32 rounded" />
      </div>
      <div className="col-span-1 text-center">
        <div className="bg-gray-300 h-4 w-16 mx-auto rounded" />
      </div>
      <div className="col-span-2 text-right">
        <div className="bg-gray-300 h-8 w-24 rounded ml-auto" />
      </div>
    </div>
  );
}