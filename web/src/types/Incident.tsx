import type { Driver } from "./Driver.tsx";

export interface Incident {
  incidentId: number;
  severity: string;
  type: string;
  status: "open" | "closed";
  occurredAt: string;
  locationName?: string;
  drivers: Driver[];
  latitude: number;
  longitude: number;
}

export type IncidentsState = {
  items: Incident[];
  loading: boolean;
  error: string | null;
};
