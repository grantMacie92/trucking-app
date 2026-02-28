import { formatDateTime } from "./utilities.tsx";
import { pillClasses } from "./constants.tsx";

const DesktopTable = ({ rows }) => {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="min-w-full table-auto">
        <thead className="sticky top-0 z-10 bg-[#1E1E1E]/95 backdrop-blur supports-[backdrop-filter]:bg-[#1E1E1E]/75">
          <tr className="text-left text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            <th className="px-5 py-3">ID</th>
            <th className="px-5 py-3">Location</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Severity</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Type</th>
            <th className="px-5 py-3">Driver(s)</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-white/10">
          {rows?.map((incident, idx) => (
            <tr
              key={incident.incidentId}
              className={[
                "text-sm text-slate-200",
                idx % 2 === 0 ? "bg-white/[0.02]" : "bg-transparent",
                "hover:bg-white/[0.06] transition-colors",
              ].join(" ")}
            >
              <td className="px-5 py-3 font-mono text-xs text-slate-300">
                {incident.incidentId}
              </td>

              <td className="px-5 py-3">
                <div className="max-w-[420px] truncate text-slate-100">
                  {incident.locationName || "—"}
                </div>
              </td>

              <td className="px-5 py-3 text-slate-300">
                {formatDateTime(incident.occurredAt ?? incident.occurredAt)}
              </td>

              <td className="px-5 py-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${pillClasses(
                    "severity",
                    incident.severity,
                  )}`}
                >
                  {incident.severity ?? "—"}
                </span>
              </td>

              <td className="px-5 py-3">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${pillClasses(
                    "status",
                    incident.status,
                  )}`}
                >
                  {incident.status ?? "—"}
                </span>
              </td>

              <td className="px-5 py-3 text-slate-300">
                {incident.type ?? "—"}
              </td>

              <td className="px-5 py-3 text-slate-300">
                {incident.drivers?.length > 0
                  ? incident.drivers.map((d) => d.name).join(", ")
                  : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DesktopTable;
