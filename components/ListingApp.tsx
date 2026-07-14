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

const Divider = () => <hr className="border-t border-[#EBEBEB] my-8" />;

export function ListingApp({ listing }: { listing: Listing }) {
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
            <StayCalendar stay={listing.stayNights} />
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
  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white border-t border-[#EBEBEB] px-5 py-3 flex items-center justify-between">
      <div className="text-sm">
        <div className="font-semibold">{listing.booking.price} <span className="font-normal">{listing.booking.period}</span></div>
        <div className="underline text-[#222]">{listing.stayNights.range}</div>
      </div>
      <button className="btn-rausch text-white font-semibold rounded-lg px-6 py-3 text-[15px]">
        Reserve
      </button>
    </div>
  );
}
