import { pillClasses } from "./constants.tsx";
import { formatDateTime } from "./utilities.tsx";

const MobileCards = ({ rows }) => {
  return (
    <div className="md:hidden">
      <ul className="divide-y divide-white/10">
        {rows.map((incident, idx) => {
          const drivers =
            incident.drivers?.length > 0
              ? incident.drivers.map((d) => d.name).join(", ")
              : "—";

          return (
            <li
              key={incident.incidentId}
              className={[
                "p-4",
                idx % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-slate-400">
                      #{incident.incidentId}
                    </span>
                    <span className="text-xs text-slate-400">
                      {formatDateTime(
                        incident.occurredAt ?? incident.occurredAt,
                      )}
                    </span>
                  </div>

                  <div className="mt-1 truncate text-sm font-semibold text-slate-100">
                    {incident.locationName || "—"}
                  </div>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${pillClasses(
                        "severity",
                        incident.severity,
                      )}`}
                    >
                      {incident.severity ?? "—"}
                    </span>

                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${pillClasses(
                        "status",
                        incident.status,
                      )}`}
                    >
                      {incident.status ?? "—"}
                    </span>

                    <span className="inline-flex items-center rounded-full bg-white/[0.04] px-2.5 py-1 text-xs font-medium text-slate-200 ring-1 ring-white/10">
                      {incident.type ?? "—"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-300">
                <span className="text-slate-500">Driver(s): </span>
                <span className="break-words">{drivers}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MobileCards;
