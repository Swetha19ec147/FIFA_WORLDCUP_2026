import Link from "next/link";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <p className="text-7xl font-black text-gradient">404</p>
      <h1 className="mt-4 text-2xl font-bold text-white">Off the pitch</h1>
      <p className="mt-2 max-w-sm text-slate-400">
        The page you&apos;re looking for has been substituted. Let&apos;s get you
        back to the action.
      </p>
      <Link href="/" className="btn-primary mt-8">
        <Home className="h-4 w-4" /> Back to Home
      </Link>
    </div>
  );
}
