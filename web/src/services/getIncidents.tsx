import type {Incident} from "../types/Incident.tsx";

export async function getIncidents({ companyId }): Promise<Incident[]> {
    const response = await fetch(`/api/incidents/company/${companyId}`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

    if (!response.ok) {
        throw new Error('Failed to fetch incidents');
    }

    const data = (await response.json()) as Incident[];
    return data;
}