import { useForm } from 'react-hook-form';
import {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCompanies} from "../../services/getCompanies.tsx";
import {selectCompanies} from "../../store.tsx";
import {getIncidents} from "../../services/getIncidents.tsx";
import {fetchCompanies, fetchCompaniesFailure, fetchCompaniesSuccess} from "../../features/Companies/actions.tsx";
import {fetchIncidents, fetchIncidentsFailure, fetchIncidentsSuccess} from "../../features/Incidents/actions.tsx";

type IncidentFilterForm = {
    companyId: number;
}

const useLoadCompanies = ({ dispatch }) => {
    useEffect(() => {
        const loadCompanies = async () => {
            dispatch(fetchCompanies());

            try {
                const data = await getCompanies();
                console.log("companies from API:", data);
                dispatch(fetchCompaniesSuccess(data));
            } catch (err) {
                dispatch(
                    fetchCompaniesFailure(
                        err instanceof Error ? err.message : "Unknown error"
                    )
                );
            }
        };

        loadCompanies();
    }, [dispatch]);
}

const Filters = () => {
    const dispatch = useDispatch();
    const companies = useSelector(selectCompanies);
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch
    } = useForm<IncidentFilterForm>({
        defaultValues: {
            companyId: '',
        },
    });

    const onSubmit = useCallback(async (values: { companyId: string }) => {
        dispatch(fetchIncidents());

        try {
            const data = await getIncidents({ companyId: Number(values.companyId) });
            dispatch(fetchIncidentsSuccess(data));
        } catch (error) {
            dispatch(
                fetchIncidentsFailure(
                    error instanceof Error ? error.message : "Unknown error"
                )
            );
        }
    }, [dispatch]);

    useLoadCompanies({ dispatch })

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <select {...register('companyId')}>
                <option value="">Select Company</option>
                {companies?.map(company => (
                    <option key={company.companyId} value={company.companyId}>
                        {company.name}
                    </option>
                ))}
            </select>
            <button type="submit">Filter</button>
        </form>
    )
}

export default Filters;