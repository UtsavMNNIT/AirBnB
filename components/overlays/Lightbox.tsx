"use client";

import { useCallback, useEffect, useRef } from "react";
import type { Photo } from "@/lib/types";
import { useFocusTrap, useScrollLock } from "@/lib/overlay";
import { Icon } from "../ui/Icon";

interface Props {
  photos: Photo[];
  index: number | null;
  onClose: () => void;   // grid icon: return to photo tour / listing
  onExit: () => void;    // close (X): dismiss lightbox and any tour beneath
  onChange: (i: number) => void;
}

export function Lightbox({ photos, index, onClose, onExit, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const open = index !== null;
  const total = photos.length;

  useScrollLock(open);
  useFocusTrap(ref, open, onClose);

  const go = useCallback(
    (dir: 1 | -1) => {
      if (index === null) return;
      const next = index + dir;
      if (next >= 0 && next < total) onChange(next);
    },
    [index, total, onChange],
  );

  // Keyboard navigation (Esc handled by the focus trap).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go]);

  // Preload neighbours for instant navigation.
  useEffect(() => {
    if (index === null) return;
    [index - 1, index + 1].forEach((i) => {
      if (i >= 0 && i < total) {
        const img = new Image();
        img.src = photos[i].src;
      }
    });
  }, [index, total, photos]);

  if (index === null) return null;
  const photo = photos[index];
  const hasPrev = index > 0;
  const hasNext = index < total - 1;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={`Photo ${index + 1} of ${total}, ${photo.room}`}
      tabIndex={-1}
      className="fixed inset-0 z-[70] flex flex-col bg-white outline-none animate-[lbIn_.2s_ease]"
    >
      {/* Top bar */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#EBEBEB] px-4 sm:px-6">
        <button onClick={onClose} aria-label="Back to all photos" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F7F7F7]">
          <Icon name="grid" size={18} />
        </button>
        <h2 className="text-[15px] font-semibold text-[#222]">{photo.room}</h2>
        <div className="flex items-center gap-4">
          <span aria-live="polite" className="text-sm text-[#222]">{index + 1} of {total}</span>
          <button onClick={onExit} aria-label="Close" className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-[#F7F7F7]">
            <Icon name="close" size={18} />
          </button>
        </div>
      </div>

      {/* Stage */}
      <div className="relative flex flex-1 items-center justify-center px-4 py-8 sm:px-16">
        {hasPrev && (
          <button
            onClick={() => go(-1)}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#222] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 transition"
          >
            <Icon name="chevronLeft" size={16} />
          </button>
        )}

        <div className="flex h-full w-full items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            key={index}
            src={photo.src}
            alt={photo.alt}
            className="max-h-full max-w-full rounded-xl object-contain shadow-sm animate-[imgFade_.22s_ease]"
          />
        </div>

        {hasNext && (
          <button
            onClick={() => go(1)}
            aria-label="Next photo"
            className="absolute right-3 sm:right-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-[#222] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.18)] hover:scale-105 active:scale-95 transition"
          >
            <Icon name="chevronRight" size={16} />
          </button>
        )}
      </div>

      <style>{`@keyframes lbIn{from{opacity:0}to{opacity:1}}@keyframes imgFade{from{opacity:0}to{opacity:1}}`}</style>
    </div>
  );
}
