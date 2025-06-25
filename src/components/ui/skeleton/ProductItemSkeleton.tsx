export default function ProductItemSkeleton() {
  return (
    <div className="animate-pulse bg-white border border-gray-200 rounded-md overflow-hidden">
      <div className="aspect-[3/4] bg-gray-300" />
      <div className="p-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-1/2" />
        <div className="h-3 bg-gray-200 rounded w-1/3" />
      </div>
    </div>
  );
}
