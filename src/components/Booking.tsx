import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Info,
  Loader2,
  Pencil,
  Scissors,
  User,
  X,
} from "lucide-react";
import { BUSINESS, SERVICES } from "@/data/site";
import { cn } from "@/utils/cn";
import Logo from "@/components/Logo";
import { GoldButton, GhostButton, Img } from "@/components/ui";

const STEPS = ["Service", "Barber", "Date", "Time", "Details", "Review"];
const TIMES = [
  "9:00 AM", "9:45 AM", "10:30 AM", "11:15 AM", "12:00 PM", "1:00 PM",
  "1:45 PM", "2:30 PM", "3:15 PM", "4:00 PM", "4:45 PM", "5:30 PM",
];
const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};
const monthStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);
const sameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
const fmtDate = (d: Date) =>
  d.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });

function makeRef(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "";
  for (let i = 0; i < 6; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `HG-${s}`;
}

type Form = { name: string; phone: string; email: string; notes: string };
type Errors = Partial<Record<"name" | "phone" | "email", string>>;
const EMPTY_FORM: Form = { name: "", phone: "", email: "", notes: "" };

const inputCls = (invalid?: boolean) =>
  cn(
    "w-full border bg-obsidian/70 px-4 py-3.5 text-sm text-ivory placeholder:text-fog/40 transition-colors focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold/40",
    invalid ? "border-alert/60" : "border-white/10"
  );

export default function Booking({
  open,
  initialService,
  onClose,
}: {
  open: boolean;
  initialService?: string | null;
  onClose: () => void;
}) {
  const [step, setStep] = useState(1);
  const [maxStep, setMaxStep] = useState(1);
  const [service, setService] = useState<string | null>(null);
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [view, setView] = useState<Date>(monthStart(new Date()));
  const [form, setForm] = useState<Form>(EMPTY_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [ref, setRef] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const today = startOfDay(new Date());

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setRef(null);
      setSubmitting(false);
      if (initialService) setService(initialService);
    }
  }, [open, initialService]);

  useEffect(() => {
    panelRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [step, ref]);

  if (!open) return null;

  const selectedService = SERVICES.find((s) => s.id === service) ?? null;

  const validateForm = (show: boolean): boolean => {
    const errs: Errors = {};
    if (form.name.trim().length < 2) errs.name = "Please enter your full name.";
    const digits = form.phone.replace(/\D/g, "");
    if (!/^[\d\s()+.-]+$/.test(form.phone.trim()) || digits.length < 7)
      errs.phone = "Please enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim()))
      errs.email = "Please enter a valid email address.";
    if (show) setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const canContinue =
    (step === 1 && !!service) ||
    step === 2 ||
    (step === 3 && !!date) ||
    (step === 4 && !!time) ||
    (step === 5 && validateForm(false));

  const goNext = () => {
    if (step === 5 && !validateForm(true)) return;
    if (!canContinue || submitting) return;
    setMaxStep((m) => Math.max(m, step + 1));
    setStep((s) => Math.min(6, s + 1));
  };

  const goTo = (n: number) => {
    if (n <= maxStep && !submitting) setStep(n);
  };

  const submit = () => {
    if (submitting) return;
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setRef(makeRef());
    }, 1400);
  };

  const resetAll = () => {
    setService(null);
    setDate(null);
    setTime(null);
    setForm(EMPTY_FORM);
    setErrors({});
    setStep(1);
    setMaxStep(1);
    setRef(null);
    setView(monthStart(new Date()));
  };

  /* Calendar derivation */
  const first = monthStart(view);
  const offset = first.getDay();
  const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: offset }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(view.getFullYear(), view.getMonth(), i + 1)),
  ];
  const prevDisabled = sameMonth(view, monthStart(today));
  const nextDisabled = sameMonth(view, addMonths(monthStart(today), 6));

  const setField = (key: keyof Form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key as keyof Errors]) setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const summaryChip = (label: string, value: string, goToStep: number) => (
    <span className="inline-flex items-center gap-2 border border-line bg-obsidian/60 px-3 py-1.5 text-xs text-ivory/80">
      <span className="font-bold uppercase tracking-[0.18em] text-gold/80">{label}</span>
      {value}
      <button
        type="button"
        onClick={() => goTo(goToStep)}
        aria-label={`Edit ${label.toLowerCase()}`}
        className="text-gold transition-colors hover:text-gold-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
      >
        <Pencil className="h-3.5 w-3.5" />
      </button>
    </span>
  );

  return (
    <div
      className="fade-in fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-title"
    >
      <button
        type="button"
        aria-label="Close booking dialog"
        className="absolute inset-0 cursor-default bg-obsidian/85 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="modal-in relative flex max-h-[94vh] w-full max-w-3xl flex-col overflow-y-auto border border-line bg-charcoal shadow-[0_40px_120px_rgba(0,0,0,0.8)]"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-line bg-charcoal/95 px-6 py-5 backdrop-blur md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Logo variant="icon" tone="gold" className="h-9 w-12 shrink-0" />
              <div>
                <p className="text-[0.6rem] font-bold uppercase tracking-[0.34em] text-gold">
                  Book an Appointment
                </p>
                <h2 id="booking-title" className="mt-1 font-display text-2xl font-medium text-ivory md:text-3xl">
                  Reserve Your Chair
                </h2>
              </div>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close booking"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Stepper */}
          {!ref && (
            <ol className="mt-5 flex items-center gap-1 overflow-x-auto sm:gap-2" aria-label="Booking progress">
              {STEPS.map((label, i) => {
                const n = i + 1;
                const reached = n <= maxStep;
                const current = n === step;
                return (
                  <li key={label} className="flex items-center gap-1 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => goTo(n)}
                      disabled={!reached}
                      aria-current={current ? "step" : undefined}
                      className={cn(
                        "flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[0.6rem] font-bold uppercase tracking-[0.2em] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                        current
                          ? "border-gold bg-gold/10 text-gold"
                          : reached
                            ? "border-gold/40 text-gold/80 hover:bg-gold/10"
                            : "cursor-default border-white/10 text-fog/50"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-full text-[0.55rem]",
                          current ? "bg-gold text-obsidian" : reached ? "border border-gold/50 text-gold" : "border border-white/10"
                        )}
                        aria-hidden="true"
                      >
                        {n < step ? <Check className="h-3 w-3" /> : n}
                      </span>
                      <span className="hidden sm:inline">{label}</span>
                    </button>
                    {i < STEPS.length - 1 && <span className="h-px w-3 shrink-0 bg-line sm:w-5" aria-hidden="true" />}
                  </li>
                );
              })}
            </ol>
          )}
        </div>

        {/* Body */}
        {ref ? (
          <div className="step-in px-6 py-14 text-center md:px-12">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-gold/50 bg-gold/10">
              <Check className="h-9 w-9 text-gold" aria-hidden="true" />
            </div>
            <h3 className="mt-7 font-display text-4xl font-medium text-ivory">Request Received</h3>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-fog">
              Thank you{form.name ? `, ${form.name.split(" ")[0]}` : ""}. Your appointment request has been
              prepared for review.
            </p>
            <div className="mx-auto mt-7 inline-block border border-gold/30 bg-obsidian/60 px-8 py-4">
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.34em] text-fog">Demo reference</p>
              <p className="mt-1.5 font-display text-3xl tracking-[0.18em] text-gold">{ref}</p>
            </div>
            <dl className="mx-auto mt-8 max-w-md space-y-2.5 text-left text-sm">
              {[
                ["Service", selectedService?.name],
                ["Barber", `${BUSINESS.barber.name} (${BUSINESS.barber.alias})`],
                ["Date", date ? fmtDate(date) : undefined],
                ["Time", time ?? undefined],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-6 border-b border-white/[0.06] pb-2.5">
                  <dt className="font-bold uppercase tracking-[0.2em] text-fog">{k}</dt>
                  <dd className="text-right text-ivory">{v}</dd>
                </div>
              ))}
            </dl>
            <div className="mx-auto mt-8 flex max-w-md items-start gap-3 border border-line bg-obsidian/60 p-4 text-left">
              <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
              <p className="text-xs leading-relaxed text-fog">
                <span className="font-bold text-ivory/90">Demonstration only.</span> This is a front-end demo:
                your request has not been sent to the barber and no live calendar entry was created. No payment was
                collected. The shop will confirm actual availability once a real scheduling system is connected.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap justify-center gap-4">
              <GoldButton onClick={resetAll} ariaLabel="Book another appointment">
                Book Another Appointment
              </GoldButton>
              <GhostButton onClick={onClose}>Close</GhostButton>
            </div>
          </div>
        ) : (
          <div key={step} className="step-in px-6 py-8 md:px-8">
            {/* STEP 1 — Service */}
            {step === 1 && (
              <div>
                <h3 className="font-display text-2xl text-ivory md:text-3xl">Choose your service</h3>
                <p className="mt-2 text-sm text-fog">
                  Select the grooming service you’d like. Pricing is confirmed with the shop when booking.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-2" role="radiogroup" aria-label="Select a service">
                  {SERVICES.map((s) => {
                    const selected = service === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setService(s.id)}
                        className={cn(
                          "relative border p-5 text-left transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                          selected
                            ? "border-gold bg-gold/[0.07] shadow-[inset_0_0_0_1px_rgba(212,175,102,0.4)]"
                            : "border-white/10 bg-obsidian/50 hover:border-gold/40"
                        )}
                      >
                        {selected && (
                          <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-obsidian" aria-hidden="true">
                            <Check className="h-3.5 w-3.5" />
                          </span>
                        )}
                        <span className="flex items-center gap-2.5 text-sm font-extrabold uppercase tracking-[0.22em] text-ivory">
                          <Scissors className="h-4 w-4 text-gold" aria-hidden="true" />
                          {s.name}
                        </span>
                        <span className="mt-2 block text-xs leading-relaxed text-fog">{s.blurb}</span>
                        <span className="mt-3 block text-[0.58rem] font-bold uppercase tracking-[0.24em] text-gold/70">
                          Contact for pricing
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 2 — Barber */}
            {step === 2 && (
              <div>
                <h3 className="font-display text-2xl text-ivory md:text-3xl">Choose your barber</h3>
                <p className="mt-2 text-sm text-fog">Your session is with the master barber behind the brand.</p>
                <div className="mt-7">
                  <div
                    role="radio"
                    aria-checked="true"
                    className="relative flex items-center gap-5 border border-gold bg-gold/[0.07] p-5 shadow-[inset_0_0_0_1px_rgba(212,175,102,0.4)]"
                  >
                    <span className="absolute right-4 top-4 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-obsidian" aria-hidden="true">
                      <Check className="h-3.5 w-3.5" />
                    </span>
                    <Img
                      src={BUSINESS.barber.photo}
                      alt={`Portrait of ${BUSINESS.barber.name}, master barber`}
                      className="h-20 w-20 shrink-0 rounded-full border border-gold/50 object-cover"
                    />
                    <div>
                      <p className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.22em] text-ivory">
                        <User className="h-4 w-4 text-gold" aria-hidden="true" />
                        {BUSINESS.barber.name}
                      </p>
                      <p className="mt-1 font-script text-2xl text-gold">{BUSINESS.barber.alias}</p>
                      <p className="mt-1 text-xs uppercase tracking-[0.24em] text-fog">{BUSINESS.barber.role}</p>
                    </div>
                  </div>
                  <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-fog">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold/70" aria-hidden="true" />
                    Elvis Matthews — known professionally as Hollywdd — is currently the only barber listed. More
                    team members may be added in the future.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 3 — Date */}
            {step === 3 && (
              <div>
                <h3 className="font-display text-2xl text-ivory md:text-3xl">Pick a date</h3>
                <p className="mt-2 text-sm text-fog">Choose any future date. Past dates are unavailable.</p>
                <div className="mt-7 border border-line bg-obsidian/50 p-5 md:p-6">
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setView(addMonths(view, -1))}
                      disabled={prevDisabled}
                      aria-label="Previous month"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <p className="font-display text-2xl text-ivory" aria-live="polite">
                      {view.toLocaleDateString(undefined, { month: "long", year: "numeric" })}
                    </p>
                    <button
                      type="button"
                      onClick={() => setView(addMonths(view, 1))}
                      disabled={nextDisabled}
                      aria-label="Next month"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ivory transition-colors hover:border-gold hover:text-gold disabled:pointer-events-none disabled:opacity-30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="mt-5 grid grid-cols-7 gap-1.5">
                    {WEEKDAYS.map((w) => (
                      <span
                        key={w}
                        className="py-2 text-center text-[0.6rem] font-bold uppercase tracking-[0.2em] text-fog"
                      >
                        {w}
                      </span>
                    ))}
                    {cells.map((d, i) => {
                      if (!d) return <span key={`empty-${i}`} aria-hidden="true" />;
                      const isPast = startOfDay(d) < today;
                      const isSelected = date !== null && startOfDay(d).getTime() === startOfDay(date).getTime();
                      const isToday = startOfDay(d).getTime() === today.getTime();
                      return (
                        <button
                          key={d.toISOString()}
                          type="button"
                          disabled={isPast}
                          aria-pressed={isSelected}
                          aria-label={fmtDate(d)}
                          onClick={() => setDate(d)}
                          className={cn(
                            "aspect-square rounded-full text-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                            isSelected
                              ? "bg-gold font-extrabold text-obsidian shadow-[0_6px_20px_-4px_rgba(212,175,102,0.6)]"
                              : isPast
                                ? "cursor-not-allowed text-fog/30 line-through"
                                : isToday
                                  ? "border border-gold/60 text-gold hover:bg-gold/10"
                                  : "text-ivory/85 hover:border hover:border-gold/40 hover:bg-gold/10"
                          )}
                        >
                          {d.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {date && (
                  <p className="mt-4 flex items-center gap-2 text-sm text-gold" aria-live="polite">
                    <CalendarDays className="h-4 w-4" aria-hidden="true" />
                    Selected: {fmtDate(date)}
                  </p>
                )}
              </div>
            )}

            {/* STEP 4 — Time */}
            {step === 4 && (
              <div>
                <h3 className="font-display text-2xl text-ivory md:text-3xl">Choose a time</h3>
                <p className="mt-2 text-sm text-fog">
                  {date ? fmtDate(date) : "Select a date first"} — pick one appointment time.
                </p>
                <div className="mt-7 grid grid-cols-3 gap-2.5 sm:grid-cols-4">
                  {TIMES.map((t) => {
                    const selected = time === t;
                    return (
                      <button
                        key={t}
                        type="button"
                        aria-pressed={selected}
                        onClick={() => setTime(t)}
                        className={cn(
                          "flex items-center justify-center gap-2 border px-3 py-3.5 text-xs font-bold tracking-[0.12em] transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold",
                          selected
                            ? "border-gold bg-gold text-obsidian"
                            : "border-white/10 bg-obsidian/50 text-ivory/85 hover:border-gold/50 hover:text-gold"
                        )}
                      >
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {t}
                      </button>
                    );
                  })}
                </div>
                <p className="mt-5 flex items-start gap-2 border border-line bg-obsidian/50 p-4 text-xs leading-relaxed text-fog">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  These times are illustrative. Actual availability must be confirmed once a real scheduling system
                  is connected to the shop.
                </p>
              </div>
            )}

            {/* STEP 5 — Details */}
            {step === 5 && (
              <form
                onSubmit={(e: FormEvent) => {
                  e.preventDefault();
                  goNext();
                }}
                noValidate
              >
                <h3 className="font-display text-2xl text-ivory md:text-3xl">Your details</h3>
                <p className="mt-2 text-sm text-fog">How the shop will reach you about your request.</p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {selectedService && summaryChip("Service", selectedService.name, 1)}
                  {date && summaryChip("Date", fmtDate(date), 3)}
                  {time && summaryChip("Time", time, 4)}
                </div>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <label className="block">
                    <span className="mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.28em] text-fog">
                      Full name *
                    </span>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setField("name", e.target.value)}
                      placeholder="Your full name"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "err-name" : undefined}
                      className={inputCls(!!errors.name)}
                    />
                    {errors.name && (
                      <span id="err-name" role="alert" className="mt-2 block text-xs text-alert">
                        {errors.name}
                      </span>
                    )}
                  </label>
                  <label className="block">
                    <span className="mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.28em] text-fog">
                      Phone number *
                    </span>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setField("phone", e.target.value)}
                      placeholder="(555) 000-0000"
                      autoComplete="tel"
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "err-phone" : undefined}
                      className={inputCls(!!errors.phone)}
                    />
                    {errors.phone && (
                      <span id="err-phone" role="alert" className="mt-2 block text-xs text-alert">
                        {errors.phone}
                      </span>
                    )}
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.28em] text-fog">
                      Email address *
                    </span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setField("email", e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "err-email" : undefined}
                      className={inputCls(!!errors.email)}
                    />
                    {errors.email && (
                      <span id="err-email" role="alert" className="mt-2 block text-xs text-alert">
                        {errors.email}
                      </span>
                    )}
                  </label>
                  <label className="block sm:col-span-2">
                    <span className="mb-2 block text-[0.62rem] font-bold uppercase tracking-[0.28em] text-fog">
                      Notes or preferred style <span className="normal-case tracking-normal text-fog/60">(optional)</span>
                    </span>
                    <textarea
                      value={form.notes}
                      onChange={(e) => setField("notes", e.target.value)}
                      placeholder="Bring a reference photo, or describe the look you want…"
                      rows={4}
                      className={cn(inputCls(false), "resize-y")}
                    />
                  </label>
                </div>
              </form>
            )}

            {/* STEP 6 — Review */}
            {step === 6 && (
              <div>
                <h3 className="font-display text-2xl text-ivory md:text-3xl">Review &amp; confirm</h3>
                <p className="mt-2 text-sm text-fog">Check everything, then send your appointment request.</p>
                <dl className="mt-7 divide-y divide-white/[0.06] border-y border-white/[0.06]">
                  {(
                    [
                      ["Service", selectedService?.name, 1],
                      ["Barber", `${BUSINESS.barber.name} (${BUSINESS.barber.alias})`, 2],
                      ["Date", date ? fmtDate(date) : "", 3],
                      ["Time", time ?? "", 4],
                      ["Name", form.name, 5],
                      ["Phone", form.phone, 5],
                      ["Email", form.email, 5],
                      ["Notes", form.notes.trim() || "—", 5],
                    ] as [string, string | undefined, number][]
                  ).map(([label, value, editStep]) => (
                    <div key={label} className="flex items-center justify-between gap-6 py-3.5">
                      <dt className="text-[0.62rem] font-bold uppercase tracking-[0.26em] text-fog">{label}</dt>
                      <dd className="flex-1 text-right text-sm text-ivory">{value}</dd>
                      <button
                        type="button"
                        onClick={() => goTo(editStep)}
                        aria-label={`Edit ${label.toLowerCase()}`}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-gold transition-colors hover:bg-gold hover:text-obsidian focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </dl>
                <div className="mt-6 flex items-start gap-3 border border-line bg-obsidian/60 p-4">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
                  <p className="text-xs leading-relaxed text-fog">
                    <span className="font-bold text-ivory/90">Demo booking.</span> Submitting this form does not
                    send anything to the shop and does not create a real reservation or collect payment. It is a
                    front-end demonstration until the shop’s live scheduling system is connected.
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer nav */}
        {!ref && (
          <div className="sticky bottom-0 flex items-center justify-between gap-4 border-t border-line bg-charcoal/95 px-6 py-4 backdrop-blur md:px-8">
            <GhostButton
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1 || submitting}
              className="px-5 py-3"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back
            </GhostButton>
            {step < 6 ? (
              <GoldButton onClick={goNext} disabled={!canContinue || submitting} className="px-6 py-3.5">
                Continue
              </GoldButton>
            ) : (
              <GoldButton onClick={submit} disabled={submitting} className="px-6 py-3.5" ariaLabel="Request appointment">
                {submitting ? (
                  <>
                    <Loader2 className="spinner h-4 w-4" aria-hidden="true" />
                    Sending Request…
                  </>
                ) : (
                  "Request Appointment"
                )}
              </GoldButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
