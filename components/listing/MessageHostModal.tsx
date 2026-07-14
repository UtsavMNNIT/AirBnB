"use client";

import { useEffect, useState } from "react";
import { Modal } from "../ui/Modal";

export function MessageHostModal({
  open, onClose, hostName,
}: { open: boolean; onClose: () => void; hostName: string }) {
  const [text, setText] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => { if (open) { setText(""); setSent(false); } }, [open]);

  return (
    <Modal open={open} onClose={onClose} title={sent ? "Message sent" : `Message ${hostName}`}>
      {sent ? (
        <div className="py-2">
          <p className="text-[15px] text-[#222]">Your message to {hostName} has been sent. They typically respond within an hour. (Demo — nothing is sent.)</p>
          <button onClick={onClose} className="btn-rausch mt-6 rounded-lg px-6 py-3 text-[15px] font-semibold text-white">Done</button>
        </div>
      ) : (
        <div>
          <p className="mb-4 text-[15px] text-[#717171]">Ask about check-in, the neighbourhood, amenities — anything about your stay.</p>
          <label htmlFor="host-msg" className="sr-only">Your message</label>
          <textarea
            id="host-msg"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={5}
            placeholder="Hi! I'm interested in your place…"
            className="w-full resize-none rounded-xl border border-[#B0B0B0] p-3 text-[15px] text-[#222] outline-none focus:border-[#222]"
          />
          <button
            onClick={() => setSent(true)}
            disabled={!text.trim()}
            className="btn-rausch mt-4 rounded-lg px-6 py-3 text-[15px] font-semibold text-white disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Send message
          </button>
        </div>
      )}
    </Modal>
  );
}
