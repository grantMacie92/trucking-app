import { useCallback } from "react";
import { InfoWindow } from "@react-google-maps/api";
import type { Driver } from "../../types/Driver.tsx";
import type { GoogleMapPoint } from "../../types/GoogleMapPoint.tsx";
import { pillClasses } from "../IncidentsTable/constants.tsx";

const MapsInfoWindow = ({
  selectedPoint,
  setSelectedId,
}: {
  selectedPoint: GoogleMapPoint;
  setSelectedId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const handleSetSelectedId = useCallback(() => {
    return setSelectedId(null);
  }, [setSelectedId]);

  return (
    <InfoWindow
      position={{ lat: selectedPoint.lat, lng: selectedPoint.lng }}
      options={{
        headerDisabled: true,
        // optional: give the bubble a little breathing room
        pixelOffset: new google.maps.Size(0, -30),
      }}
    >
      <div className="w-72 max-w-[85vw] rounded-xl border border-white/10 bg-[#1E1E1E]/95 p-4 shadow-2xl">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="text-sm font-semibold text-slate-100">
              Incident #{selectedPoint.id}
            </div>
            <div className="mt-1 text-xs text-slate-400">
              Click map background to reset.
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-wrap gap-2">
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${pillClasses(
              "status",
              selectedPoint.status,
            )}`}
          >
            {selectedPoint.status}
          </span>
          <div
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${pillClasses(
              "severity",
              selectedPoint.severity,
            )}`}
          >
            {selectedPoint.severity}
          </div>
        </div>

        <div className="mt-3 space-y-1 text-xs text-slate-300">
          <div>
            <span className="font-medium text-slate-200">Type:</span>{" "}
            {selectedPoint.type}
          </div>
          <div>
            <span className="font-medium text-slate-200">Location:</span>{" "}
            {selectedPoint.location}
          </div>
          {selectedPoint.occurredAt && (
            <div>
              <span className="font-medium text-slate-200">Date/Time:</span>{" "}
              {new Date(selectedPoint.occurredAt).toLocaleString()}
            </div>
          )}
          <div>
            <span className="font-medium text-slate-200">
              {selectedPoint.drivers.length === 1 ? "Driver:" : "Drivers:"}
            </span>{" "}
            {selectedPoint.drivers?.map((d: Driver) => d.name).join(", ")}
          </div>
        </div>

        <button
          type="button"
          onClick={handleSetSelectedId}
          style={{
            display: "inline-flex",
            width: "100%",
            maxWidth: "100%",
            boxSizing: "border-box",
          }}
          className="mt-3 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200 transition-colors hover:bg-white/[0.08]"
        >
          Close
        </button>
      </div>
    </InfoWindow>
  );
};

export default MapsInfoWindow;
