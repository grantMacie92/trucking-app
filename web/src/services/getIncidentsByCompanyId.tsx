import type { Incident } from "../types/Incident.tsx";

export async function getIncidentsByCompanyId({
  companyId,
}: {
  companyId: number;
}): Promise<Incident[]> {
  const response = await fetch(`/api/incidents/company/${companyId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch incidents");
  }

  return (await response.json()) as Incident[];
}
