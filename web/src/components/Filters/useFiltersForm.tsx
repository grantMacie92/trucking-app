import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { selectIncidentFilters, type AppDispatch } from "../../store.tsx";
import {
  fetchIncidents,
  fetchIncidentsFailure,
  fetchIncidentsSuccess,
  setIncidentFilters,
} from "../../features/Incidents/actions.tsx";
import { getIncidents } from "../../services/getIncidents.tsx";
import type { IncidentFilters } from "../../types/Incident.tsx";

export const initialValues: IncidentFilters = {
  companyId: 0,
  severity: "",
  status: "",
};

export const useFiltersForm = () => {
  const dispatch = useDispatch<AppDispatch>();
  const activeFilters = useSelector(selectIncidentFilters);

  const { register, handleSubmit, reset } = useForm<IncidentFilters>({
    defaultValues: {
      companyId: activeFilters.companyId ?? 0,
      severity: activeFilters.severity ?? "",
      status: activeFilters.status ?? "",
    },
  });

  const onSubmit = useCallback(
    async (values: { companyId: string; severity: string; status: string }) => {
      const request: IncidentFilters = {};
      if (Number(values.companyId) !== 0)
        request.companyId = Number(values.companyId);
      if (values.severity !== "") request.severity = values.severity;
      if (values.status !== "") request.status = values.status;

      dispatch(fetchIncidents());
      dispatch(setIncidentFilters(request));

      try {
        const data = await getIncidents({ request });
        dispatch(fetchIncidentsSuccess(data));
      } catch (error) {
        dispatch(
          fetchIncidentsFailure(
            error instanceof Error ? error.message : "Unknown error",
          ),
        );
      }
    },
    [dispatch],
  );

  const handleReset = useCallback(() => {
    reset(initialValues);
    dispatch(setIncidentFilters(initialValues));
  }, [reset, dispatch]);

  return { register, handleSubmit, onSubmit, handleReset };
};
