import { cn } from "@/utils/cn";

/** Minimalist crown emblem — the core of the Hollywdd Groom’n identity. */
export function CrownMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 46" className={className} aria-hidden="true" focusable="false">
      <path d="M7 33 L11.5 12.5 L23 22.5 L32 7 L41 22.5 L52.5 12.5 L57 33 Z" fill="currentColor" />
      <rect x="7" y="37.5" width="50" height="3.2" rx="1.6" fill="currentColor" />
      <circle cx="11.5" cy="9" r="2.8" fill="currentColor" />
      <circle cx="32" cy="3.6" r="2.8" fill="currentColor" />
      <circle cx="52.5" cy="9" r="2.8" fill="currentColor" />
    </svg>
  );
}

type LogoProps = {
  /** lockup = crown beside wordmark (header), stacked = crown above wordmark (footer), icon = crown only */
  variant?: "lockup" | "stacked" | "icon";
  /** gold on dark backgrounds, ivory for contrasting backgrounds */
  tone?: "gold" | "ivory";
  className?: string;
};

export default function Logo({ variant = "lockup", tone = "gold", className }: LogoProps) {
  const toneCls = tone === "gold" ? "text-gold" : "text-ivory";

  if (variant === "icon") {
    return <CrownMark className={cn("h-8 w-11", toneCls, className)} />;
  }

  const wordmark = (centered: boolean) => (
    <span className={cn("flex flex-col leading-none", centered && "items-center text-center")}>
      <span className="font-display text-lg font-semibold tracking-[0.3em] sm:text-xl">HOLLYWDD</span>
      <span className="mt-1.5 flex items-center gap-2 text-[0.55rem] font-bold tracking-[0.52em]">
        <span className="h-px w-4 bg-current opacity-60" aria-hidden="true" />
        GROOM’N
        <span className="h-px w-4 bg-current opacity-60" aria-hidden="true" />
      </span>
    </span>
  );

  if (variant === "stacked") {
    return (
      <span className={cn("inline-flex flex-col items-center gap-2.5", toneCls, className)}>
        <CrownMark className="h-8 w-11" />
        {wordmark(true)}
      </span>
    );
  }

  return (
    <span className={cn("inline-flex items-center gap-3", toneCls, className)}>
      <CrownMark className="h-8 w-11 shrink-0" />
      {wordmark(false)}
    </span>
  );
}
