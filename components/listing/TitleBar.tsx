"use client";

import { useState } from "react";
import { Icon } from "../ui/Icon";

export function TitleBar({ title }: { title: string }) {
  const [saved, setSaved] = useState(false);

  return (
    <div className="pt-6 flex items-start justify-between gap-4">
      <h1 className="text-[26px] leading-8 font-semibold tracking-[-0.02em] text-[#222]">
        {title}
      </h1>
      <div className="flex items-center gap-1 shrink-0">
        <button className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#222] hover:bg-[#F7F7F7] link-underline">
          <Icon name="share" size={16} />
          <span className="hidden sm:inline">Share</span>
        </button>
        <button
          onClick={() => setSaved((s) => !s)}
          aria-pressed={saved}
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold text-[#222] hover:bg-[#F7F7F7] link-underline"
        >
          <span className="text-[#222]">
            <svg viewBox="0 0 32 32" width={16} height={16} aria-hidden="true"
              style={{ fill: saved ? "#FF385C" : "rgba(0,0,0,0.5)", stroke: saved ? "#FF385C" : "#222", strokeWidth: 2, overflow: "visible" }}>
              <path d="M16 28c7.3-6.6 12-10.4 12-15.6C28 8.5 25.2 6 21.6 6c-2.3 0-4.2 1.2-5.6 3.2C14.6 7.2 12.7 6 10.4 6 6.8 6 4 8.5 4 12.4 4 17.6 8.7 21.4 16 28z" />
            </svg>
          </span>
          <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
        </button>
      </div>
    </div>
  );
}
