import { useEffect, useState } from "react";
import { Clock, Mail, MapPin, Phone, X } from "lucide-react";
import Logo from "@/components/Logo";
import { GoldButton } from "@/components/ui";
import { BUSINESS, NAV_LINKS, SERVICES } from "@/data/site";
import { cn } from "@/utils/cn";

function LegalModal({ kind, onClose }: { kind: "privacy" | "terms"; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isPrivacy = kind === "privacy";

  return (
    <div className="fade-in fixed inset-0 z-[70] flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-label={isPrivacy ? "Privacy Policy" : "Terms of Service"}>
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 cursor-default bg-obsidian/85 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="modal-in relative max-h-[84vh] w-full max-w-2xl overflow-y-auto border border-line bg-charcoal p-8 shadow-2xl md:p-10">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
        >
          <X className="h-4 w-4" />
        </button>
        <span className="inline-block border border-gold/30 bg-gold/10 px-3 py-1 text-[0.58rem] font-bold uppercase tracking-[0.26em] text-gold">
          Draft placeholder
        </span>
        <h2 className="mt-4 font-display text-3xl text-ivory md:text-4xl">
          {isPrivacy ? "Privacy Policy" : "Terms of Service"}
        </h2>
        <div className="mt-6 space-y-4 text-sm leading-relaxed text-fog">
          {isPrivacy ? (
            <>
              <p>
                This is a draft placeholder for the {BUSINESS.name} privacy policy. It will be replaced with the
                final policy before the website goes live.
              </p>
              <p>
                In this front-end demonstration, nothing you enter into the booking or review forms is transmitted,
                stored on a server, or shared with anyone. Booking details live only in your browser session and are
                discarded when you close or reset the flow.
              </p>
              <p>
                When the shop connects real systems (scheduling, contact forms), this policy will describe exactly
                what personal data is collected, why, how long it is kept, and how you can request its deletion.
              </p>
            </>
          ) : (
            <>
              <p>
                This is a draft placeholder for the {BUSINESS.name} terms of service. It will be replaced with the
                final terms before the website goes live.
              </p>
              <p>
                In this front-end demonstration, the booking flow does not create a real appointment, does not
                collect payment, and does not confirm availability in a live calendar. Any request you submit is a
                local demonstration only.
              </p>
              <p>
                Service pricing, durations, cancellation and rescheduling policies are confirmed directly with the
                shop and will be published here once verified.
              </p>
            </>
          )}
        </div>
        <GoldButton onClick={onClose} className="mt-8 px-6 py-3">
          Close
        </GoldButton>
      </div>
    </div>
  );
}

export default function Footer({ onBook }: { onBook: (serviceId?: string) => void }) {
  const year = new Date().getFullYear();
  const [legal, setLegal] = useState<"privacy" | "terms" | null>(null);

  const contactRows = [
    { icon: Phone, label: "Phone", value: BUSINESS.phone, placeholder: "Coming soon" },
    { icon: MapPin, label: "Address", value: BUSINESS.address, placeholder: "Coming soon" },
    { icon: Clock, label: "Hours", value: BUSINESS.hours, placeholder: "Coming soon" },
    { icon: Mail, label: "Email", value: BUSINESS.email, placeholder: "Coming soon" },
  ];

  return (
    <footer className="border-t border-line bg-obsidian">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-16 sm:grid-cols-2 md:px-10 lg:grid-cols-4">
        {/* Brand */}
        <div>
          <Logo variant="stacked" tone="gold" className="items-start" />
          <p className="mt-5 font-script text-3xl text-gold">“{BUSINESS.tagline}”</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-fog">
            Premium grooming by {BUSINESS.barber.name} — known professionally as {BUSINESS.barber.alias}.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {BUSINESS.socials.map((s) =>
              s.url ? (
                <a
                  key={s.label}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-gold/40 px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {s.label}
                </a>
              ) : (
                <span
                  key={s.label}
                  aria-disabled="true"
                  title="Link coming soon"
                  className="cursor-not-allowed border border-line px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-fog/60"
                >
                  {s.label} — soon
                </span>
              )
            )}
          </div>
        </div>

        {/* Explore */}
        <nav aria-label="Footer navigation">
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.34em] text-gold">Explore</p>
          <ul className="mt-5 space-y-2.5">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  className="text-sm text-fog transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Services */}
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.34em] text-gold">Services</p>
          <ul className="mt-5 space-y-2.5">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <button
                  type="button"
                  onClick={() => onBook(s.id)}
                  aria-label={`Book ${s.name}`}
                  className="text-left text-sm text-fog transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                >
                  {s.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Visit / book */}
        <div>
          <p className="text-[0.62rem] font-bold uppercase tracking-[0.34em] text-gold">Visit Us</p>
          <ul className="mt-5 space-y-3">
            {contactRows.map((r) => (
              <li key={r.label} className="flex items-center gap-3">
                <r.icon className="h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
                <span className="text-xs uppercase tracking-[0.18em] text-fog">{r.label}:</span>
                <span className={cn("text-sm", r.value ? "text-ivory" : "italic text-fog/70")}>
                  {r.value ?? r.placeholder}
                </span>
              </li>
            ))}
          </ul>
          <GoldButton onClick={() => onBook()} className="mt-7 px-6 py-3.5" ariaLabel="Book an appointment">
            Book Appointment
          </GoldButton>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-fog md:flex-row md:px-10">
          <p>© {year} {BUSINESS.name}. All rights reserved.</p>
          <p className="italic">Front-end demo — contact details are placeholders until confirmed by the shop.</p>
          <div className="flex gap-6">
            <button
              type="button"
              onClick={() => setLegal("privacy")}
              className="uppercase tracking-[0.2em] transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={() => setLegal("terms")}
              className="uppercase tracking-[0.2em] transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              Terms of Service
            </button>
          </div>
        </div>
      </div>

      {legal && <LegalModal kind={legal} onClose={() => setLegal(null)} />}
    </footer>
  );
}
