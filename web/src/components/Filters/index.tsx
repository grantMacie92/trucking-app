import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
    fetchCompanies,
    fetchCompaniesFailure,
    fetchCompaniesSuccess
} from '../../features/Companies/actions.tsx';
import {
    fetchIncidentsByCompanyId,
    fetchIncidentsByCompanyIdFailure,
    fetchIncidentsByCompanyIdSuccess,
} from '../../features/Incidents/actions.tsx';
import { getCompanies } from '../../services/getCompanies.tsx';
import { getIncidentsByCompanyId } from '../../services/getIncidentsByCompanyId.tsx';
import { selectCompanies } from '../../store.tsx';

type IncidentFilterForm = {
    companyId: number;
}

const useLoadCompanies = ({ dispatch }) => {
    useEffect(() => {
        const loadCompanies = async () => {
            dispatch(fetchCompanies());

            try {
                const data = await getCompanies();
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
        dispatch(fetchIncidentsByCompanyId());

        try {
            const data = await getIncidentsByCompanyId({ companyId: Number(values.companyId) });
            dispatch(fetchIncidentsByCompanyIdSuccess(data));
        } catch (error) {
            dispatch(
                fetchIncidentsByCompanyIdFailure(
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