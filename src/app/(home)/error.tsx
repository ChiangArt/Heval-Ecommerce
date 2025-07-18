'use client';

export default function Error({ error }: { error: Error }) {
  return (
    <div className="min-h-screen flex items-center justify-center text-center px-4">
      <div>
        <h1 className="text-2xl font-bold mb-2">Ocurrió un error 😢</h1>
        <p className="text-gray-600">{error.message}</p>
        <p className="mt-4">Por favor, intenta recargar la página más tarde.</p>
      </div>
    </div>
  );
}
