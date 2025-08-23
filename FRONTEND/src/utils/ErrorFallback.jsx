// Fallback component when an error is caught
export default function ErrorFallback({ error, resetErrorBoundary }) {
  console.log(error);
  return (
    <div role="alert" className="h-screen flex justify-center items-center flex-col space-y-4">
      <p className="text-lg">⚠️ Something went wrong:</p>
      <pre className="text-red-400">{error.message}</pre>
      <button
        onClick={resetErrorBoundary}
        className="bg-slate-600 text-white font-semibold text-sm px-3 py-2 rounded-lg"
      >
        Try again
      </button>
    </div>
  );
}
