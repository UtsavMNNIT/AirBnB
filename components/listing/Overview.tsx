"use client";

import { useState } from "react";
import type { Listing } from "@/lib/types";
import { Icon, type IconName } from "../ui/Icon";
import { Stars } from "../ui/Stars";

export function Overview({ listing }: { listing: Listing }) {
  const [expanded, setExpanded] = useState(false);
  const [original, setOriginal] = useState(false);

  return (
    <section className="pt-6">
      <h2 className="text-[22px] leading-7 font-semibold text-[#222]">{listing.subtitle}</h2>
      <p className="mt-1 text-[15px] text-[#222]">{listing.specs}</p>

      {/* Guest favourite banner */}
      {listing.guestFavourite && (
        <div className="mt-6 flex items-stretch justify-between rounded-2xl border border-[#DDDDDD] px-5 py-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          <div className="flex items-center gap-4">
            <div className="text-[13px] font-extrabold leading-[1.05] tracking-tight text-[#222]">
              GUEST<br />FAVOURITE
            </div>
            <p className="max-w-[300px] text-[13px] leading-snug text-[#222] hidden sm:block">
              One of the most loved homes on Airbnb, according to guests
            </p>
          </div>
          <div className="flex items-center">
            <div className="px-4 text-center">
              <div className="text-xl font-bold leading-none">{listing.rating.toFixed(2)}</div>
              <div className="mt-1"><Stars rating={listing.rating} /></div>
            </div>
            <div className="h-9 w-px bg-[#DDDDDD]" />
            <div className="px-4 text-center">
              <div className="text-xl font-bold leading-none">{listing.reviewCount}</div>
              <a href="#reviews" className="mt-1 block text-[11px] font-semibold underline text-[#222]">Reviews</a>
            </div>
          </div>
        </div>
      )}

      {/* Host line */}
      <div className="mt-6 flex items-center gap-4 border-t border-[#EBEBEB] pt-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#3B5249] text-white text-sm font-semibold">MH</span>
        <div>
          <div className="text-[15px] font-semibold text-[#222]">Hosted by {listing.host.name}</div>
          <div className="text-sm text-[#717171]">{listing.host.yearsHosting} years hosting</div>
        </div>
      </div>

      {/* Highlights */}
      <ul className="mt-6 space-y-5">
        {listing.highlights.map((h) => (
          <li key={h.title} className="flex items-start gap-4">
            <span className="text-[#222] shrink-0 mt-0.5"><Icon name={h.icon as IconName} size={26} /></span>
            <div>
              <div className="text-[15px] font-semibold text-[#222]">{h.title}</div>
              <div className="text-sm text-[#717171]">{h.body}</div>
            </div>
          </li>
        ))}
      </ul>

      {/* Description */}
      <div className="mt-8 border-t border-[#EBEBEB] pt-8">
        <p className="mb-3 flex flex-wrap items-center gap-2 text-[13px] text-[#717171]">
          <Icon name="translate" size={16} />
          Some info has been automatically translated.
          <button onClick={() => setOriginal((o) => !o)} className="font-semibold text-[#222] underline">
            {original ? "Show translation" : "Show original"}
          </button>
        </p>
        <p className="whitespace-pre-line text-[15px] leading-6 text-[#222]">
          {expanded ? listing.descriptionFull : listing.descriptionShort}
        </p>
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-3 flex items-center gap-1 text-[15px] font-semibold text-[#222] underline"
        >
          {expanded ? "Show less" : "Show more"}
          <Icon name="chevronRight" size={14} className={expanded ? "-rotate-90" : "rotate-90"} />
        </button>
      </div>
    </section>
  );
}
