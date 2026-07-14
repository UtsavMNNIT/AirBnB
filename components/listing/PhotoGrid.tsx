"use client";

import { Icon } from "../ui/Icon";

interface Props {
  hero: string[];
  targets: number[];
  onShowAll: () => void;
  onOpen: (photoIndex: number) => void;
}

/** Airbnb 5-photo hero grid: 1 large left + 2×2 right, rounded outer corners. */
export function PhotoGrid({ hero, targets, onShowAll, onOpen }: Props) {
  const tile = (src: string, i: number, extra = "") => (
    <button
      key={i}
      onClick={() => onOpen(targets[i] ?? 0)}
      aria-label={`View photo ${i + 1}`}
      className={`group relative overflow-hidden bg-[#F7F7F7] ${extra}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        loading={i === 0 ? "eager" : "lazy"}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
      />
      <span className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
    </button>
  );

  return (
    <div id="photos" className="scroll-mt-28 relative mt-6">
      {/* Desktop / tablet: 5-photo grid */}
      <div className="hidden sm:grid grid-cols-4 grid-rows-2 gap-2 rounded-xl overflow-hidden h-[320px] md:h-[400px] lg:h-[460px]">
        {tile(hero[0], 0, "col-span-2 row-span-2")}
        {tile(hero[1], 1, "col-span-1 row-span-1")}
        {tile(hero[2], 2, "col-span-1 row-span-1")}
        {tile(hero[3], 3, "col-span-1 row-span-1")}
        {tile(hero[4], 4, "col-span-1 row-span-1")}
      </div>

      {/* Mobile: single image */}
      <div className="sm:hidden -mx-6">
        <button onClick={() => onOpen(targets[0] ?? 0)} className="relative block w-full aspect-[4/3]" aria-label="View photos">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero[0]} alt="" className="h-full w-full object-cover" />
        </button>
      </div>

      <button
        onClick={onShowAll}
        className="absolute bottom-4 right-4 flex items-center gap-2 rounded-lg border border-[#222] bg-white px-3.5 py-1.5 text-sm font-semibold text-[#222] shadow-[0_1px_2px_rgba(0,0,0,0.18)] hover:bg-[#F7F7F7] active:scale-[0.98] transition"
      >
        <Icon name="grid" size={15} />
        Show all photos
      </button>
    </div>
  );
}
