import type {Company} from "../../types/Company.tsx";
import {type CompaniesAction, FETCH_COMPANIES, FETCH_COMPANIES_FAILURE, FETCH_COMPANIES_SUCCESS} from "./actions.tsx";

export type CompanyState = {
    items: Company[];
    loading: boolean;
    error: string | null;
}

const initialState: CompanyState = {
    items: [],
    loading: false,
    error: null,
}

export function companiesReducer(
    state: CompanyState = initialState,
    action: CompaniesAction
) : CompanyState {
    switch(action.type) {
        case FETCH_COMPANIES:
            return {
                ...state,
                loading: true,
                error: null
            };

        case FETCH_COMPANIES_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload
            };

        case FETCH_COMPANIES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };

        default: return state;
    }
}