import { ArrowRight } from "lucide-react";
import { SERVICES } from "@/data/site";
import { Eyebrow, GoldButton, Img, Reveal, SectionHeading } from "@/components/ui";

export default function Services({ onBook }: { onBook: (serviceId?: string) => void }) {
  return (
    <section id="services" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Our Services"
          title={
            <>
              YOUR LOOK. <span className="italic text-gold">ELEVATED.</span>
            </>
          }
          copy="From precision cuts to complete grooming rituals, every service is designed around your comfort, confidence, and personal style."
        />

        <div className="mt-16 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) * 90} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden border border-white/[0.06] bg-charcoal/70 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_28px_60px_-24px_rgba(0,0,0,0.85)]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <Img
                    src={s.img}
                    alt={s.alt}
                    className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent"
                    aria-hidden="true"
                  />
                  <span className="absolute left-4 top-4 border border-gold/30 bg-obsidian/70 px-3 py-1.5 text-[0.56rem] font-bold uppercase tracking-[0.24em] text-gold backdrop-blur-sm">
                    Contact for pricing
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-medium text-ivory">{s.name}</h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-fog">{s.blurb}</p>
                  <button
                    type="button"
                    onClick={() => onBook(s.id)}
                    aria-label={`Book ${s.name}`}
                    className="mt-6 inline-flex items-center gap-2 self-start text-[0.66rem] font-extrabold uppercase tracking-[0.28em] text-gold transition-all duration-300 hover:gap-3.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                  >
                    Book This Service
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120}>
          <div className="mt-16 border border-line bg-charcoal/50 px-8 py-12 text-center md:px-16">
            <Eyebrow center>Not sure what you need?</Eyebrow>
            <h3 className="mt-5 font-display text-3xl font-medium text-ivory sm:text-4xl">
              Let us help you find the <span className="italic text-gold">right service</span> for your style.
            </h3>
            <GoldButton onClick={() => onBook()} className="mt-8" ariaLabel="Book a grooming session">
              Book a Grooming Session
            </GoldButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
