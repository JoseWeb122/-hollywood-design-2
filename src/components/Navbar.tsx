import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "@/components/Logo";
import { GoldButton } from "@/components/ui";
import { NAV_LINKS } from "@/data/site";
import { cn } from "@/utils/cn";

export default function Navbar({ onBook }: { onBook: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-40 transition-all duration-500",
          scrolled
            ? "border-b border-line bg-obsidian/90 shadow-[0_10px_40px_rgba(0,0,0,0.5)] backdrop-blur-md"
            : "border-b border-transparent bg-transparent"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-10">
          <a href="#home" aria-label="Hollywdd Groom’n — back to top" className="shrink-0">
            <Logo variant="lockup" tone="gold" />
          </a>

          <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={cn(
                  "relative py-2 text-[0.68rem] font-bold uppercase tracking-[0.24em] transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
                  active === link.id ? "text-gold" : "text-ivory/75 hover:text-gold"
                )}
                aria-current={active === link.id ? "true" : undefined}
              >
                {link.label}
                {active === link.id && (
                  <span
                    className="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                    aria-hidden="true"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <GoldButton onClick={onBook} className="hidden px-6 py-3 sm:inline-flex" ariaLabel="Book an appointment">
              Book Appointment
            </GoldButton>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center border border-line text-ivory transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div
            className="fade-in absolute inset-0 bg-obsidian/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div
            id="mobile-menu"
            className="modal-in absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-line bg-obsidian"
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-6">
              <Logo variant="lockup" tone="gold" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="flex h-11 w-11 items-center justify-center border border-line text-ivory transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-1 flex-col justify-center gap-1 overflow-y-auto px-8">
              {NAV_LINKS.map((link, i) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "group flex items-baseline gap-4 border-b border-white/[0.05] py-4 font-display text-3xl text-ivory transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
                    active === link.id && "text-gold"
                  )}
                >
                  <span className="text-xs font-bold tracking-[0.3em] text-gold/70">0{i + 1}</span>
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="border-t border-line p-8">
              <GoldButton onClick={() => { setOpen(false); onBook(); }} className="w-full" ariaLabel="Book an appointment">
                Book Appointment
              </GoldButton>
              <p className="mt-6 text-center font-script text-2xl text-gold">“Where Everybody Is a Star.”</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
