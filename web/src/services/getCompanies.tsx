import type { Company } from "../types/Company.tsx";

export async function getCompanies(): Promise<Company[]> {
  const base = import.meta.env.VITE_API_BASE_URL ?? "";
  const response = await fetch(`${base}/api/company`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch companies");
  }

  return (await response.json()) as Company[];
}
