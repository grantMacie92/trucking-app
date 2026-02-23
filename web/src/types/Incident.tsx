export interface Incident {
    id: string;
    title: string;
    status: 'open' | 'closed' | 'in_progress';
    createdAt: string;
    description?: string;
}