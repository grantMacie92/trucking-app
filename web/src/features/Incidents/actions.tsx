import type { GetIncidentsRequest, Incident } from "../../types/Incident.tsx";

export const FETCH_INCIDENTS = "FETCH_INCIDENTS";
export const FETCH_INCIDENTS_SUCCESS = "FETCH_INCIDENTS_SUCCESS";
export const FETCH_INCIDENTS_FAILURE = "FETCH_INCIDENTS_FAILURE";
export const SET_INCIDENT_FILTERS = "SET_INCIDENT_FILTERS";

export const fetchIncidents = () => ({
  type: FETCH_INCIDENTS,
});

export const fetchIncidentsSuccess = (incidents: Incident[]) => ({
  type: FETCH_INCIDENTS_SUCCESS,
  payload: incidents,
});

export const fetchIncidentsFailure = (error: string) => ({
  type: FETCH_INCIDENTS_FAILURE,
  payload: error,
});

export const setIncidentFilters = (filters: GetIncidentsRequest) => ({
  type: SET_INCIDENT_FILTERS,
  payload: filters,
});

export type IncidentsAction =
  | ReturnType<typeof fetchIncidentsSuccess>
  | ReturnType<typeof fetchIncidentsFailure>
  | ReturnType<typeof fetchIncidents>
  | ReturnType<typeof setIncidentFilters>;
