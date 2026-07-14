"use client";

import { useEffect, useRef } from "react";
import type { Listing } from "@/lib/types";
import { useFocusTrap, useScrollLock } from "@/lib/overlay";
import { Icon } from "../ui/Icon";
import { HeartIcon } from "../ui/HeartIcon";

interface Props {
  open: boolean;
  listing: Listing;
  onClose: () => void;
  onOpenPhoto: (index: number) => void;
}

export function PhotoTour({ open, listing, onClose, onOpenPhoto }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollLock(open);
  useFocusTrap(ref, open, onClose);

  // Reset scroll to top each time the tour opens.
  useEffect(() => {
    if (open) ref.current?.scrollTo(0, 0);
  }, [open]);

  if (!open) return null;

  const scrollToGroup = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label="Photo tour"
      tabIndex={-1}
      className="fixed inset-0 z-50 overflow-y-auto bg-white animate-[tourIn_.28s_ease] outline-none"
    >
      {/* Top bar */}
      <div className="sticky top-0 z-10 border-b border-[#EBEBEB] bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center justify-between px-6">
          <button onClick={onClose} aria-label="Close photo tour" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F7F7F7]">
            <Icon name="chevronLeft" size={18} />
          </button>
          <h2 className="text-[15px] font-semibold text-[#222]">Photo tour</h2>
          <div className="flex items-center gap-1">
            <button aria-label="Share" className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold hover:bg-[#F7F7F7]">
              <Icon name="share" size={15} />
            </button>
            <button aria-label="Save" className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold hover:bg-[#F7F7F7]">
              <HeartIcon size={15} stroke="#222" />
            </button>
          </div>
        </div>

        {/* Thumbnail nav */}
        <div className="mx-auto max-w-[1280px] px-6">
          <div className="flex gap-4 overflow-x-auto no-scrollbar py-3">
            {listing.photoGroups.map((g, gi) => {
              const cover = listing.photos[g.photoIndexes[0]];
              return (
                <button
                  key={g.title}
                  onClick={() => scrollToGroup(`tour-${gi}`)}
                  className="group shrink-0 text-center"
                >
                  <span className="block h-14 w-20 overflow-hidden rounded-lg border-2 border-transparent group-hover:border-[#DDDDDD] group-focus-visible:border-[#222]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cover.src} alt="" className="h-full w-full object-cover" />
                  </span>
                  <span className="mt-1 block w-20 truncate text-[11px] text-[#717171] group-hover:text-[#222]">{g.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Groups */}
      <div className="mx-auto max-w-[1000px] px-6 pb-24 pt-8">
        {listing.photoGroups.map((g, gi) => (
          <section key={g.title} id={`tour-${gi}`} className="scroll-mt-40 pb-14">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-[minmax(0,300px)_1fr] md:gap-10">
              <div>
                <h3 className="text-2xl font-semibold text-[#222]">{g.title}</h3>
                <p className="mt-2 text-[15px] leading-6 text-[#717171]">{g.subtitle}</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {g.photoIndexes.map((pi, li) => (
                  <button
                    key={pi + "-" + li}
                    onClick={() => onOpenPhoto(pi)}
                    aria-label={`Open ${g.title} photo ${li + 1}`}
                    className={`group relative overflow-hidden rounded-xl bg-[#F7F7F7] ${li % 3 === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/3]"}`}
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={listing.photos[pi].src} alt={listing.photos[pi].alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" />
                    <span className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/10" />
                  </button>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>

      <style>{`@keyframes tourIn{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
