export const pillClasses = (kind: "severity" | "status", value?: string) => {
  const v = (value ?? "").toLowerCase();

  if (kind === "severity") {
    if (v.includes("critical") || v.includes("high") || v.includes("major"))
      return "bg-red-500/15 text-red-200 ring-1 ring-red-500/25";
    if (v.includes("medium") || v.includes("moderate"))
      return "bg-amber-500/15 text-amber-200 ring-1 ring-amber-500/25";
    if (v.includes("low") || v.includes("minor"))
      return "bg-emerald-500/15 text-emerald-200 ring-1 ring-emerald-500/25";
    return "bg-slate-500/15 text-slate-200 ring-1 ring-slate-500/25";
  }

  if (v.includes("open") || v.includes("new"))
    return "bg-sky-500/15 text-sky-200 ring-1 ring-sky-500/25";
  if (v.includes("in") || v.includes("progress"))
    return "bg-indigo-500/15 text-indigo-200 ring-1 ring-indigo-500/25";
  if (v.includes("closed") || v.includes("resolved"))
    return "bg-slate-500/15 text-slate-200 ring-1 ring-slate-500/25";
  return "bg-slate-500/15 text-slate-200 ring-1 ring-slate-500/25";
};
