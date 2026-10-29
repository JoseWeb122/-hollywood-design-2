/**
 * Central content + configuration for Hollywdd Groom’n.
 *
 * Business details (phone, address, hours, socials) are intentionally `null`
 * until verified by the shop — the UI renders honest "coming soon" placeholders.
 * Sample imagery is clearly labeled as placeholder photography throughout.
 */

const px = (id: number, w = 1200, h?: number): string =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}${
    h ? `&h=${h}&fit=crop` : ""
  }`;

export const BUSINESS = {
  name: "Hollywdd Groom’n",
  wordmarkTop: "HOLLYWDD",
  wordmarkBottom: "GROOM’N",
  tagline: "Where Everybody Is a Star.",
  barber: {
    name: "Elvis Matthews",
    alias: "Hollywdd",
    role: "Master Barber",
    photo: px(7518766, 640, 640),
  },
  /* --- Configurable, unverified details (null = show placeholder) --- */
  phone: null as string | null,
  address: null as string | null,
  city: null as string | null,
  hours: null as string | null,
  email: null as string | null,
  mapsUrl: null as string | null,
  socials: [
    { label: "Instagram", url: null as string | null },
    { label: "Facebook", url: null as string | null },
    { label: "TikTok", url: null as string | null },
  ],
};

export const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "story", label: "Our Story" },
  { id: "work", label: "Our Work" },
  { id: "reviews", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export const IMAGES = {
  hero: px(39559270, 2400, 1400),
  story: px(19664872, 1300, 1625),
  experienceBg: px(3993296, 1800, 1000),
  finalCta: px(18987112, 2200, 1300),
};

export type Service = {
  id: string;
  name: string;
  blurb: string;
  img: string;
  alt: string;
};

export const SERVICES: Service[] = [
  {
    id: "clean-fades",
    name: "Clean Fades",
    blurb: "Precision fades, seamless blends, and sharp finishing details.",
    img: px(4625632, 900, 1125),
    alt: "Barber using clippers on the back of a client's head to build a clean fade",
  },
  {
    id: "signature-haircuts",
    name: "Signature Haircuts",
    blurb: "Personalized cuts tailored to your style, features, and preferred finish.",
    img: px(13138585, 900, 1125),
    alt: "Barber giving a precise haircut to a client in a contemporary barbershop",
  },
  {
    id: "beard-grooming",
    name: "Beard Grooming",
    blurb: "Professional beard shaping, clean lines, and detailed finishing.",
    img: px(5853394, 900, 1125),
    alt: "Close-up of a barber trimming a client's beard with scissors and a comb",
  },
  {
    id: "hot-towel-shaves",
    name: "Hot Towel Shaves",
    blurb: "A relaxing traditional shaving experience with a refined, comfortable finish.",
    img: px(12302334, 900, 1125),
    alt: "Barber performing a traditional straight-razor shave with a warm towel",
  },
  {
    id: "facial-cleansing",
    name: "Facial Cleansing",
    blurb: "A refreshing facial cleansing experience to help you feel clean and revitalized.",
    img: px(12302331, 900, 1125),
    alt: "Man receiving a hot towel facial treatment at a barbershop",
  },
  {
    id: "face-steaming",
    name: "Face Steaming",
    blurb: "A relaxing facial steaming service as part of a premium grooming experience.",
    img: px(7697492, 900, 1125),
    alt: "Barber applying a warm steaming towel to a client's face",
  },
  {
    id: "color-retouch",
    name: "Color Retouch",
    blurb: "Professional color touch-ups to maintain a polished, consistent appearance.",
    img: px(3993145, 900, 1125),
    alt: "Hair color being prepared in a bowl during a professional color service",
  },
  {
    id: "additional-grooming",
    name: "Additional Grooming",
    blurb: "Additional services and personalized grooming options available at the shop.",
    img: px(7697490, 900, 1125),
    alt: "Barber tools — shears, comb, and straight razor — arranged on black cloth",
  },
];

export type GalleryCategory = "fades" | "haircuts" | "beard" | "transformations";

export const GALLERY_FILTERS: { id: string; label: string }[] = [
  { id: "all", label: "All" },
  { id: "fades", label: "Fades" },
  { id: "haircuts", label: "Haircuts" },
  { id: "beard", label: "Beard Grooming" },
  { id: "transformations", label: "Transformations" },
];

export type GalleryItem = {
  id: number;
  src: string;
  alt: string;
  category: GalleryCategory;
  title: string;
  ratio: string;
};

/** Sample placeholder photography — replace with Elvis's real portfolio. */
export const GALLERY: GalleryItem[] = [
  { id: 1, src: px(12074386, 1000), category: "fades", title: "Skin fade — rear view", ratio: "aspect-[4/3]", alt: "Rear view of a man with a sharp skin fade haircut" },
  { id: 2, src: px(13450758, 1000), category: "fades", title: "Clipper fade — close detail", ratio: "aspect-[3/4]", alt: "Close-up of clippers shaving the back of a head during a fade" },
  { id: 3, src: px(11333875, 1000), category: "fades", title: "Low fade — monochrome detail", ratio: "aspect-[3/4]", alt: "Black and white close-up of a trimmer detailing a low fade" },
  { id: 4, src: px(6487911, 1000), category: "haircuts", title: "Textured cut — rear texture", ratio: "aspect-[3/4]", alt: "Close-up from behind of a man's textured modern haircut" },
  { id: 5, src: px(12464845, 1000), category: "haircuts", title: "Comb & scissor precision", ratio: "aspect-[4/5]", alt: "Barber using comb and scissors during a detailed haircut" },
  { id: 6, src: px(4351727, 1000), category: "haircuts", title: "Precision trim in progress", ratio: "aspect-[3/4]", alt: "Barber with tattooed arms trimming a man's hair with precision" },
  { id: 7, src: px(3998421, 1000), category: "beard", title: "Beard sculpt — comb & scissors", ratio: "aspect-[4/3]", alt: "Barber meticulously trimming a client's beard with comb and scissors" },
  { id: 8, src: px(2521978, 1000), category: "beard", title: "Straight-razor beard shave", ratio: "aspect-[3/4]", alt: "Barber shaving a man's beard with a straight razor at a barbershop" },
  { id: 9, src: px(7447127, 1000), category: "transformations", title: "Finished look — cut & beard trim", ratio: "aspect-[3/4]", alt: "Side view of a man with a fresh haircut and beard trim" },
  { id: 10, src: px(39559309, 1000), category: "transformations", title: "Fresh cut — confident smile", ratio: "aspect-[4/3]", alt: "Smiling man receiving a haircut at a barbershop" },
];

export const TESTIMONIALS = [
  {
    name: "Sample Client A",
    text: "Sample testimonial — a placeholder for a real client story about the chair, the cut, and how they felt walking out. Replace with authentic feedback from Hollywdd Groom’n clients.",
  },
  {
    name: "Sample Client B",
    text: "Sample testimonial — another placeholder. Imagine honest words here about precision, comfort, and feeling like a star from the moment you sit down.",
  },
  {
    name: "Sample Client C",
    text: "Sample testimonial — placeholder copy only. Real reviews from real clients will live here once the shop shares them.",
  },
];

export const FAQS = [
  {
    q: "What services does Hollywdd Groom’n offer?",
    a: "We offer clean fades, signature haircuts, beard grooming, hot towel shaves, facial cleansing, face steaming, color retouch, and additional grooming services. If you're not sure which fits your style, book a grooming session and we'll help you find the right one.",
  },
  {
    q: "Can I book an appointment online?",
    a: "Yes — use the Book Appointment flow on this site to choose a service, date, and time, then send your request. Please note this is a front-end demonstration: your request is not connected to a live calendar yet, and the shop will confirm actual availability once the real scheduling system is connected.",
  },
  {
    q: "Do you accept walk-ins?",
    a: "Yes, walk-ins are welcome at Hollywdd Groom’n. For the smoothest experience, contact the shop to check current availability before stopping by.",
  },
  {
    q: "How can I contact the shop?",
    a: "You can send a request through the booking flow on this site. Shop phone, address, opening hours, email, and social links are shown as placeholders for now and will be added as soon as the details are confirmed.",
  },
  {
    q: "Should I arrive early for my appointment?",
    a: "Please contact the shop for details about arrival times and scheduling policies.",
  },
  {
    q: "Can I request a particular haircut or style?",
    a: "Absolutely. Bring a photo or simply describe the look you want — every cut is tailored to your features, hair type, and personal style. You can also add notes when you book.",
  },
  {
    q: "How do I ask about service pricing?",
    a: "Pricing is confirmed directly with the shop. Each service on this site is marked \"Contact for pricing\" until verified details are provided — ask through the booking form or the contact section.",
  },
  {
    q: "What should I do if I need to reschedule?",
    a: "Please contact the shop for details on rescheduling. Until the shop's phone and contact details are published here, you can use the booking flow to send a new request with your preferred time.",
  },
];
