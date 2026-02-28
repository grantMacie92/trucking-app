import type { Incident } from '../../types/Incident.tsx';

export const FETCH_ALL_INCIDENTS = 'FETCH_ALL_INCIDENTS';
export const FETCH_ALL_INCIDENTS_SUCCESS = 'FETCH_ALL_INCIDENTS_SUCCESS';
export const FETCH_ALL_INCIDENTS_FAILURE = 'FETCH_ALL_INCIDENTS_FAILURE';
export const FETCH_INCIDENTS_BY_COMPANY_ID = 'FETCH_INCIDENTS_BY_COMPANY_ID';
export const FETCH_INCIDENTS_BY_COMPANY_ID_SUCCESS = 'FETCH_INCIDENTS_BY_COMPANY_ID_SUCCESS';
export const FETCH_INCIDENTS_BY_COMPANY_ID_FAILURE = 'FETCH_INCIDENTS_BY_COMPANY_ID_FAILURE';

export const fetchAllIncidents = () => ({
    type: FETCH_ALL_INCIDENTS
});

export const fetchAllIncidentsSuccess = (incidents: Incident[]) => ({
    type: FETCH_ALL_INCIDENTS_SUCCESS,
    payload: incidents
});

export const fetchAllIncidentsFailure = (error: string) => ({
    type: FETCH_ALL_INCIDENTS_FAILURE,
    payload: error
});

export const fetchIncidentsByCompanyId = () => ({
    type: FETCH_INCIDENTS_BY_COMPANY_ID
});

export const fetchIncidentsByCompanyIdSuccess = (incidents: Incident[]) => ({
    type: FETCH_INCIDENTS_BY_COMPANY_ID_SUCCESS,
    payload: incidents
});

export const fetchIncidentsByCompanyIdFailure = (error: string) => ({
    type: FETCH_INCIDENTS_BY_COMPANY_ID_FAILURE,
    payload: error
})

export type IncidentsAction =
    ReturnType<typeof fetchAllIncidentsSuccess> |
    ReturnType<typeof fetchAllIncidentsFailure> |
    ReturnType<typeof fetchAllIncidents> |
    ReturnType<typeof fetchIncidentsByCompanyIdSuccess> |
    ReturnType<typeof fetchIncidentsByCompanyIdFailure> |
    ReturnType<typeof fetchIncidentsByCompanyId>;
