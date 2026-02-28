import type { Driver } from "./Driver.tsx";

export interface GoogleMapPoint {
  id: number;
  severity: string;
  type: string;
  status: "open" | "closed";
  occurredAt: string;
  location?: string;
  drivers: Driver[];
  lat: number;
  lng: number;
}
