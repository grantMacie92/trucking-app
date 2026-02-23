import type {Company} from "../../types/Company.tsx";

export const FETCH_COMPANIES = 'FETCH_COMPANIES';
export const FETCH_COMPANIES_SUCCESS = 'FETCH_COMPANIES_SUCCESS';
export const FETCH_COMPANIES_FAILURE = 'FETCH_COMPANIES_FAILURE';

export const fetchCompanies = () => ({
    type: FETCH_COMPANIES
});

export const fetchCompaniesSuccess = (companies: Company[]) => ({
    type: FETCH_COMPANIES_SUCCESS,
    payload: companies,
});

export const fetchCompaniesFailure = (error: string) => ({
    type: FETCH_COMPANIES_FAILURE,
    payload: error
});

export type CompaniesAction =
    ReturnType<typeof fetchCompaniesSuccess> |
    ReturnType<typeof fetchCompaniesFailure> |
    ReturnType<typeof fetchCompanies>;