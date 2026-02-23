import type { Incident } from "../../types/Incident.tsx";
import {
    FETCH_INCIDENTS,
    FETCH_INCIDENTS_FAILURE,
    FETCH_INCIDENTS_SUCCESS,
    type IncidentsAction
} from "./actions.tsx";

export type IncidentsState = {
    items: Incident[];
    loading: boolean;
    error: string | null;
};

const initialState: IncidentsState = {
    items: [],
    loading: false,
    error: null,
};

export function incidentsReducer(
    state: IncidentsState = initialState,
    action: IncidentsAction
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

        default:
            return state;
    }
}