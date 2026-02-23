import type { Company } from "../types/Company.tsx";

export async function getCompanies(): Promise<Company[]> {
    const response = await fetch(`/api/company`,
        {
            method: "GET",
            headers: {
                Accept: "application/json",
            },
        });

    if (!response.ok) {
        throw new Error('Failed to fetch companies');
    }

    const data = (await response.json()) as Company[];
    return data;
}