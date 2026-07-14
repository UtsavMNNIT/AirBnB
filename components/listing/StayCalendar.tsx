"use client";

import { useState } from "react";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function monthGrid(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1).getDay(); // 0=Sun
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

function Month({
  year, monthIndex, label, range,
}: { year: number; monthIndex: number; label: string; range: [number, number] | null }) {
  const cells = monthGrid(year, monthIndex);
  const isOct = monthIndex === 9;
  return (
    <div className="flex-1 min-w-[260px]">
      <div className="mb-4 text-center text-[15px] font-semibold text-[#222]">{label}</div>
      <div className="grid grid-cols-7 gap-y-1 text-center">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="text-xs font-medium text-[#717171] pb-2">{w}</div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const inRange = isOct && range && d >= range[0] && d <= range[1];
          const isEnd = isOct && range && (d === range[0] || d === range[1]);
          return (
            <div key={i} className="flex justify-center py-0.5">
              <button
                className={[
                  "h-9 w-9 rounded-full text-sm transition-colors",
                  isEnd ? "bg-[#222] text-white font-semibold" : "",
                  inRange && !isEnd ? "bg-[#F7F7F7] text-[#222] rounded-none w-full" : "",
                  !inRange ? "text-[#222] hover:border hover:border-[#222]" : "",
                ].join(" ")}
                aria-current={isEnd ? "date" : undefined}
              >
                {d}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function StayCalendar({ stay }: { stay: { title: string; range: string } }) {
  const [cleared, setCleared] = useState(false);
  return (
    <section>
      <h3 className="text-[22px] font-semibold text-[#222]">{stay.title}</h3>
      <p className="mt-1 text-sm text-[#717171]">{cleared ? "Add your travel dates for exact pricing" : stay.range}</p>
      <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:gap-12">
        <Month year={2026} monthIndex={9} label="October 2026" range={cleared ? null : [18, 23]} />
        <Month year={2026} monthIndex={10} label="November 2026" range={null} />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={() => setCleared(true)}
          className="rounded-lg px-4 py-2 text-[15px] font-semibold text-[#222] underline hover:bg-[#F7F7F7]"
        >
          Clear dates
        </button>
      </div>
    </section>
  );
}
