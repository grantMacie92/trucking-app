const Loader = ({ isLoaded }: { isLoaded: boolean }) => {
  return (
    <div className="absolute inset-0 z-50 grid place-items-center bg-slate-950/60 backdrop-blur-sm">
      <div className="w-[min(360px,90vw)] rounded-xl border border-white/10 bg-slate-900/80 px-5 py-4 shadow-2xl">
        <div className="flex items-start gap-3">
          <div className="mt-0.5">
            <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-700 border-t-slate-200" />
          </div>

          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-slate-100">
              {!isLoaded ? "Loading map" : "Loading incidents"}
            </h3>
            <p className="mt-1 text-xs text-slate-400">
              {!isLoaded
                ? "Initializing Google Maps…"
                : "Fetching incidents and applying filters…"}
            </p>
          </div>
        </div>

        <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-800">
          <div className="h-full w-1/3 animate-[loader_1.2s_ease-in-out_infinite] rounded-full bg-slate-200/80" />
        </div>
      </div>
    </div>
  );
};

export default Loader;
