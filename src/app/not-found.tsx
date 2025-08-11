import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center p-8 bg-slate-950 text-slate-200">
      <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Page Not Found</h1>
      <p className="max-w-md text-slate-400 mb-8">The page you are looking for does not exist or may have been moved.</p>
      <Link href="/" className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 transition text-white font-medium">Return Home</Link>
    </main>
  );
}
