"use client";

import { useCallback, useState } from "react";
import type { Listing } from "@/lib/types";
import { Header } from "./listing/Header";
import { TitleBar } from "./listing/TitleBar";
import { PhotoGrid } from "./listing/PhotoGrid";
import { Overview } from "./listing/Overview";
import { SleepSection } from "./listing/SleepSection";
import { Amenities } from "./listing/Amenities";
import { StayCalendar } from "./listing/StayCalendar";
import { Reviews } from "./listing/Reviews";
import { LocationSection } from "./listing/LocationSection";
import { HostCard } from "./listing/HostCard";
import { ThingsToKnow } from "./listing/ThingsToKnow";
import { NearbyStays } from "./listing/NearbyStays";
import { BookingCard } from "./listing/BookingCard";
import { PhotoTour } from "./overlays/PhotoTour";
import { Lightbox } from "./overlays/Lightbox";
import { BookingProvider, formatMoney, useBooking } from "@/lib/useBooking";
import { ReserveConfirmation } from "./listing/ReserveConfirmation";

const Divider = () => <hr className="border-t border-[#EBEBEB] my-8" />;

export function ListingApp({ listing }: { listing: Listing }) {
  const b = listing.booking;
  return (
    <BookingProvider
      config={{
        currency: b.currency,
        nightlyRate: b.nightlyRate,
        cleaningFee: b.cleaningFee,
        serviceFee: b.serviceFee,
        maxGuests: b.maxGuests,
      }}
      initialCheckIn={{ y: 2026, m: 9, d: 18 }}
      initialCheckOut={{ y: 2026, m: 9, d: 23 }}
      initialGuests={{ adults: 2, children: 0, infants: 0, pets: 0 }}
    >
      <ListingBody listing={listing} />
    </BookingProvider>
  );
}

function ListingBody({ listing }: { listing: Listing }) {
  const [tourOpen, setTourOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const openTour = useCallback(() => setTourOpen(true), []);
  const openLightbox = useCallback((i: number) => setLightboxIndex(i), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  // Map each hero tile to the first matching photo in the flat sequence.
  const heroTargets = listing.hero.map(
    (src) => Math.max(0, listing.photos.findIndex((p) => p.src === src)),
  );

  return (
    <>
      <Header title={listing.title} rating={listing.rating} reviewCount={listing.reviewCount} price={listing.booking.price} />

      <main id="main" className="page-container pb-16">
        <TitleBar title={listing.title} />
        <PhotoGrid hero={listing.hero} targets={heroTargets} onShowAll={openTour} onOpen={openLightbox} />

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,372px)] gap-8 lg:gap-[88px] items-start">
          {/* Left column */}
          <div className="min-w-0">
            <Overview listing={listing} />
            <Divider />
            <SleepSection sleep={listing.sleep} />
            <Divider />
            <Amenities listing={listing} />
            <Divider />
            <StayCalendar />
          </div>

          {/* Right column: promo + sticky booking card */}
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <BookingCard listing={listing} />
            </div>
          </aside>
        </div>

        <Divider />
        <section id="reviews" className="scroll-mt-28">
          <Reviews listing={listing} />
        </section>
        <Divider />
        <section id="location" className="scroll-mt-28">
          <LocationSection location={listing.location} />
        </section>
        <Divider />
        <HostCard listing={listing} />
        <Divider />
        <ThingsToKnow columns={listing.thingsToKnow} />
      </main>

      <div className="page-container">
        <hr className="border-t border-[#EBEBEB]" />
      </div>
      <NearbyStays stays={listing.nearby} />

      {/* Mobile sticky reserve bar */}
      <MobileBar listing={listing} />

      {/* Overlays */}
      <PhotoTour
        open={tourOpen}
        listing={listing}
        onClose={() => setTourOpen(false)}
        onOpenPhoto={openLightbox}
      />
      <Lightbox
        photos={listing.photos}
        index={lightboxIndex}
        onClose={closeLightbox}
        onExit={() => {
          closeLightbox();
          setTourOpen(false);
        }}
        onChange={setLightboxIndex}
      />
    </>
  );
}

function MobileBar({ listing }: { listing: Listing }) {
  const { price, rangeLabel, nights, config } = useBooking();
  const [confirm, setConfirm] = useState(false);
  const headline = formatMoney(config.currency, price ? price.total : config.nightlyRate);
  const sub = price ? `for ${nights} night${nights !== 1 ? "s" : ""}` : "night";

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-[#EBEBEB] px-5 py-3 flex items-center justify-between">
      <div className="text-sm">
        <div className="font-semibold">{headline} <span className="font-normal">{sub}</span></div>
        <div className="underline text-[#222]">{rangeLabel || "Add dates"}</div>
      </div>
      <button
        onClick={() => (price ? setConfirm(true) : document.getElementById("stay")?.scrollIntoView({ behavior: "smooth" }))}
        className="btn-rausch text-white font-semibold rounded-lg px-6 py-3 text-[15px]"
      >
        Reserve
      </button>
      <ReserveConfirmation open={confirm} onClose={() => setConfirm(false)} listing={listing} />
    </div>
  );
}
