import { configureStore } from '@reduxjs/toolkit';
import { incidentsReducer } from './features/Incidents/reducer';
import { companiesReducer } from './features/Companies/reducer';

export const store = configureStore({
    reducer: {
        incidents: incidentsReducer,
        companies: companiesReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;

export const selectIncidents = (state: RootState) => state.incidents.items;
export const selectCompanies = (state: RootState) => state.companies.items;