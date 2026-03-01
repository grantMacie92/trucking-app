import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  fetchCompanies,
  fetchCompaniesFailure,
  fetchCompaniesSuccess,
} from "../features/Companies/actions.tsx";
import { getCompanies } from "../services/getCompanies.tsx";
import type { AppDispatch } from "../store.tsx";

export const useLoadCompanies = () => {
  const dispatch = useDispatch<AppDispatch>();

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
