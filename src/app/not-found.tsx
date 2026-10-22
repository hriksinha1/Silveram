import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-porcelain flex flex-col items-center justify-center p-6 text-center">
      <span className="font-mono text-xs uppercase tracking-widest text-cobalt mb-3">
        404 // NOT FOUND
      </span>
      <h1 className="font-serif text-3xl sm:text-4xl text-midnight font-normal mb-4">
        This sanctuary could not be found.
      </h1>
      <p className="text-xs sm:text-sm font-sans text-graphite-muted max-w-sm mb-8 leading-relaxed font-light">
        The heirloom or page you were looking for is unavailable or has been relocated within our atelier.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-midnight text-porcelain text-xs font-sans font-semibold tracking-wider uppercase hover:bg-midnight-light transition-all shadow-md"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Return to Atelier</span>
      </Link>
    </div>
  );
}
