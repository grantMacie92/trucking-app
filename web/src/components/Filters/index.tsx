import { useSelector } from "react-redux";
import { useLoadCompanies } from "../../hooks/useLoadCompanies.tsx";
import { selectCompanies } from "../../store.tsx";
import { useFiltersForm } from "./useFiltersForm.tsx";
import { FiltersForm } from "./FiltersForm.tsx";

const Filters = () => {
  const companies = useSelector(selectCompanies);
  const { register, handleSubmit, onSubmit, handleReset } = useFiltersForm();

  useLoadCompanies();

  return (
    <div className="flex h-full flex-col">
      <div className="hidden md:block border-b border-white/10 px-4 py-4">
        <h2 className="text-sm font-semibold text-slate-100">Filters</h2>
        <p className="mt-1 text-xs text-slate-400">
          Refine what's shown on the map.
        </p>
      </div>

      <FiltersForm
        companies={companies ?? []}
        register={register}
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset}
      />
    </div>
  );
};

export default Filters;
