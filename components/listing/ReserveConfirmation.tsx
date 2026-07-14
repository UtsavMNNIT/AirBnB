"use client";

import { useEffect, useState } from "react";
import type { Listing } from "@/lib/types";
import { formatMoney, useBooking } from "@/lib/useBooking";
import { Modal } from "../ui/Modal";

/** Client-side reserve confirmation — summarises the booking, no real charge. */
export function ReserveConfirmation({
  open, onClose, listing,
}: { open: boolean; onClose: () => void; listing: Listing }) {
  const { price, rangeLabel, guestLabel } = useBooking();
  const [done, setDone] = useState(false);
  const cur = price?.currency ?? listing.booking.currency;
  const money = (n: number) => formatMoney(cur, n);

  // Reset the success state whenever the modal is reopened.
  useEffect(() => { if (open) setDone(false); }, [open]);

  return (
    <Modal open={open} onClose={onClose} title={done ? "Reservation requested" : "Confirm your stay"}>
      {done ? (
        <div className="py-2 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#008489] text-2xl text-white">✓</div>
          <p className="text-[15px] text-[#222]">
            Your request for <span className="font-semibold">{listing.title}</span> has been sent to {listing.host.name}.
          </p>
          <p className="mt-1 text-sm text-[#717171]">This is a demo — no payment was taken and you won&apos;t be charged.</p>
          <button onClick={onClose} className="btn-rausch mt-6 w-full rounded-lg py-3 text-[15px] font-semibold text-white">Done</button>
        </div>
      ) : (
        <div>
          <div className="flex items-center gap-4 border-b border-[#EBEBEB] pb-5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={listing.hero[0]} alt="" className="h-20 w-24 shrink-0 rounded-xl object-cover" />
            <div>
              <div className="text-[15px] font-semibold text-[#222]">{listing.subtitle}</div>
              <div className="text-sm text-[#717171]">{listing.title}</div>
              <div className="mt-1 text-[13px] text-[#222]">★ {listing.rating.toFixed(2)} · {listing.reviewCount} reviews</div>
            </div>
          </div>

          <dl className="space-y-3 py-5 text-[15px]">
            <div className="flex justify-between"><dt className="text-[#717171]">Dates</dt><dd className="font-medium text-[#222]">{rangeLabel}</dd></div>
            <div className="flex justify-between"><dt className="text-[#717171]">Guests</dt><dd className="font-medium text-[#222]">{guestLabel}</dd></div>
          </dl>

          {price && (
            <div className="space-y-2 border-t border-[#EBEBEB] py-5 text-[15px] text-[#222]">
              <div className="flex justify-between"><span>{money(price.nightly)} × {price.nights} nights</span><span>{money(price.subtotal)}</span></div>
              <div className="flex justify-between"><span>Cleaning fee</span><span>{money(price.cleaning)}</span></div>
              <div className="flex justify-between"><span>Airbnb service fee</span><span>{money(price.service)}</span></div>
              <div className="mt-2 flex justify-between border-t border-[#EBEBEB] pt-3 font-semibold"><span>Total (INR)</span><span>{money(price.total)}</span></div>
            </div>
          )}

          <button onClick={() => setDone(true)} className="btn-rausch w-full rounded-lg py-3.5 text-[16px] font-semibold text-white">
            Confirm reservation
          </button>
          <p className="mt-3 text-center text-sm text-[#717171]">You won&apos;t be charged yet.</p>
        </div>
      )}
    </Modal>
  );
}
