"use client";

import { useState } from "react";
import type { ThingsToKnowColumn } from "@/lib/types";
import { Icon } from "../ui/Icon";
import { Modal } from "../ui/Modal";

export function ThingsToKnow({ columns }: { columns: ThingsToKnowColumn[] }) {
  const [openCol, setOpenCol] = useState<ThingsToKnowColumn | null>(null);

  return (
    <section>
      <h2 className="text-[22px] font-semibold text-[#222]">Things to know</h2>
      <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-8">
        {columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-[15px] font-semibold text-[#222]">{col.title}</h3>
            <div className="mt-4 space-y-3">
              {col.lines.map((line, i) => (
                <p key={i} className="text-[14px] leading-5 text-[#222]">{line}</p>
              ))}
            </div>
            <button
              onClick={() => setOpenCol(col)}
              className="mt-4 flex items-center gap-1 text-[14px] font-semibold text-[#222] underline"
            >
              Learn more
              <Icon name="chevronRight" size={13} />
            </button>
          </div>
        ))}
      </div>

      <Modal open={openCol !== null} onClose={() => setOpenCol(null)} title={openCol?.title}>
        <ul className="space-y-4">
          {openCol?.details.map((d, i) => (
            <li key={i} className="border-b border-[#EBEBEB] pb-4 text-[15px] leading-6 text-[#222] last:border-0">
              {d}
            </li>
          ))}
        </ul>
      </Modal>
    </section>
  );
}
