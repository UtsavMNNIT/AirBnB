"use client";

import { useRef } from "react";
import { useFocusTrap, useScrollLock } from "@/lib/overlay";
import { Icon } from "./Icon";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

/** Centered accessible dialog with backdrop, focus trap, Esc-to-close. */
export function Modal({ open, onClose, title, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  useScrollLock(open);
  useFocusTrap(ref, open, onClose);
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 animate-[fade_.2s_ease]" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className="relative z-10 flex max-h-[90vh] w-full max-w-[780px] flex-col rounded-2xl bg-white shadow-2xl animate-[pop_.2s_ease]"
      >
        <div className="flex items-center border-b border-[#EBEBEB] px-6 py-3">
          <button onClick={onClose} aria-label="Close" className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#F7F7F7]">
            <Icon name="close" size={16} />
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6">
          {title && <h2 className="mb-6 text-2xl font-semibold text-[#222]">{title}</h2>}
          {children}
        </div>
      </div>
      <style>{`@keyframes fade{from{opacity:0}to{opacity:1}}@keyframes pop{from{opacity:0;transform:translateY(8px) scale(.98)}to{opacity:1;transform:none}}`}</style>
    </div>
  );
}
