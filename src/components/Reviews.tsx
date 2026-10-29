import { useState, type FormEvent } from "react";
import { Info, Quote, Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/site";
import { GoldButton, GhostButton, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function Reviews() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [errs, setErrs] = useState<{ name?: string; text?: string }>({});
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errs = {};
    if (name.trim().length < 2) next.name = "Please add your name.";
    if (text.trim().length < 10) next.text = "Tell us a little more (at least 10 characters).";
    setErrs(next);
    if (Object.keys(next).length === 0) {
      setSent(true);
      setName("");
      setText("");
    }
  };

  return (
    <section id="reviews" className="relative border-t border-line bg-charcoal/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Client Reviews"
          title={
            <>
              THE HOLLYWDD <span className="italic text-gold">STANDARD.</span>
            </>
          }
          copy="The best part of the experience is how you feel when you leave."
        />

        <Reveal delay={150}>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs italic text-fog">
            <Info className="h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
            Sample testimonials shown as placeholders — replace with authentic client feedback.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 110} className="h-full">
              <figure className="relative flex h-full flex-col border border-line bg-obsidian/70 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-gold/40">
                <Quote className="h-8 w-8 text-gold/40" aria-hidden="true" />
                <div className="mt-4 flex gap-1" aria-hidden="true">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <Star key={s} className="h-3.5 w-3.5 fill-gold text-gold" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 font-display text-lg italic leading-relaxed text-ivory/90">
                  “{t.text}”
                </blockquote>
                <figcaption className="mt-6 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
                  <span className="text-sm font-bold tracking-wide text-ivory">{t.name}</span>
                  <span className="border border-gold/25 bg-gold/10 px-2.5 py-1 text-[0.55rem] font-bold uppercase tracking-[0.2em] text-gold">
                    Sample
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div className="mt-14 text-center">
            <GhostButton
              onClick={() => {
                setShowForm((v) => !v);
                setSent(false);
              }}
              ariaLabel="Share your experience — demo form"
            >
              Share Your Experience (Demo)
            </GhostButton>

            {showForm && (
              <form
                onSubmit={submit}
                noValidate
                className="modal-in mx-auto mt-8 max-w-xl border border-line bg-obsidian/70 p-6 text-left md:p-8"
              >
                <p className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-gold">
                  Front-end demo — nothing is published or stored
                </p>
                <label className="mt-5 block">
                  <span className="mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.28em] text-fog">
                    Your name *
                  </span>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="First name or nickname"
                    aria-invalid={!!errs.name}
                    className={cn(
                      "w-full border bg-charcoal px-4 py-3 text-sm text-ivory placeholder:text-fog/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40",
                      errs.name ? "border-alert/60" : "border-white/10"
                    )}
                  />
                  {errs.name && (
                    <span role="alert" className="mt-2 block text-xs text-alert">
                      {errs.name}
                    </span>
                  )}
                </label>
                <label className="mt-4 block">
                  <span className="mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.28em] text-fog">
                    Your experience *
                  </span>
                  <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    rows={4}
                    placeholder="How was your visit?"
                    aria-invalid={!!errs.text}
                    className={cn(
                      "w-full resize-y border bg-charcoal px-4 py-3 text-sm text-ivory placeholder:text-fog/40 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40",
                      errs.text ? "border-alert/60" : "border-white/10"
                    )}
                  />
                  {errs.text && (
                    <span role="alert" className="mt-2 block text-xs text-alert">
                      {errs.text}
                    </span>
                  )}
                </label>
                <GoldButton type="submit" className="mt-6 px-6 py-3" ariaLabel="Submit demo review">
                  Submit Review
                </GoldButton>
                {sent && (
                  <p role="status" className="mt-4 flex items-start gap-2 border border-gold/30 bg-gold/10 p-3 text-xs leading-relaxed text-ivory/90">
                    <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                    Thank you! This was a demo only — your review was not published, stored, or sent anywhere.
                  </p>
                )}
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
