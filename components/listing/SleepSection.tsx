import type { SleepArea } from "@/lib/types";

export function SleepSection({ sleep }: { sleep: SleepArea[] }) {
  return (
    <section>
      <h3 className="text-[22px] font-semibold text-[#222]">Where you&apos;ll sleep</h3>
      <div className="mt-6 flex gap-4 overflow-x-auto no-scrollbar pb-1">
        {sleep.map((s) => (
          <div key={s.title} className="w-[calc(50%-8px)] min-w-[210px] shrink-0">
            <div className="aspect-[1.35] w-full overflow-hidden rounded-xl border border-[#EBEBEB] bg-[#F7F7F7]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt={s.title} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="mt-3 text-[15px] font-semibold text-[#222]">{s.title}</div>
            <div className="text-sm text-[#717171]">{s.detail}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
