export function LoadingMessage({ message }: { message: string }) {
  return (
    <div className="flex justify-center items-center py-6 text-gray-600">
      <p>{message}</p>
    </div>
  );
}
