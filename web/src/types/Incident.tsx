export interface Incident {
    id: string;
    title: string;
    status: 'open' | 'closed' | 'in_progress';
    createdAt: string;
    description?: string;
}

export type IncidentsState = {
    items: Incident[];
    loading: boolean;
    error: string | null;
};
