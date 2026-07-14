"use client";

import { useState } from "react";
import { Icon } from "../ui/Icon";
import { HeartIcon } from "../ui/HeartIcon";

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
          <HeartIcon filled={saved} size={16} stroke={saved ? "#FF385C" : "#222"} />
          <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
        </button>
      </div>
    </div>
  );
}
