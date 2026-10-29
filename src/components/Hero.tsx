import { ArrowDown, ChevronDown, Crown, Scissors, Sparkles } from "lucide-react";
import { BUSINESS, IMAGES } from "@/data/site";
import { GoldButton, GhostButton, Img, Reveal } from "@/components/ui";

const HIGHLIGHTS = [
  { icon: Scissors, label: "Precision Craftsmanship" },
  { icon: Sparkles, label: "Premium Grooming" },
  { icon: Crown, label: "Star-Level Service" },
];

export default function Hero({ onBook }: { onBook: () => void }) {
  return (
    <section id="home" className="relative flex min-h-svh items-center overflow-hidden">
      {/* Cinematic backdrop */}
      <div className="absolute inset-0">
        <Img
          src={IMAGES.hero}
          alt="Master barber perfecting a precise fade with clippers in a moody, cinematic barbershop"
          eager
          className="hero-img h-full w-full object-cover object-center"
        />
        <div className="anim-fade absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/85 to-obsidian/25" />
        <div className="anim-fade absolute inset-0 bg-gradient-to-t from-obsidian via-transparent to-obsidian/70" style={{ animationDelay: "0.3s" }} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-32 md:px-10 md:pt-36">
        <p
          className="anim-rise flex items-center gap-4 text-[0.66rem] font-bold uppercase tracking-[0.44em] text-gold sm:text-[0.72rem]"
          style={{ animationDelay: "0.15s" }}
        >
          <span className="anim-line inline-block h-px w-12 bg-gold" aria-hidden="true" />
          The Art of Premium Grooming
        </p>

        <h1
          className="anim-rise mt-7 font-display text-[3.4rem] font-medium leading-[0.95] text-ivory sm:text-7xl lg:text-8xl"
          style={{ animationDelay: "0.3s" }}
        >
          EVERY DETAIL.
          <br />
          EVERY CUT.
          <br />
          <span className="italic text-gold">STAR QUALITY.</span>
        </h1>

        <p
          className="anim-rise mt-7 font-script text-4xl text-gold sm:text-5xl"
          style={{ animationDelay: "0.5s" }}
        >
          Welcome to {BUSINESS.name}.
        </p>

        <p
          className="anim-rise mt-3 text-xs font-bold uppercase tracking-[0.34em] text-ivory/80"
          style={{ animationDelay: "0.6s" }}
        >
          “{BUSINESS.tagline}”
        </p>

        <p
          className="anim-rise mt-6 max-w-xl text-base leading-relaxed text-fog sm:text-lg"
          style={{ animationDelay: "0.7s" }}
        >
          Experience precision barbering, elevated grooming, and a welcoming atmosphere designed to help you
          look sharp, feel confident, and leave feeling like a star.
        </p>

        <div
          className="anim-rise mt-10 flex flex-wrap items-center gap-4"
          style={{ animationDelay: "0.85s" }}
        >
          <GoldButton onClick={onBook} ariaLabel="Book your appointment">
            Book Your Appointment
          </GoldButton>
          <GhostButton href="#services">Explore Our Services</GhostButton>
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-2 py-3 text-[0.68rem] font-bold uppercase tracking-[0.28em] text-ivory/70 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            Walk-ins Welcome
            <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
          </a>
        </div>

        <div
          className="anim-rise mt-14 grid max-w-xl grid-cols-1 divide-y divide-line border-y border-line sm:grid-cols-3 sm:divide-x sm:divide-y-0"
          style={{ animationDelay: "1s" }}
        >
          {HIGHLIGHTS.map((h) => (
            <div key={h.label} className="flex items-center gap-3 px-1 py-4 sm:justify-center sm:px-4">
              <h.icon className="h-5 w-5 shrink-0 text-gold" aria-hidden="true" />
              <span className="text-[0.6rem] font-bold uppercase tracking-[0.22em] text-ivory/85 sm:text-[0.64rem]">
                {h.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <a
        href="#services"
        aria-label="Scroll down to services"
        className="anim-fade absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ivory/50 transition-colors hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold md:flex"
        style={{ animationDelay: "1.4s" }}
      >
        <span className="text-[0.58rem] font-bold uppercase tracking-[0.34em]">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </a>
    </section>
  );
}

/** Elegant script tagline divider between hero and services. */
export function TaglineStrip() {
  return (
    <div className="border-b border-line bg-obsidian py-10 md:py-12">
      <Reveal>
        <p className="px-6 text-center font-script text-4xl text-gold sm:text-5xl">
          “{BUSINESS.tagline}”
        </p>
      </Reveal>
    </div>
  );
}
