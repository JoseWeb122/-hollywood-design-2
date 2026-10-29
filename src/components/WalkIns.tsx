import { ArrowUpRight, Clock, Mail, MapPin, Phone, Share2 } from "lucide-react";
import { BUSINESS } from "@/data/site";
import { Eyebrow, GhostButton, GoldButton, Reveal } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function WalkIns({ onBook }: { onBook: () => void }) {
  const phone = BUSINESS.phone;
  const maps = BUSINESS.mapsUrl;

  const rows: { icon: typeof Phone; label: string; value: string | null; placeholder: string }[] = [
    { icon: Phone, label: "Phone", value: phone, placeholder: "Shop phone coming soon" },
    { icon: MapPin, label: "Address", value: BUSINESS.address, placeholder: "Address coming soon" },
    { icon: MapPin, label: "City / Service area", value: BUSINESS.city, placeholder: "Service area coming soon" },
    { icon: Clock, label: "Opening hours", value: BUSINESS.hours, placeholder: "Hours coming soon — contact the shop for availability" },
    { icon: Mail, label: "Email", value: BUSINESS.email, placeholder: "Email coming soon" },
  ];

  return (
    <section id="contact" className="relative border-t border-line bg-charcoal/40 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-6 md:px-10 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <Eyebrow>Walk-ins welcome</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] text-ivory sm:text-5xl lg:text-6xl">
              DROP IN. CLEAN UP.
              <br />
              <span className="italic text-gold">STEP OUT IN STYLE.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <p className="mt-7 max-w-lg text-base leading-relaxed text-fog sm:text-lg">
              Prefer to stop by? Walk-ins are welcome at {BUSINESS.name}. For the smoothest experience, contact
              the shop to check current availability.
            </p>
          </Reveal>
          <Reveal delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <GoldButton onClick={onBook} ariaLabel="Book an appointment">
                Book an Appointment
              </GoldButton>
              {phone ? (
                <GhostButton href={`tel:${phone.replace(/[^+\d]/g, "")}`} ariaLabel="Call the shop">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call the Shop
                </GhostButton>
              ) : (
                <span className="inline-flex flex-col gap-1.5">
                  <GhostButton disabled ariaLabel="Call the shop — unavailable">
                    <Phone className="h-4 w-4" aria-hidden="true" />
                    Call the Shop
                  </GhostButton>
                  <span className="pl-1 text-[0.68rem] italic text-fog">
                    Shop phone coming soon — no verified number yet.
                  </span>
                </span>
              )}
            </div>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <div className="border border-line bg-obsidian/70 p-8 md:p-10">
            <p className="text-[0.62rem] font-bold uppercase tracking-[0.34em] text-gold">Contact the shop</p>
            <h3 className="mt-3 font-display text-3xl text-ivory">{BUSINESS.name}</h3>
            <p className="mt-1.5 text-sm text-fog">
              by {BUSINESS.barber.name} — {BUSINESS.barber.alias}
            </p>

            <ul className="mt-8 space-y-5">
              {rows.map((r) => (
                <li key={r.label} className="flex items-start gap-4">
                  <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-charcoal text-gold">
                    <r.icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[0.6rem] font-bold uppercase tracking-[0.26em] text-fog">
                      {r.label}
                    </span>
                    {r.value ? (
                      <span className="mt-1 block break-words text-sm text-ivory">{r.value}</span>
                    ) : (
                      <span className="mt-1 block text-sm italic text-fog/80">{r.placeholder}</span>
                    )}
                    {r.label === "Address" && maps && (
                      <a
                        href={maps}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-1.5 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.2em] text-gold hover:text-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        Get Directions <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                    )}
                    {r.label === "Email" && BUSINESS.email && (
                      <a
                        href={`mailto:${BUSINESS.email}`}
                        className="mt-1 block text-sm text-gold hover:text-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        {BUSINESS.email}
                      </a>
                    )}
                  </span>
                </li>
              ))}
              <li className="flex items-start gap-4">
                <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center border border-line bg-charcoal text-gold">
                  <Share2 className="h-4 w-4" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-[0.6rem] font-bold uppercase tracking-[0.26em] text-fog">
                    Social media
                  </span>
                  <span className="mt-2 flex flex-wrap gap-2">
                    {BUSINESS.socials.map((s) =>
                      s.url ? (
                        <a
                          key={s.label}
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="border border-gold/40 px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-gold transition-colors hover:bg-gold hover:text-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                        >
                          {s.label}
                        </a>
                      ) : (
                        <span
                          key={s.label}
                          title="Link coming soon"
                          aria-disabled="true"
                          className={cn(
                            "cursor-not-allowed border border-line px-3 py-1.5 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-fog/60"
                          )}
                        >
                          {s.label} — soon
                        </span>
                      )
                    )}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
