import type { UseFormRegister } from "react-hook-form";
import type { IncidentFilters } from "../../types/Incident.tsx";
import type { Company } from "../../types/Company.tsx";

const labelBase =
  "text-[11px] font-semibold uppercase tracking-wider text-slate-400";
const inputBase =
  "mt-1 w-full rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-slate-100 " +
  "shadow-inner shadow-black/20 outline-none transition " +
  "placeholder:text-slate-500 " +
  "focus:border-white/20 focus:ring-2 focus:ring-white/15";
const buttonBase =
  "inline-flex w-full items-center justify-center rounded-full border border-white/10 bg-white/4 " +
  "px-3 py-2 text-xs font-medium text-slate-200 transition " +
  "hover:bg-white/8 hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-white/15";

type Props = {
  companies: Company[];
  register: UseFormRegister<IncidentFilters>;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
};

export const FiltersForm = ({
  companies,
  register,
  onSubmit,
  onReset,
}: Props) => (
  <form
    id="filters-form"
    onSubmit={onSubmit}
    className="flex flex-col flex-1 min-h-0"
  >
    <div className="flex-1 overflow-y-auto px-4 py-4 grid gap-4 content-start">
      <div>
        <label htmlFor="companyId" className={labelBase}>
          Company
        </label>
        <select
          id="companyId"
          className={`${inputBase} appearance-none`}
          {...register("companyId")}
        >
          <option value={0}>All companies</option>
          {companies?.map((company) => (
            <option key={company.companyId} value={company.companyId}>
              {company.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="severity" className={labelBase}>
          Severity
        </label>
        <select
          id="severity"
          className={`${inputBase} appearance-none`}
          {...register("severity")}
        >
          <option value="">All</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      <div>
        <label htmlFor="status" className={labelBase}>
          Status
        </label>
        <select
          id="status"
          className={`${inputBase} appearance-none`}
          {...register("status")}
        >
          <option value="">All</option>
          <option value="Open">Open</option>
          <option value="Closed">Closed</option>
        </select>
      </div>
    </div>

    <div className="border-t border-white/10 px-4 py-4">
      <div className="grid gap-3">
        <button type="submit" className={buttonBase}>
          Apply
        </button>
        <button type="button" onClick={onReset} className={buttonBase}>
          Reset
        </button>
      </div>
    </div>
  </form>
);

export default FiltersForm;
