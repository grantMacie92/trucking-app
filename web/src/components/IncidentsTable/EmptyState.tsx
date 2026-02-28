const EmptyState = () => {
  return (
    <div className="px-5 py-10">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300 ring-1 ring-white/10">
          No incidents found
        </div>
        <p className="mt-2 text-xs text-slate-500">
          Once incidents are created they’ll show up here.
        </p>
      </div>
    </div>
  );
};

export default EmptyState;
