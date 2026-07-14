"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/Modal";

const REASONS = [
  "It's inaccurate or incorrect",
  "It's not a real place to stay",
  "It's a scam",
  "It's offensive",
  "It's something else",
];

export function ReportModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [reason, setReason] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => { if (open) { setReason(null); setSent(false); } }, [open]);

  return (
    <Modal open={open} onClose={onClose} title={sent ? "Thanks for letting us know" : "Report this listing"}>
      {sent ? (
        <div className="py-2">
          <p className="text-[15px] text-[#222]">Your report has been submitted. Our team will review it. (Demo — nothing is sent.)</p>
          <button onClick={onClose} className="btn-rausch mt-6 rounded-lg px-6 py-3 text-[15px] font-semibold text-white">Done</button>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-[15px] text-[#717171]">Help us understand what&apos;s wrong with this listing.</p>
          <fieldset className="space-y-1">
            <legend className="sr-only">Reason for reporting</legend>
            {REASONS.map((r) => (
              <label key={r} className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-3 hover:bg-[#F7F7F7]">
                <input type="radio" name="report-reason" value={r} checked={reason === r} onChange={() => setReason(r)} className="h-4 w-4 accent-[#222]" />
                <span className="text-[15px] text-[#222]">{r}</span>
              </label>
            ))}
          </fieldset>
          <button
            onClick={() => setSent(true)}
            disabled={!reason}
            className="btn-rausch mt-6 rounded-lg px-6 py-3 text-[15px] font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Submit report
          </button>
        </div>
      )}
    </Modal>
  );
}
