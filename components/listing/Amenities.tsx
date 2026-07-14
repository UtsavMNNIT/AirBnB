"use client";

import { useState } from "react";
import type { Listing } from "@/lib/types";
import { Icon, type IconName } from "../ui/Icon";
import { Modal } from "../ui/Modal";

export function Amenities({ listing }: { listing: Listing }) {
  const [open, setOpen] = useState(false);

  // Build a grouped "all amenities" list from the room subtitles (which are
  // amenity lists) plus the preview items — grounded in the real data.
  const groups = [
    { title: "Popular", items: listing.amenitiesPreview.map((a) => a.label) },
    ...listing.photoGroups
      .filter((g) => g.subtitle.includes("•"))
      .map((g) => ({ title: g.title, items: g.subtitle.split(" • ") })),
  ];

  return (
    <section id="amenities" className="scroll-mt-28">
      <h3 className="text-[22px] font-semibold text-[#222]">What this place offers</h3>
      <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        {listing.amenitiesPreview.map((a) => (
          <li key={a.label} className="flex items-center gap-4 text-[15px] text-[#222]">
            <Icon name={a.icon as IconName} size={24} className="shrink-0 text-[#222]" />
            <span>{a.label}</span>
          </li>
        ))}
      </ul>
      <button
        onClick={() => setOpen(true)}
        className="mt-8 rounded-lg border border-[#222] px-5 py-3 text-[15px] font-semibold text-[#222] hover:bg-[#F7F7F7] active:scale-[0.99] transition"
      >
        Show all {listing.amenitiesTotal} amenities
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="What this place offers">
        <div className="space-y-8">
          {groups.map((g) => (
            <div key={g.title}>
              <h3 className="mb-4 text-lg font-semibold text-[#222]">{g.title}</h3>
              <ul className="divide-y divide-[#EBEBEB]">
                {g.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 py-3.5 text-[15px] text-[#222]">
                    <Icon name="accuracy" size={18} className="shrink-0 text-[#222]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Modal>
    </section>
  );
}
