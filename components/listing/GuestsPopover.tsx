"use client";

import type { Guests } from "@/lib/useBooking";
import { Icon } from "../ui/Icon";

interface RowDef { key: keyof Guests; label: string; sub: string }
const ROWS: RowDef[] = [
  { key: "adults", label: "Adults", sub: "Age 13+" },
  { key: "children", label: "Children", sub: "Ages 2–12" },
  { key: "infants", label: "Infants", sub: "Under 2" },
  { key: "pets", label: "Pets", sub: "Bringing a service animal?" },
];

function Stepper({
  value, onDec, onInc, decDisabled, incDisabled, label,
}: { value: number; onDec: () => void; onInc: () => void; decDisabled: boolean; incDisabled: boolean; label: string }) {
  const btn = "flex h-8 w-8 items-center justify-center rounded-full border transition disabled:opacity-30 disabled:cursor-not-allowed";
  return (
    <div className="flex items-center gap-3">
      <button onClick={onDec} disabled={decDisabled} aria-label={`Decrease ${label}`} className={`${btn} border-[#B0B0B0] text-[#222] hover:border-[#222] enabled:hover:border-[#222]`}>
        <Icon name="minus" size={14} />
      </button>
      <span className="w-5 text-center text-[15px] tabular-nums text-[#222]" aria-live="polite">{value}</span>
      <button onClick={onInc} disabled={incDisabled} aria-label={`Increase ${label}`} className={`${btn} border-[#B0B0B0] text-[#222] hover:border-[#222] enabled:hover:border-[#222]`}>
        <Icon name="plus" size={14} />
      </button>
    </div>
  );
}

/** Panel of guest steppers. Positioning + outside-click handled by the parent. */
export function GuestsPopover({
  guests, maxGuests, onChange, onClose,
}: { guests: Guests; maxGuests: number; onChange: (g: Guests) => void; onClose: () => void }) {
  const total = guests.adults + guests.children;
  const set = (key: keyof Guests, delta: number) => onChange({ ...guests, [key]: guests[key] + delta });

  return (
    <div className="rounded-2xl border border-[#DDDDDD] bg-white p-5 shadow-[0_6px_20px_rgba(0,0,0,0.18)]">
      {ROWS.map((r, i) => {
        const value = guests[r.key];
        const isGuestRow = r.key === "adults" || r.key === "children";
        const incDisabled = isGuestRow ? total >= maxGuests : value >= 5;
        const decDisabled = r.key === "adults" ? value <= 1 : value <= 0;
        return (
          <div key={r.key} className={`flex items-center justify-between py-4 ${i < ROWS.length - 1 ? "border-b border-[#EBEBEB]" : ""}`}>
            <div>
              <div className="text-[15px] font-medium text-[#222]">{r.label}</div>
              <div className="text-[13px] text-[#717171]">{r.sub}</div>
            </div>
            <Stepper
              label={r.label}
              value={value}
              decDisabled={decDisabled}
              incDisabled={incDisabled}
              onDec={() => set(r.key, -1)}
              onInc={() => set(r.key, 1)}
            />
          </div>
        );
      })}
      <p className="mt-3 text-[13px] text-[#717171]">This place has a maximum of {maxGuests} guests, not including infants.</p>
      <div className="mt-2 flex justify-end">
        <button onClick={onClose} className="rounded-lg px-3 py-2 text-[15px] font-semibold text-[#222] underline hover:bg-[#F7F7F7]">Close</button>
      </div>
    </div>
  );
}
