import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Info, X, ZoomIn } from "lucide-react";
import { GALLERY, GALLERY_FILTERS, type GalleryItem } from "@/data/site";
import { GoldButton, Img, Reveal, SectionHeading } from "@/components/ui";
import { cn } from "@/utils/cn";

export default function Gallery({ onBook }: { onBook: () => void }) {
  const [filter, setFilter] = useState("all");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const items = GALLERY.filter((g) => filter === "all" || g.category === filter);
  const current: GalleryItem | null = lightbox !== null ? items[lightbox] ?? null : null;

  useEffect(() => {
    setLightbox(null);
  }, [filter]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") setLightbox((i) => (i === null ? null : (i + 1) % items.length));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? null : (i - 1 + items.length) % items.length));
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, items.length]);

  useEffect(() => {
    if (lightbox !== null) closeRef.current?.focus();
  }, [lightbox]);

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <SectionHeading
          eyebrow="Our Work"
          title={
            <>
              THE ART SPEAKS <span className="italic text-gold">FOR ITSELF.</span>
            </>
          }
          copy="Explore the details, precision, and personal style behind every look."
        />

        <Reveal delay={150}>
          <p className="mt-6 flex items-center justify-center gap-2 text-center text-xs italic text-fog">
            <Info className="h-4 w-4 shrink-0 text-gold/70" aria-hidden="true" />
            Sample placeholder imagery — easy to swap for Elvis’s real portfolio photos.
          </p>
        </Reveal>

        {/* Filters */}
        <Reveal delay={200}>
          <div
            role="group"
            aria-label="Filter gallery"
            className="mt-10 flex flex-wrap items-center justify-center gap-2.5"
          >
            {GALLERY_FILTERS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(f.id)}
                aria-pressed={filter === f.id}
                className={cn(
                  "border px-5 py-2.5 text-[0.64rem] font-bold uppercase tracking-[0.24em] transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                  filter === f.id
                    ? "border-gold bg-gold text-obsidian"
                    : "border-line bg-transparent text-fog hover:border-gold/50 hover:text-ivory"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Masonry-inspired editorial grid */}
        <div className="mt-12 columns-2 gap-4 md:columns-3 [&>*]:mb-4">
          {items.map((item, idx) => (
            <Reveal key={item.id} delay={(idx % 3) * 80}>
              <button
                type="button"
                onClick={() => setLightbox(idx)}
                aria-label={`Open image: ${item.title}`}
                className="group relative block w-full overflow-hidden border border-white/[0.06] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
              >
                <Img
                  src={item.src}
                  alt={item.alt}
                  className={cn(
                    item.ratio,
                    "w-full object-cover transition-transform duration-[1100ms] ease-out group-hover:scale-[1.06]"
                  )}
                />
                <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-obsidian/95 via-obsidian/20 to-transparent p-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <span className="text-[0.58rem] font-bold uppercase tracking-[0.3em] text-gold">
                    {GALLERY_FILTERS.find((f) => f.id === item.category)?.label}
                  </span>
                  <span className="mt-1 font-display text-xl text-ivory">{item.title}</span>
                </div>
                <span
                  className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-obsidian/60 text-gold opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                >
                  <ZoomIn className="h-4 w-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>

        <Reveal delay={100}>
          <div className="mt-14 text-center">
            <GoldButton onClick={onBook} ariaLabel="Book your next look">
              Book Your Next Look
            </GoldButton>
          </div>
        </Reveal>
      </div>

      {/* Lightbox */}
      {current && lightbox !== null && (
        <div
          className="fade-in fixed inset-0 z-[70] flex flex-col bg-obsidian/95 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
        >
          <div className="absolute inset-0" onClick={() => setLightbox(null)} aria-hidden="true" />

          <div className="relative z-10 flex items-center justify-between px-5 py-4 md:px-8">
            <p className="text-[0.64rem] font-bold uppercase tracking-[0.3em] text-fog">
              {lightbox + 1} / {items.length} —{" "}
              <span className="text-gold">{GALLERY_FILTERS.find((f) => f.id === current.category)?.label}</span>
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setLightbox(null)}
              aria-label="Close image viewer"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 bg-obsidian/60 text-ivory transition-colors hover:bg-gold hover:text-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="relative z-10 flex flex-1 items-center justify-center px-14 pb-4 md:px-24">
            <button
              type="button"
              onClick={() => setLightbox((lightbox - 1 + items.length) % items.length)}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-obsidian/60 text-ivory transition-colors hover:bg-gold hover:text-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <figure key={current.id} className="modal-in flex max-h-full flex-col items-center">
              <Img
                src={current.src}
                alt={current.alt}
                eager
                className="max-h-[68vh] max-w-full border border-line object-contain shadow-[0_30px_80px_rgba(0,0,0,0.7)]"
              />
              <figcaption className="mt-4 text-center">
                <span className="font-display text-xl text-ivory">{current.title}</span>
                <span className="mt-1 block text-[0.62rem] font-bold uppercase tracking-[0.3em] text-gold">
                  Sample placeholder image
                </span>
              </figcaption>
            </figure>

            <button
              type="button"
              onClick={() => setLightbox((lightbox + 1) % items.length)}
              aria-label="Next image"
              className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-obsidian/60 text-ivory transition-colors hover:bg-gold hover:text-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold md:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
