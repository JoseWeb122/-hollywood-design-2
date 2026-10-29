import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/utils/cn";
import { CrownMark } from "@/components/Logo";

/* ---------- Scroll reveal wrapper ---------- */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -48px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn("reveal", visible && "is-visible", className)}
    >
      {children}
    </div>
  );
}

/* ---------- Resilient image (graceful fallback if a remote photo fails) ---------- */
export function Img({
  src,
  alt,
  className,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  eager?: boolean;
}) {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div
        className={cn("flex items-center justify-center bg-charcoal", className)}
        role="img"
        aria-label={alt}
      >
        <CrownMark className="h-1/3 max-h-16 w-1/3 max-w-16 text-gold/30" />
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      onError={() => setErr(true)}
      className={className}
    />
  );
}

/* ---------- Buttons ---------- */
const baseBtn =
  "inline-flex items-center justify-center gap-3 px-8 py-4 text-[0.72rem] font-extrabold uppercase tracking-[0.3em] transition-all duration-300 active:translate-y-[1px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:pointer-events-none disabled:opacity-40";

export function GoldButton({
  children,
  className,
  disabled,
  onClick,
  href,
  type = "button",
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const cls = cn(
    baseBtn,
    "bg-gold text-obsidian hover:bg-gold-soft hover:shadow-[0_12px_44px_-10px_rgba(212,175,102,0.5)]",
    className
  );
  if (href) {
    return (
      <a href={href} onClick={onClick} aria-label={ariaLabel} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  className,
  disabled,
  onClick,
  href,
  type = "button",
  ariaLabel,
}: {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  href?: string;
  type?: "button" | "submit";
  ariaLabel?: string;
}) {
  const cls = cn(
    baseBtn,
    "border border-gold/40 bg-transparent text-ivory hover:border-gold hover:bg-gold/10 hover:text-gold-soft",
    className
  );
  if (href) {
    return (
      <a href={href} onClick={onClick} aria-label={ariaLabel} className={cls}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} disabled={disabled} onClick={onClick} aria-label={ariaLabel} className={cls}>
      {children}
    </button>
  );
}

/* ---------- Eyebrow label with gold rule ---------- */
export function Eyebrow({ children, center = false }: { children: ReactNode; center?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-4 text-[0.68rem] font-bold uppercase tracking-[0.42em] text-gold",
        center && "justify-center"
      )}
    >
      <span className="h-px w-10 bg-gold/60" aria-hidden="true" />
      {children}
      {center && <span className="h-px w-10 bg-gold/60" aria-hidden="true" />}
    </p>
  );
}

/* ---------- Section heading block ---------- */
export function SectionHeading({
  eyebrow,
  title,
  copy,
  center = true,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  copy?: string;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-3xl", center && "mx-auto text-center", className)}>
      <Reveal>
        <Eyebrow center={center}>{eyebrow}</Eyebrow>
      </Reveal>
      <Reveal delay={100}>
        <h2 className="mt-5 font-display text-4xl font-medium leading-[1.04] text-ivory sm:text-5xl lg:text-6xl">
          {title}
        </h2>
      </Reveal>
      {copy && (
        <Reveal delay={200}>
          <p className="mt-6 text-base leading-relaxed text-fog sm:text-lg">{copy}</p>
        </Reveal>
      )}
    </div>
  );
}

/* ---------- Gold divider with crown ---------- */
export function GoldDivider({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center justify-center gap-5", className)} aria-hidden="true">
      <span className="h-px w-24 bg-gradient-to-r from-transparent to-gold/70 sm:w-36" />
      <CrownMark className="h-6 w-8 text-gold" />
      <span className="h-px w-24 bg-gradient-to-l from-transparent to-gold/70 sm:w-36" />
    </div>
  );
}
