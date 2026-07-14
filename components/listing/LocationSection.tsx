"use client";

import { useState } from "react";
import { Icon } from "../ui/Icon";

export function LocationSection({
  location,
}: { location: { heading: string; proviso: string; highlightsShort: string; highlightsFull: string } }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <section>
      <h2 className="text-[22px] font-semibold text-[#222]">Where you&apos;ll be</h2>
      <p className="mt-2 text-[15px] font-medium text-[#222]">{location.heading}</p>

      {/* Stylized map */}
      <div className="relative mt-6 h-[420px] w-full overflow-hidden rounded-xl border border-[#EBEBEB] bg-[#e7eee2]">
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg,#dfeadc 0%,#e9efe3 40%,#e3ece0 100%)" }} />
        {/* water band */}
        <div className="absolute -left-1/4 -top-1/3 h-[140%] w-[70%] rotate-[25deg] bg-[#a9d4e8]/70" />
        {/* soft land blobs */}
        <div className="absolute left-[30%] top-[35%] h-40 w-40 rounded-full bg-[#d3e6c8]/60 blur-2xl" />
        <div className="absolute right-[20%] bottom-[20%] h-52 w-52 rounded-full bg-[#d3e6c8]/60 blur-2xl" />
        {/* center pin */}
        <div className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#222] text-white shadow-lg">
          <Icon name="outdoor" size={26} />
        </div>
        {/* zoom controls */}
        <div className="absolute right-4 top-4 flex flex-col overflow-hidden rounded-lg border border-[#DDDDDD] bg-white shadow">
          <button aria-label="Zoom in" className="flex h-10 w-10 items-center justify-center hover:bg-[#F7F7F7]"><Icon name="plus" size={16} /></button>
          <span className="h-px bg-[#DDDDDD]" />
          <button aria-label="Zoom out" className="flex h-10 w-10 items-center justify-center hover:bg-[#F7F7F7]"><Icon name="minus" size={16} /></button>
        </div>
      </div>

      <p className="mt-3 text-[13px] text-[#717171]">{location.proviso}</p>

      <h3 className="mt-8 text-[17px] font-semibold text-[#222]">Neighbourhood highlights</h3>
      <p className="mt-2 text-[15px] leading-6 text-[#222]">{location.highlightsShort}</p>
      {expanded && <p className="mt-3 text-[15px] leading-6 text-[#222]">{location.highlightsFull}</p>}
      <button
        onClick={() => setExpanded((e) => !e)}
        className="mt-3 flex items-center gap-1 text-[15px] font-semibold text-[#222] underline"
      >
        {expanded ? "Show less" : "Show more"}
        <Icon name="chevronRight" size={14} className={expanded ? "-rotate-90" : "rotate-90"} />
      </button>
    </section>
  );
}
