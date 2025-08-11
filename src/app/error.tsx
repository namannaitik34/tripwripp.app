'use client';
import { useEffect } from 'react';
import Link from 'next/link';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void; }) {
  useEffect(() => {
    console.error('Global error boundary caught:', error);
  }, [error]);
  return (
    <html>
      <body className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-slate-200 p-8">
        <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
        {error?.message && <p className="text-slate-400 mb-6 max-w-lg">{error.message}</p>}
        <div className="flex gap-4">
          <button onClick={() => reset()} className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition font-medium">Try Again</button>
          <Link href="/" className="px-5 py-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition font-medium">Home</Link>
        </div>
        {error?.digest && <p className="mt-6 text-xs text-slate-500">Ref: {error.digest}</p>}
      </body>
    </html>
  );
}
