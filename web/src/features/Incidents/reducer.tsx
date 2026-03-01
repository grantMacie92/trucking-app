import type { IncidentsState } from "../../types/Incident.tsx";
import {
  FETCH_INCIDENTS,
  FETCH_INCIDENTS_FAILURE,
  FETCH_INCIDENTS_SUCCESS,
  SET_INCIDENT_FILTERS,
  type IncidentsAction,
} from "./actions.tsx";

const initialState: IncidentsState = {
  items: [],
  loading: false,
  error: null,
  filters: {},
};

export function incidentsReducer(
  state: IncidentsState = initialState,
  action: IncidentsAction,
): IncidentsState {
  switch (action.type) {
    case FETCH_INCIDENTS:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case FETCH_INCIDENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        items: action.payload,
      };

    case FETCH_INCIDENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case SET_INCIDENT_FILTERS:
      return {
        ...state,
        filters: action.payload,
      };

    default:
      return state;
  }
}
