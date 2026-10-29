import { BUSINESS, IMAGES } from "@/data/site";
import { GoldButton, GhostButton, GoldDivider, Img, Reveal } from "@/components/ui";

export default function FinalCta({ onBook }: { onBook: () => void }) {
  return (
    <section className="relative overflow-hidden border-t border-line py-28 md:py-40">
      <div className="absolute inset-0">
        <Img
          src={IMAGES.finalCta}
          alt="Smiling bearded barber holding a mirror in a stylish barbershop"
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-obsidian/85" />
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-transparent to-obsidian" />
      </div>

      <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
        <Reveal>
          <h2 className="font-display text-5xl font-medium leading-[1.02] text-ivory sm:text-6xl lg:text-7xl">
            YOUR CHAIR IS <span className="italic text-gold">WAITING.</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-fog sm:text-lg">
            Your next great look starts here. Step into {BUSINESS.name} and experience grooming designed to help
            you feel like the star you are.
          </p>
        </Reveal>
        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <GoldButton onClick={onBook} ariaLabel="Book your appointment">
              Book Your Appointment
            </GoldButton>
            <GhostButton href="#services">Explore Our Services</GhostButton>
          </div>
        </Reveal>
        <Reveal delay={320}>
          <GoldDivider className="mt-16" />
          <p className="mt-8 text-xs font-extrabold uppercase tracking-[0.5em] text-ivory">
            {BUSINESS.wordmarkTop} {BUSINESS.wordmarkBottom}
          </p>
          <p className="mt-3 font-script text-4xl text-gold sm:text-5xl">“{BUSINESS.tagline}”</p>
        </Reveal>
      </div>
    </section>
  );
}
