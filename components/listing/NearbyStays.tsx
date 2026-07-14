"use client";

import { useRef, useState } from "react";
import type { NearbyStay } from "@/lib/types";
import { Icon } from "../ui/Icon";
import { HeartIcon } from "../ui/HeartIcon";

function Card({ stay }: { stay: NearbyStay }) {
  const [saved, setSaved] = useState(false);
  return (
    <div className="w-[70%] shrink-0 snap-start sm:w-[calc(50%-12px)] lg:w-[calc(20%-13px)]">
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-[#F7F7F7]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={stay.image} alt={stay.title} loading="lazy" className="h-full w-full object-cover" />
        <button
          onClick={() => setSaved((s) => !s)}
          aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
          aria-pressed={saved}
          className="absolute right-3 top-3"
        >
          <HeartIcon filled={saved} size={24} />
        </button>
      </div>
      <div className="mt-2.5">
        <div className="truncate text-[15px] font-medium text-[#222]">{stay.title}</div>
        <div className="mt-0.5 text-[15px] text-[#222]">{stay.price}</div>
        <div className="mt-0.5 flex items-center gap-1 text-[14px] text-[#222]">
          <Icon name="starSmall" size={11} /> {stay.rating.toFixed(2)}
        </div>
      </div>
    </div>
  );
}

export function NearbyStays({ stays }: { stays: NearbyStay[] }) {
  const scroller = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (el) el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };
  return (
    <section className="page-container py-10">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-[22px] font-semibold text-[#222]">More stays nearby</h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[#222]">1 / 2</span>
          <div className="flex gap-2">
            <button onClick={() => scroll(-1)} aria-label="Previous stays" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DDDDDD] hover:border-[#222] disabled:opacity-40">
              <Icon name="chevronLeft" size={14} />
            </button>
            <button onClick={() => scroll(1)} aria-label="Next stays" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#DDDDDD] hover:border-[#222]">
              <Icon name="chevronRight" size={14} />
            </button>
          </div>
        </div>
      </div>
      <div ref={scroller} className="flex gap-4 overflow-x-auto no-scrollbar snap-x scroll-smooth">
        {stays.map((s) => (
          <Card key={s.title} stay={s} />
        ))}
      </div>
    </section>
  );
}
