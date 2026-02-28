import type { IncidentsState } from '../../types/Incident.tsx';
import {
    FETCH_ALL_INCIDENTS,
    FETCH_ALL_INCIDENTS_FAILURE,
    FETCH_ALL_INCIDENTS_SUCCESS,
    FETCH_INCIDENTS_BY_COMPANY_ID,
    FETCH_INCIDENTS_BY_COMPANY_ID_FAILURE,
    FETCH_INCIDENTS_BY_COMPANY_ID_SUCCESS,
    type IncidentsAction
} from './actions.tsx';

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
        case FETCH_ALL_INCIDENTS:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_ALL_INCIDENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
            };

        case FETCH_ALL_INCIDENTS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case FETCH_INCIDENTS_BY_COMPANY_ID:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_INCIDENTS_BY_COMPANY_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload,
            };

        case FETCH_INCIDENTS_BY_COMPANY_ID_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
}