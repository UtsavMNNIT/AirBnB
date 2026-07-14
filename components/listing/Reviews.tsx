"use client";

import { useState } from "react";
import type { Listing, Review } from "@/lib/types";
import { Icon, type IconName } from "../ui/Icon";
import { Stars } from "../ui/Stars";
import { Avatar } from "../ui/Avatar";
import { Modal } from "../ui/Modal";

function Laurel({ side }: { side: "left" | "right" }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/laurel-${side}.png`}
      alt=""
      aria-hidden="true"
      className="h-20 w-auto select-none md:h-24"
    />
  );
}

function ReviewCard({ r }: { r: Review }) {
  const [open, setOpen] = useState(false);
  const long = r.text.length > 160;
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-3">
        <Avatar name={r.name} src={r.avatar} size={40} />
        <div>
          <div className="text-[15px] font-semibold text-[#222]">{r.name}</div>
          <div className="text-[13px] text-[#717171]">{r.tenure}</div>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 text-[13px] text-[#222]">
        <Stars rating={r.stars} size={10} />
        <span aria-hidden="true">·</span>
        <span className="text-[#717171]">{r.when}</span>
      </div>
      <p className={`mt-2 text-[15px] leading-6 text-[#222] ${!open && long ? "line-clamp-3" : ""}`}>{r.text}</p>
      {long && (
        <button onClick={() => setOpen((o) => !o)} className="mt-1 text-[15px] font-semibold text-[#222] underline">
          {open ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export function Reviews({ listing }: { listing: Listing }) {
  const [allOpen, setAllOpen] = useState(false);
  const [howOpen, setHowOpen] = useState(false);

  return (
    <div>
      {/* Summary */}
      <div className="flex flex-col items-center text-center">
        <div className="flex items-center justify-center gap-2">
          <Laurel side="left" />
          <span className="text-[64px] font-semibold leading-none text-[#222] md:text-[76px]">
            {listing.rating.toFixed(2)}
          </span>
          <Laurel side="right" />
        </div>
        <h3 className="mt-3 text-xl font-semibold text-[#222]">Guest favourite</h3>
        <p className="mt-1 max-w-md text-[15px] text-[#717171]">
          This home is a guest favourite based on ratings, reviews and reliability
        </p>
        <button onClick={() => setHowOpen(true)} className="mt-3 text-[13px] font-semibold text-[#222] underline">
          How reviews work
        </button>
      </div>

      {/* Breakdown */}
      <div className="mt-10 grid grid-cols-2 gap-y-8 border-y border-[#EBEBEB] py-6 md:flex md:divide-x md:divide-[#EBEBEB]">
        <div className="col-span-2 md:flex-1 md:px-6">
          <div className="mb-2 text-[15px] font-semibold text-[#222]">Overall rating</div>
          {listing.ratingDistribution.map((v, i) => (
            <div key={i} className="flex items-center gap-2">
              <span className="w-2 text-[11px] text-[#222]">{5 - i}</span>
              <span className="h-1 flex-1 overflow-hidden rounded-full bg-[#EBEBEB]">
                <span className="block h-full rounded-full bg-[#222]" style={{ width: `${v * 100}%` }} />
              </span>
            </div>
          ))}
        </div>
        {listing.ratingCategories.map((c) => (
          <div key={c.label} className="md:flex-1 md:px-6">
            <div className="text-[15px] font-medium text-[#222]">{c.label}</div>
            <div className="mt-1 flex items-center justify-between md:block">
              <span className="text-lg font-semibold text-[#222]">{c.score.toFixed(1)}</span>
              <span className="text-[#222] md:mt-2 md:block"><Icon name={c.icon as IconName} size={26} /></span>
            </div>
          </div>
        ))}
      </div>

      {/* Topic chips */}
      <div className="mt-6 flex gap-3 overflow-x-auto no-scrollbar pb-1">
        {listing.reviewTags.map((t) => (
          <div key={t.label} className="flex shrink-0 items-center gap-2 rounded-full border border-[#DDDDDD] px-4 py-2 text-sm text-[#222]">
            <span aria-hidden="true">{t.icon}</span>
            {t.label}
            <span className="text-[#717171]">{t.count}</span>
          </div>
        ))}
      </div>

      {/* Review cards (preview) */}
      <div className="mt-8 grid grid-cols-1 gap-x-16 gap-y-8 md:grid-cols-2">
        {listing.reviews.slice(0, 6).map((r) => (
          <ReviewCard key={r.name} r={r} />
        ))}
      </div>

      <button
        onClick={() => setAllOpen(true)}
        className="mt-8 rounded-lg border border-[#222] px-5 py-3 text-[15px] font-semibold text-[#222] hover:bg-[#F7F7F7] active:scale-[0.99] transition"
      >
        Show all {listing.reviewCount} reviews
      </button>

      <Modal open={allOpen} onClose={() => setAllOpen(false)} title={`${listing.rating.toFixed(2)} · ${listing.reviewCount} reviews`}>
        <div className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2">
          {listing.reviews.map((r) => (
            <ReviewCard key={`m-${r.name}`} r={r} />
          ))}
        </div>
      </Modal>

      <Modal open={howOpen} onClose={() => setHowOpen(false)} title="How reviews work">
        <div className="space-y-4 text-[15px] leading-6 text-[#222]">
          <p>Reviews from guests who have stayed help build trust. We show them in order of relevance, with the most helpful and recent reviews first.</p>
          <p>The overall rating is the average of every review left after a completed stay, scored from 1 to 5 stars across cleanliness, accuracy, check-in, communication, location and value.</p>
          <p><span className="font-semibold">Guest favourite</span> homes are the most-loved on Airbnb, based on ratings, reviews and reliability. Only reviews from real, verified stays count, and Airbnb removes any that violate its review policy.</p>
        </div>
      </Modal>
    </div>
  );
}
