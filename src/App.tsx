import { useCallback, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero, { TaglineStrip } from "@/components/Hero";
import Services from "@/components/Services";
import Story from "@/components/Story";
import Experience from "@/components/Experience";
import Gallery from "@/components/Gallery";
import Reviews from "@/components/Reviews";
import Faq from "@/components/Faq";
import WalkIns from "@/components/WalkIns";
import FinalCta from "@/components/FinalCta";
import Footer from "@/components/Footer";
import Booking from "@/components/Booking";

export default function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [preselect, setPreselect] = useState<string | null>(null);

  const openBooking = useCallback((serviceId?: string) => {
    setPreselect(serviceId ?? null);
    setBookingOpen(true);
  }, []);

  const closeBooking = useCallback(() => setBookingOpen(false), []);

  return (
    <div className="min-h-screen overflow-x-clip bg-obsidian font-sans text-ivory">
      <Navbar onBook={() => openBooking()} />
      <main>
        <Hero onBook={() => openBooking()} />
        <TaglineStrip />
        <Services onBook={openBooking} />
        <Story />
        <Experience />
        <Gallery onBook={() => openBooking()} />
        <Reviews />
        <Faq />
        <WalkIns onBook={() => openBooking()} />
        <FinalCta onBook={() => openBooking()} />
      </main>
      <Footer onBook={openBooking} />
      <Booking open={bookingOpen} initialService={preselect} onClose={closeBooking} />
    </div>
  );
}
