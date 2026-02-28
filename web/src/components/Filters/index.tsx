import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanies,
  fetchCompaniesFailure,
  fetchCompaniesSuccess,
} from "../../features/Companies/actions.tsx";
import {
  fetchIncidentsByCompanyId,
  fetchIncidentsByCompanyIdFailure,
  fetchIncidentsByCompanyIdSuccess,
} from "../../features/Incidents/actions.tsx";
import { getCompanies } from "../../services/getCompanies.tsx";
import { getIncidentsByCompanyId } from "../../services/getIncidentsByCompanyId.tsx";
import { selectCompanies } from "../../store.tsx";
import { getAllIncidents } from "../../services/getAllIncidents.tsx";

type IncidentFilterForm = {
  companyId: number;
};

const useLoadCompanies = ({ dispatch }: { dispatch: any }) => {
  useEffect(() => {
    const loadCompanies = async () => {
      dispatch(fetchCompanies());

      try {
        const data = await getCompanies();
        dispatch(fetchCompaniesSuccess(data));
      } catch (err) {
        dispatch(
          fetchCompaniesFailure(
            err instanceof Error ? err.message : "Unknown error",
          ),
        );
      }
    };

    loadCompanies();
  }, [dispatch]);
};

const Filters = () => {
  const dispatch = useDispatch();
  const companies = useSelector(selectCompanies);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IncidentFilterForm>({
    defaultValues: {
      companyId: "",
    },
  });

  const onSubmit = useCallback(
    async (values: { companyId: string }) => {
      dispatch(fetchIncidentsByCompanyId());

      try {
        const data =
          Number(values.companyId) === 0
            ? await getAllIncidents()
            : await getIncidentsByCompanyId({
                companyId: Number(values.companyId),
              });
        dispatch(fetchIncidentsByCompanyIdSuccess(data));
      } catch (error) {
        dispatch(
          fetchIncidentsByCompanyIdFailure(
            error instanceof Error ? error.message : "Unknown error",
          ),
        );
      }
    },
    [dispatch],
  );

  useLoadCompanies({ dispatch });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 m-4">
      <label htmlFor="companyId">Company:</label>
      <select id="companyId" {...register("companyId")}>
        <option value="">Select Company</option>
        {companies?.map((company) => (
          <option key={company.companyId} value={company.companyId}>
            {company.name}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/4 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:bg-white/8 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
      >
        Apply
      </button>
    </form>
  );
};

export default Filters;
