import { useState } from "react";
import { Plus } from "lucide-react";
import { FAQS } from "@/data/site";
import { Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function Faq() {
  const [open, setOpen] = useState<number[]>([0]);

  const toggle = (i: number) =>
    setOpen((prev) => (prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]));

  return (
    <section id="faq" className="relative border-t border-line py-24 md:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-10">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              QUESTIONS? <span className="italic text-gold">ANSWERED.</span>
            </>
          }
        />

        <div className="mt-14">
          {FAQS.map((item, i) => {
            const isOpen = open.includes(i);
            return (
              <Reveal key={item.q} delay={i * 60}>
                <div className={cn("border-t border-line", i === FAQS.length - 1 && "border-b")}>
                  <h3>
                    <button
                      type="button"
                      onClick={() => toggle(i)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      id={`faq-button-${i}`}
                      className="flex w-full items-center justify-between gap-6 py-6 text-left transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
                    >
                      <span className={cn("text-base font-bold sm:text-lg", isOpen ? "text-gold" : "text-ivory")}>
                        {item.q}
                      </span>
                      <Plus
                        className={cn(
                          "h-5 w-5 shrink-0 text-gold transition-transform duration-300",
                          isOpen && "rotate-45"
                        )}
                        aria-hidden="true"
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-button-${i}`}
                    className={cn("acc-panel", isOpen && "open")}
                  >
                    <div className="acc-inner">
                      <p className="max-w-2xl pb-7 text-sm leading-relaxed text-fog sm:text-base">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
