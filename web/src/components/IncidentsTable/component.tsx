import { useMemo } from "react";
import type { Incident } from "../../types/Incident.tsx";
import EmptyState from "./EmptyState.tsx";
import MobileCards from "./MobileCards.tsx";
import DesktopTable from "./DesktopTable.tsx";

const IncidentsTable = ({ incidents }: { incidents: Incident[] }) => {
  const rows = useMemo(() => incidents ?? [], [incidents]);

  return (
    <div className="w-full">
      <div className="rounded-2xl border border-white/10 bg-[#1E1E1E] shadow-lg shadow-black/30">
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 sm:px-5 py-4">
          <div>
            <h2 className="text-sm font-semibold text-slate-100">Incidents</h2>
            <p className="mt-1 text-xs text-slate-400">
              {rows.length} record{rows.length === 1 ? "" : "s"}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {rows.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            {/* Mobile: stacked cards */}
            <MobileCards rows={rows} />

            {/* Desktop: full table */}
            <DesktopTable rows={rows} />
          </>
        )}
      </div>
    </div>
  );
};

export default IncidentsTable;
