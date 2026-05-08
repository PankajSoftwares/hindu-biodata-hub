import { Link } from "@tanstack/react-router";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2 font-display ${className}`}>
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground shadow-sm"
      >
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6">
          <path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.8 7.1 18.2 8 12.7 4 8.8 9.5 8 12 3z" />
        </svg>
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-lg font-semibold tracking-tight">Free Biodata</span>
        <span className="text-[10px] uppercase tracking-[0.2em] text-gold">for Hindus</span>
      </span>
    </Link>
  );
}