import { IMAGES } from "@/data/site";
import { Img, Reveal, SectionHeading } from "@/components/ui";

const PILLARS = [
  { n: "01", title: "PRECISION", copy: "Thoughtful attention to every blend, line, and finishing detail." },
  { n: "02", title: "COMFORT", copy: "A relaxing environment where you can take a moment for yourself." },
  { n: "03", title: "PERSONAL STYLE", copy: "Grooming tailored to your individual preferences and look." },
  { n: "04", title: "STAR TREATMENT", copy: "A welcoming experience built around respect, care, and confidence." },
];

export default function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden border-t border-line bg-charcoal py-24 md:py-32">
      <div className="absolute inset-0" aria-hidden="true">
        <Img
          src={IMAGES.experienceBg}
          alt=""
          className="slow-drift h-full w-full object-cover opacity-[0.13]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-transparent to-charcoal" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="The Hollywdd Difference"
          title={
            <>
              STEP IN. UNWIND. <span className="italic text-gold">SHINE.</span>
            </>
          }
        />

        <div className="mt-16 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 110} className="h-full">
              <div className="group flex h-full flex-col bg-obsidian/80 p-8 backdrop-blur-sm transition-colors duration-500 hover:bg-charcoal md:p-9">
                <span className="font-display text-5xl font-medium text-gold/40 transition-colors duration-500 group-hover:text-gold">
                  {p.n}
                </span>
                <span className="mt-6 h-px w-12 bg-gold/50 transition-all duration-500 group-hover:w-20 group-hover:bg-gold" aria-hidden="true" />
                <h3 className="mt-5 text-sm font-extrabold uppercase tracking-[0.32em] text-ivory">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-fog">{p.copy}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
