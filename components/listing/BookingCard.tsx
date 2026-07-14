"use client";

import { useEffect, useRef, useState } from "react";
import type { Listing } from "@/lib/types";
import { formatSlash, useBooking } from "@/lib/useBooking";
import { Icon } from "../ui/Icon";
import { GuestsPopover } from "./GuestsPopover";
import { ReserveConfirmation } from "./ReserveConfirmation";
import { ReportModal } from "./ReportModal";

const scrollToCalendar = () =>
  document.getElementById("stay")?.scrollIntoView({ behavior: "smooth", block: "center" });

export function BookingCard({ listing }: { listing: Listing }) {
  const b = listing.booking;
  const { checkIn, checkOut, price, nights, guests, guestLabel, config, setGuests } = useBooking();
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [report, setReport] = useState(false);
  const guestsRef = useRef<HTMLDivElement>(null);

  // Close the guests popover on outside click.
  useEffect(() => {
    if (!guestsOpen) return;
    const onDown = (e: MouseEvent) => {
      if (guestsRef.current && !guestsRef.current.contains(e.target as Node)) setGuestsOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [guestsOpen]);

  const cur = config.currency;
  const money = (n: number) => `${cur}${n.toLocaleString("en-IN")}`;
  const headline = price ? money(price.total) : money(config.nightlyRate);
  const headlineSuffix = price ? `for ${nights} night${nights !== 1 ? "s" : ""}` : "night";

  const onReserve = () => (price ? setConfirm(true) : scrollToCalendar());

  return (
    <div className="space-y-4">
      {/* Promo */}
      <div className="flex items-center justify-between gap-3 rounded-xl border border-[#DDDDDD] px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="text-[#008489]"><Icon name="value" size={22} /></span>
          <div className="text-[13px] leading-tight">
            <div className="font-semibold text-[#222]">{b.promo.title}</div>
            <button className="text-[#717171] underline">{b.promo.terms}</button>
          </div>
        </div>
        <button className="rounded-lg border border-[#222] px-3 py-1.5 text-sm font-semibold text-[#222] hover:bg-[#F7F7F7]">
          Claim
        </button>
      </div>

      {/* Reserve card */}
      <div id="booking" className="scroll-mt-28 rounded-2xl border border-[#DDDDDD] p-6 shadow-[0_6px_16px_rgba(0,0,0,0.12)]">
        <div className="flex items-baseline justify-between">
          <div>
            <span className="text-[22px] font-semibold text-[#222]">{headline}</span>{" "}
            <span className="text-[15px] text-[#222]">{headlineSuffix}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[13px] text-[#222]">
            <Icon name="starSmall" size={11} /> {listing.rating.toFixed(2)}
            <span className="text-[#717171]">· {listing.reviewCount} reviews</span>
          </span>
        </div>

        <div className="relative mt-4">
          <div className="rounded-lg border border-[#B0B0B0]">
            <div className="grid grid-cols-2">
              <button onClick={scrollToCalendar} className="border-r border-[#B0B0B0] px-3 py-2.5 text-left hover:bg-[#F7F7F7] rounded-tl-lg">
                <div className="text-[10px] font-bold tracking-wide text-[#222]">CHECK-IN</div>
                <div className="text-sm text-[#222]">{checkIn ? formatSlash(checkIn) : "Add date"}</div>
              </button>
              <button onClick={scrollToCalendar} className="px-3 py-2.5 text-left hover:bg-[#F7F7F7] rounded-tr-lg">
                <div className="text-[10px] font-bold tracking-wide text-[#222]">CHECKOUT</div>
                <div className="text-sm text-[#222]">{checkOut ? formatSlash(checkOut) : "Add date"}</div>
              </button>
            </div>
            <button
              onClick={() => setGuestsOpen((o) => !o)}
              aria-expanded={guestsOpen}
              aria-haspopup="dialog"
              className="flex w-full items-center justify-between border-t border-[#B0B0B0] px-3 py-2.5 text-left hover:bg-[#F7F7F7] rounded-b-lg"
            >
              <span>
                <span className="block text-[10px] font-bold tracking-wide text-[#222]">GUESTS</span>
                <span className="text-sm text-[#222]">{guestLabel}</span>
              </span>
              <Icon name="chevronDown" size={16} className={guestsOpen ? "rotate-180 transition-transform" : "transition-transform"} />
            </button>
          </div>

          {guestsOpen && (
            <div ref={guestsRef} className="absolute left-0 right-0 top-full z-20 mt-2">
              <GuestsPopover guests={guests} maxGuests={config.maxGuests} onChange={setGuests} onClose={() => setGuestsOpen(false)} />
            </div>
          )}
        </div>

        {!price && <p className="mt-3 text-center text-[13px] text-[#717171]">Add dates to see the total price</p>}
        {price && <p className="mt-3 text-center text-[13px] text-[#717171]">{b.freeCancellation}</p>}

        <button onClick={onReserve} className="btn-rausch mt-3 w-full rounded-lg py-3.5 text-[16px] font-semibold text-white active:scale-[0.99] transition">
          Reserve
        </button>
        <p className="mt-3 text-center text-sm text-[#717171]">You won&apos;t be charged yet.</p>

        {/* Price breakdown */}
        {price && (
          <div className="mt-6 space-y-3 text-[15px] text-[#222]">
            <div className="flex justify-between">
              <span className="underline">{money(price.nightly)} × {price.nights} nights</span>
              <span>{money(price.subtotal)}</span>
            </div>
            <div className="flex justify-between">
              <span className="underline">Cleaning fee</span>
              <span>{money(price.cleaning)}</span>
            </div>
            <div className="flex justify-between">
              <span className="underline">Airbnb service fee</span>
              <span>{money(price.service)}</span>
            </div>
            <div className="flex justify-between border-t border-[#EBEBEB] pt-3 font-semibold">
              <span>Total (INR)</span>
              <span>{money(price.total)}</span>
            </div>
          </div>
        )}

        <div className="mt-5 flex justify-center">
          <button onClick={() => setReport(true)} className="text-[13px] text-[#717171] underline hover:text-[#222]">
            <span className="mr-2 align-middle">⚑</span>Report this listing
          </button>
        </div>
      </div>

      <ReserveConfirmation open={confirm} onClose={() => setConfirm(false)} listing={listing} />
      <ReportModal open={report} onClose={() => setReport(false)} />
    </div>
  );
}
