import type { IncidentFilters, Incident } from "../types/Incident.tsx";

export async function getIncidents({
  request,
}: {
  request: IncidentFilters;
}): Promise<Incident[]> {
  const params = new URLSearchParams();

  if (request.companyId != null) {
    params.set("companyId", String(request.companyId));
  }
  if (request.severity) {
    params.set("severity", request.severity);
  }
  if (request.status) {
    params.set("status", request.status);
  }

  const base = import.meta.env.VITE_API_BASE_URL ?? "";
  const url = params.toString()
    ? `${base}/api/incidents?${params}`
    : `${base}/api/incidents`;

  const response = await fetch(url, {
    method: "GET",
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch incidents");
  }

  return (await response.json()) as Incident[];
}
