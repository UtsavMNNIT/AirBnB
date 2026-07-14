import * as React from "react";

type IconProps = React.SVGProps<SVGSVGElement> & { name: IconName; size?: number };

export type IconName =
  | "star" | "starSmall" | "share" | "heart" | "heartFill" | "grid"
  | "chevronLeft" | "chevronRight" | "chevronDown" | "close" | "search"
  | "globe" | "menu" | "plus" | "minus" | "superhost" | "translate"
  // highlights
  | "outdoor" | "cool" | "key"
  // amenities
  | "kitchen" | "wifi" | "workspace" | "parking" | "pool" | "tv" | "ac"
  | "camera" | "smoke" | "co"
  // rating categories
  | "cleanliness" | "accuracy" | "checkin" | "communication" | "location" | "value"
  | "bed" | "sofa";

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 2,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const PATHS: Record<IconName, React.ReactNode> = {
  star: <path d="M12 1.5l3.09 6.26 6.91 1-5 4.87 1.18 6.87L12 17.27l-6.18 3.25L7 13.63l-5-4.87 6.91-1L12 1.5z" fill="currentColor" stroke="none" />,
  starSmall: <path d="M8 1l2.06 4.17L14.66 5.8l-3.33 3.25.79 4.58L8 11.44 3.88 13.6l.79-4.58L1.34 5.8l4.6-.63L8 1z" fill="currentColor" stroke="none" />,
  share: <><path d="M27 18v9a1 1 0 01-1 1H6a1 1 0 01-1-1v-9" {...stroke} /><path d="M16 4v20M9 11l7-7 7 7" {...stroke} /></>,
  heart: <path d="M16 28C16 28 4 21 4 12.5 4 8.36 7.36 5 11.5 5c2.5 0 4.5 1.5 4.5 1.5S18 5 20.5 5C24.64 5 28 8.36 28 12.5 28 21 16 28 16 28z" fill="rgba(0,0,0,0.5)" stroke="#fff" strokeWidth={2} />,
  heartFill: <path d="M16 28C16 28 4 21 4 12.5 4 8.36 7.36 5 11.5 5c2.5 0 4.5 1.5 4.5 1.5S18 5 20.5 5C24.64 5 28 8.36 28 12.5 28 21 16 28 16 28z" fill="#FF385C" stroke="#FF385C" strokeWidth={2} />,
  grid: <><rect x="3" y="3" width="8" height="8" rx="1.5" {...stroke} /><rect x="3" y="13" width="8" height="8" rx="1.5" {...stroke} /><rect x="13" y="3" width="8" height="8" rx="1.5" {...stroke} /><rect x="13" y="13" width="8" height="8" rx="1.5" {...stroke} /></>,
  chevronLeft: <path d="M15 4L7 12l8 8" {...stroke} />,
  chevronRight: <path d="M9 4l8 8-8 8" {...stroke} />,
  chevronDown: <path d="M4 8l6 6 6-6" {...stroke} />,
  close: <path d="M5 5l14 14M19 5L5 19" {...stroke} />,
  search: <><circle cx="11" cy="11" r="7" {...stroke} /><path d="M20 20l-4-4" {...stroke} /></>,
  globe: <><circle cx="12" cy="12" r="9" {...stroke} /><path d="M3 12h18M12 3c2.5 2.5 3.5 6 3.5 9s-1 6.5-3.5 9c-2.5-2.5-3.5-6-3.5-9S9.5 5.5 12 3z" {...stroke} /></>,
  menu: <><path d="M3 7h18M3 14h18" {...stroke} /></>,
  plus: <path d="M12 5v14M5 12h14" {...stroke} />,
  minus: <path d="M5 12h14" {...stroke} />,
  superhost: <path d="M16 2l3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6z" fill="currentColor" stroke="none" />,
  translate: <><path d="M4 6h10M9 4v2c0 5-3 8-6 9M6 9c0 3 3 5 6 6" {...stroke} /><path d="M14 20l4-9 4 9M15.5 17h5" {...stroke} /></>,
  outdoor: <><path d="M4 20h24M8 20V9l8-5 8 5v11" {...stroke} /><path d="M12 20v-6h8v6" {...stroke} /></>,
  cool: <><path d="M16 3v26M6 8l20 16M26 8L6 24" {...stroke} /><circle cx="16" cy="16" r="3" {...stroke} /></>,
  key: <><circle cx="10" cy="12" r="5" {...stroke} /><path d="M14 15l10 10M20 21l3-3M24 25l3-3" {...stroke} /></>,
  kitchen: <><rect x="6" y="3" width="20" height="26" rx="2" {...stroke} /><path d="M6 12h20M11 6v3M15 6v3" {...stroke} /></>,
  wifi: <><path d="M4 11c7-6 17-6 24 0M8 16c4.5-4 11.5-4 16 0M12 21c2-1.8 6-1.8 8 0" {...stroke} /><circle cx="16" cy="25" r="1.5" fill="currentColor" stroke="none" /></>,
  workspace: <><rect x="4" y="6" width="24" height="15" rx="1.5" {...stroke} /><path d="M10 26h12M16 21v5" {...stroke} /></>,
  parking: <><rect x="5" y="5" width="22" height="22" rx="3" {...stroke} /><path d="M13 22V10h4a3.5 3.5 0 010 7h-4" {...stroke} /></>,
  pool: <><path d="M4 24c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2" {...stroke} /><path d="M9 20V7a3 3 0 016 0M9 13h6" {...stroke} /></>,
  tv: <><rect x="4" y="6" width="24" height="16" rx="2" {...stroke} /><path d="M11 27h10M16 22v5" {...stroke} /></>,
  ac: <><rect x="4" y="7" width="24" height="10" rx="3" {...stroke} /><path d="M9 21v2M16 21v3M23 21v2M9 13h14" {...stroke} /></>,
  camera: <><path d="M4 9l7-2 2 4 10-1v13a2 2 0 01-2 2H6a2 2 0 01-2-2V9z" {...stroke} /><circle cx="15" cy="17" r="4" {...stroke} /></>,
  smoke: <><circle cx="16" cy="16" r="12" {...stroke} /><circle cx="16" cy="16" r="2.5" fill="currentColor" stroke="none" /></>,
  co: <><circle cx="16" cy="16" r="12" {...stroke} /><path d="M13 13a3 3 0 100 6M22 16a3 3 0 11-6 0 3 3 0 016 0z" {...stroke} /></>,
  cleanliness: <><path d="M10 4l3 8M8 12h10l-1.5 14h-7L8 12z" {...stroke} /><path d="M13 12l2-8" {...stroke} /></>,
  accuracy: <><path d="M6 16l6 6 14-14" {...stroke} /></>,
  checkin: <><rect x="6" y="4" width="14" height="24" rx="1.5" {...stroke} /><circle cx="16" cy="16" r="1.5" fill="currentColor" stroke="none" /><path d="M20 16h6M23 13l3 3-3 3" {...stroke} /></>,
  communication: <><path d="M4 6h18a2 2 0 012 2v10a2 2 0 01-2 2H12l-6 5v-5H4a0 0 0 010 0z" {...stroke} /></>,
  location: <><path d="M16 28s10-8 10-16A10 10 0 006 12c0 8 10 16 10 16z" {...stroke} /><circle cx="16" cy="12" r="3.5" {...stroke} /></>,
  value: <><path d="M6 6h9l11 11-9 9L6 15V6z" {...stroke} /><circle cx="11" cy="11" r="1.8" fill="currentColor" stroke="none" /></>,
  bed: <><path d="M3 10v12M29 22V15a3 3 0 00-3-3H10v10M3 18h26" {...stroke} /></>,
  sofa: <><path d="M6 15v-3a3 3 0 013-3h14a3 3 0 013 3v3M4 15a2 2 0 012 2v4h20v-4a2 2 0 014 0v5H4v-7z" {...stroke} /></>,
};

/** Airbnb-style inline SVG icon. Default 24px, uses currentColor. */
export function Icon({ name, size = 24, ...rest }: IconProps) {
  const vb = ["star", "starSmall", "chevronLeft", "chevronRight", "chevronDown", "close",
    "search", "globe", "menu", "plus", "minus"].includes(name) ? "0 0 24 24" : "0 0 32 32";
  return (
    <svg viewBox={vb} width={size} height={size} aria-hidden="true" focusable="false"
      role="presentation" {...rest}>
      {PATHS[name]}
    </svg>
  );
}
