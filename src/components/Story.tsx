import { Armchair, Crown, Scissors } from "lucide-react";
import { BUSINESS, IMAGES } from "@/data/site";
import { Eyebrow, GhostButton, Img, Reveal } from "@/components/ui";

const PRINCIPLES = [
  { icon: Scissors, title: "Craftsmanship in Every Cut" },
  { icon: Armchair, title: "Comfort in Every Visit" },
  { icon: Crown, title: "Star Treatment for Every Client" },
];

export default function Story() {
  return (
    <section id="story" className="relative overflow-hidden border-t border-line bg-charcoal/40 py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-2">
        <Reveal className="relative">
          <div
            className="absolute -left-4 -top-4 h-full w-full border border-gold/30"
            aria-hidden="true"
          />
          <Img
            src={IMAGES.story}
            alt="Luxurious barbershop interior with modern styling chairs, large mirrors, and elegant lighting"
            className="relative aspect-[4/5] w-full object-cover"
          />
          <div className="absolute -bottom-7 -right-3 hidden border border-line bg-obsidian/90 px-7 py-5 backdrop-blur-sm sm:block md:-right-7">
            <p className="font-script text-3xl text-gold">Everybody is a star.</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <Eyebrow>Our Story</Eyebrow>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] text-ivory sm:text-5xl lg:text-6xl">
              MORE THAN A BARBERSHOP.
              <br />
              <span className="italic text-gold">IT’S AN EXPERIENCE.</span>
            </h2>
          </Reveal>
          <Reveal delay={200}>
            <div className="mt-7 max-w-xl space-y-5 text-base leading-relaxed text-fog sm:text-lg">
              <p>
                At {BUSINESS.name}, we believe everyone deserves to feel confident, comfortable, and valued.
              </p>
              <p>
                Founded around a simple idea — everybody is a star — our approach combines professional
                barbering, thoughtful attention to detail, and a welcoming atmosphere where you can relax and
                focus on yourself.
              </p>
              <p>
                From the moment you sit in the chair to the final look in the mirror, every detail matters. Our
                goal is simple: help you look your best, feel your best, and leave with confidence.
              </p>
            </div>
          </Reveal>

          <Reveal delay={280}>
            <ul className="mt-9 space-y-4">
              {PRINCIPLES.map((p) => (
                <li key={p.title} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-gold/30 bg-obsidian text-gold">
                    <p.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-bold uppercase tracking-[0.22em] text-ivory/90">{p.title}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={340}>
            <p className="mt-9 font-script text-3xl text-gold sm:text-4xl">
              “Your style is personal. Your experience should be exceptional.”
            </p>
          </Reveal>

          <Reveal delay={400}>
            <GhostButton href="#experience" className="mt-9">
              Discover the Hollywdd Experience
            </GhostButton>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
