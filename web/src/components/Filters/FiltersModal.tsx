import { useEffect } from "react";
import Filters from "./index.tsx";

type Props = {
  open: boolean;
  onClose: () => void;
};

const useEscapeToClose = (open: boolean, onClose: () => void) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);
};

const usePreventScroll = (open: boolean) => {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
};

export default function FiltersModal({ open, onClose }: Props) {
  useEscapeToClose(open, onClose);

  usePreventScroll(open);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <button
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
        aria-label="Close filters"
      />

      {/* Panel */}
      <div className="absolute inset-0 flex flex-col bg-[#2C2C2C]">
        {/* Modal header */}
        <div className="flex-shrink-0 flex items-center justify-between border-b border-[#343434] p-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">Filters</h2>
            <p className="mt-1 text-xs text-slate-400">
              Refine what's shown on the map.
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-full border border-[#343434] bg-white/4 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-white/8 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          >
            Close
          </button>
        </div>

        {/* Filters fills the remaining space */}
        <div className="flex-1 min-h-0">
          <Filters />
        </div>
      </div>
    </div>
  );
}
