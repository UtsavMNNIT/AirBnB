"use client";

import { cmp, sameDay, useBooking, type Ymd } from "@/lib/useBooking";

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function monthCells(year: number, monthIndex: number) {
  const first = new Date(year, monthIndex, 1).getDay(); // 0=Sun
  const days = new Date(year, monthIndex + 1, 0).getDate();
  const cells: (number | null)[] = Array(first).fill(null);
  for (let d = 1; d <= days; d++) cells.push(d);
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

type DayState = "start" | "end" | "single" | "in" | "none";

function Month({ year, monthIndex, label }: { year: number; monthIndex: number; label: string }) {
  const { checkIn, checkOut, selectDay } = useBooking();
  const cells = monthCells(year, monthIndex);

  const stateOf = (day: Ymd): DayState => {
    const isIn = sameDay(day, checkIn);
    const isOut = sameDay(day, checkOut);
    if (isIn && checkOut) return "start";
    if (isOut) return "end";
    if (isIn) return "single";
    if (checkIn && checkOut && cmp(day, checkIn) > 0 && cmp(day, checkOut) < 0) return "in";
    return "none";
  };

  const monthName = label.split(" ")[0];

  return (
    <div className="flex-1 min-w-[260px]">
      <div className="mb-4 text-center text-[15px] font-semibold text-[#222]">{label}</div>
      <div className="grid grid-cols-7 text-center">
        {WEEKDAYS.map((w, i) => (
          <div key={i} className="pb-2 text-xs font-medium text-[#717171]">{w}</div>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <div key={i} />;
          const day: Ymd = { y: year, m: monthIndex, d };
          const st = stateOf(day);
          const filled = st === "start" || st === "end" || st === "single";
          return (
            <div
              key={i}
              className={`py-0.5 ${st === "in" ? "bg-[#F7F7F7]" : ""} ${st === "start" ? "rounded-l-full bg-[#F7F7F7]" : ""} ${st === "end" ? "rounded-r-full bg-[#F7F7F7]" : ""}`}
            >
              <button
                onClick={() => selectDay(day)}
                aria-label={`${d} ${monthName} ${year}`}
                aria-pressed={filled}
                className={[
                  "flex h-9 w-9 mx-auto items-center justify-center rounded-full text-sm transition-colors",
                  filled ? "bg-[#222] text-white font-semibold" : "text-[#222] hover:border hover:border-[#222]",
                ].join(" ")}
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

export function StayCalendar() {
  const { nights, rangeLabel, clearDates, checkIn } = useBooking();

  const heading = nights > 0 ? `${nights} night${nights !== 1 ? "s" : ""} in Candolim` : "Select check-out date";
  const sub = rangeLabel || (checkIn ? "Select your check-out date" : "Add your travel dates for exact pricing");

  return (
    <section id="stay" className="scroll-mt-28">
      <h3 className="text-[22px] font-semibold text-[#222]">{heading}</h3>
      <p className="mt-1 text-sm text-[#717171]">{sub}</p>
      <div className="mt-6 flex flex-col gap-8 sm:flex-row sm:gap-12">
        <Month year={2026} monthIndex={9} label="October 2026" />
        <Month year={2026} monthIndex={10} label="November 2026" />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={clearDates}
          className="rounded-lg px-4 py-2 text-[15px] font-semibold text-[#222] underline hover:bg-[#F7F7F7]"
        >
          Clear dates
        </button>
      </div>
    </section>
  );
}
