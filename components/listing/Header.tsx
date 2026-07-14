"use client";

import { useEffect, useState } from "react";
import { Icon } from "../ui/Icon";

const SECTIONS = [
  { id: "photos", label: "Photos" },
  { id: "amenities", label: "Amenities" },
  { id: "reviews", label: "Reviews" },
  { id: "location", label: "Location" },
];

/** Reference's custom house logo (green ground, grey house, rausch door, roof). */
function Logo() {
  return (
    <a href="#/" className="flex items-center text-[#FF385C] cursor-pointer shrink-0" aria-label="airbnb home">
      <svg viewBox="0 0 24 24" width={28} height={28} fill="none" className="ml-1 mr-1" aria-hidden="true">
        <path d="M4 18h16" stroke="#4B9A57" strokeWidth="2" strokeLinecap="round" />
        <path d="M6 18v-7.5L12 5l6 5.5V18H6z" fill="#EAEAEA" stroke="#717171" strokeWidth="1.5" />
        <rect x="10" y="12" width="4" height="6" rx="1" fill="#FF385C" />
        <path d="M4 11.5L12 4l8 7.5" stroke="#717171" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="text-[22px] font-bold tracking-tighter text-[#FF385C] ml-1.5 lowercase">airbnb</span>
    </a>
  );
}

function SearchPill() {
  return (
    <button
      className="flex items-center rounded-full border border-[#DDDDDD] shadow-[0_1px_2px_rgba(0,0,0,0.08)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-shadow bg-white h-12 pl-2 pr-2"
      aria-label="Search: Anywhere, Anytime, Add guests"
    >
      <span className="text-sm font-semibold text-gray-900 px-4">Anywhere</span>
      <span className="h-6 w-px bg-gray-200" />
      <span className="text-sm font-semibold text-gray-900 px-4">Anytime</span>
      <span className="h-6 w-px bg-gray-200" />
      <span className="text-sm text-[#717171] px-4">Add guests</span>
      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#FF385C] text-white ml-1">
        <Icon name="search" size={16} />
      </span>
    </button>
  );
}

export function Header({
  title, rating, reviewCount, price,
}: { title: string; rating: number; reviewCount: number; price: string }) {
  const [showSubnav, setShowSubnav] = useState(false);
  const [active, setActive] = useState("photos");

  useEffect(() => {
    const onScroll = () => setShowSubnav(window.scrollY > 560);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-white">
      {/* Primary bar */}
      <div className="border-b border-[#EBEBEB]">
        <div className="page-container flex items-center justify-between gap-4 h-20">
          <Logo />
          <div className="hidden md:block">
            <SearchPill />
          </div>
          <nav className="flex items-center gap-1 shrink-0">
            <a href="#/" className="hidden sm:inline text-sm font-semibold text-[#222] rounded-full px-3 py-2 hover:bg-[#F7F7F7]">
              Become a host
            </a>
            <button aria-label="Choose a language and region" className="hidden sm:flex items-center justify-center h-10 w-10 rounded-full hover:bg-[#F7F7F7]">
              <Icon name="globe" size={18} />
            </button>
            <button aria-label="Main navigation menu" className="flex items-center gap-3 border border-[#DDDDDD] rounded-full pl-3 pr-1.5 py-1.5 hover:shadow-[0_2px_8px_rgba(0,0,0,0.12)] transition-shadow">
              <Icon name="menu" size={16} />
              <span className="flex items-center justify-center h-8 w-8 rounded-full bg-[#717171] text-white text-sm font-medium">
                <svg viewBox="0 0 32 32" width={18} height={18} fill="currentColor" aria-hidden="true">
                  <path d="M16 .7C7.6.7.7 7.6.7 16S7.6 31.3 16 31.3 31.3 24.4 31.3 16 24.4.7 16 .7zm0 28c-3.2 0-6.1-1.2-8.3-3.1 1.1-2.3 3.9-3.9 8.3-3.9s7.2 1.6 8.3 3.9c-2.2 1.9-5.1 3.1-8.3 3.1zm-3.5-11.6c0-1.9 1.6-3.5 3.5-3.5s3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5-3.5-1.6-3.5-3.5zm13.1 6.5c-1.8-2.9-5.2-4.4-9.6-4.4s-7.8 1.5-9.6 4.4C4.1 21.4 3.1 18.8 3.1 16 3.1 8.9 8.9 3.1 16 3.1S28.9 8.9 28.9 16c0 2.8-1 5.4-3.3 7.6z" />
                </svg>
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Secondary sub-nav appears once the hero scrolls out of view. */}
      <div
        className={`border-b border-[#EBEBEB] bg-white overflow-hidden transition-all duration-200 ${
          showSubnav ? "max-h-16 opacity-100" : "max-h-0 opacity-0 border-b-0"
        }`}
      >
        <div className="page-container flex items-center justify-between h-14">
          <nav className="flex items-center gap-2" aria-label="Listing sections">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                onClick={() => setActive(s.id)}
                className={`text-sm py-4 border-b-2 -mb-px transition-colors ${
                  active === s.id ? "border-[#222] text-[#222] font-medium" : "border-transparent text-[#222] hover:border-[#222]"
                }`}
              >
                {s.label}
              </a>
            ))}
          </nav>
          <div className="hidden sm:flex items-center gap-4">
            <div className="text-sm">
              <span className="font-semibold">{price}</span>{" "}
              <span className="text-[#222]">for 5 nights</span>
              <span className="mx-1.5 text-[#717171]">·</span>
              <span className="inline-flex items-center gap-1">
                <Icon name="starSmall" size={11} /> {rating.toFixed(2)}
                <span className="text-[#717171]">· {reviewCount} reviews</span>
              </span>
            </div>
            <a href="#booking" className="btn-rausch text-white font-semibold rounded-lg px-5 py-2.5 text-sm">
              Reserve
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
