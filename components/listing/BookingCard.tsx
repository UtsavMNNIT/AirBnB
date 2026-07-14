"use client";

import type { Listing } from "@/lib/types";
import { Icon } from "../ui/Icon";

export function BookingCard({ listing }: { listing: Listing }) {
  const b = listing.booking;
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
            <span className="text-[22px] font-semibold text-[#222]">{b.price}</span>{" "}
            <span className="text-[15px] text-[#222]">{b.period}</span>
          </div>
          <span className="inline-flex items-center gap-1 text-[13px] text-[#222]">
            <Icon name="starSmall" size={11} /> {listing.rating.toFixed(2)}
            <span className="text-[#717171]">· {listing.reviewCount} reviews</span>
          </span>
        </div>

        <div className="mt-4 rounded-lg border border-[#B0B0B0]">
          <div className="grid grid-cols-2">
            <div className="border-r border-[#B0B0B0] px-3 py-2.5">
              <div className="text-[10px] font-bold tracking-wide text-[#222]">CHECK-IN</div>
              <div className="text-sm text-[#222]">{b.checkIn}</div>
            </div>
            <div className="px-3 py-2.5">
              <div className="text-[10px] font-bold tracking-wide text-[#222]">CHECKOUT</div>
              <div className="text-sm text-[#222]">{b.checkOut}</div>
            </div>
          </div>
          <button className="flex w-full items-center justify-between border-t border-[#B0B0B0] px-3 py-2.5 text-left">
            <span>
              <span className="block text-[10px] font-bold tracking-wide text-[#222]">GUESTS</span>
              <span className="text-sm text-[#222]">{b.guests}</span>
            </span>
            <Icon name="chevronDown" size={16} />
          </button>
        </div>

        <p className="mt-3 text-center text-[13px] text-[#717171]">{b.freeCancellation}</p>

        <button className="btn-rausch mt-3 w-full rounded-lg py-3.5 text-[16px] font-semibold text-white active:scale-[0.99] transition">
          Reserve
        </button>
        <p className="mt-3 text-center text-sm text-[#717171]">You won&apos;t be charged yet.</p>

        <div className="mt-5 flex justify-center">
          <button className="text-[13px] text-[#717171] underline">
            <span className="mr-2 align-middle">⚑</span>Report this listing
          </button>
        </div>
      </div>
    </div>
  );
}
