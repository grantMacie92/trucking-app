import { useCallback } from "react";
import googleMapIcon from "../../assets/google-map-icon.svg";

const Header = ({
  showMap,
  setShowMap,
  onOpenFilters,
}: {
  showMap: boolean;
  setShowMap: any;
  onOpenFilters: any;
}) => {
  const handleShowMap = useCallback(() => {
    setShowMap(!showMap);
  }, [setShowMap, showMap]);

  return (
    <header className="border-b-2 border-[#343434] p-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        {/* Title */}
        <div className="flex items-center gap-3">
          <img
            src={googleMapIcon}
            alt="google maps logo"
            className="h-7 w-7 md:h-12 md:w-12"
          />
          <h1 className="text-xs sm:text-3xl md:text-6xl font-semibold text-slate-100">
            Incidents Map
          </h1>
        </div>

        {/* Buttons */}
        <div className="flex w-full gap-2 md:w-auto md:justify-end">
          <button
            onClick={onOpenFilters}
            className="md:hidden flex-1 md:flex-none inline-flex items-center justify-center rounded-full border border-[#343434] bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/[0.08] hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          >
            Filters
          </button>

          <button
            onClick={handleShowMap}
            className="flex-1 md:flex-none inline-flex items-center justify-center rounded-full border border-[#343434] bg-white/[0.04] px-3 py-2 text-xs font-medium text-slate-200 transition hover:bg-white/[0.08] hover:text-slate-100 focus:outline-none focus:ring-2 focus:ring-sky-500/40"
          >
            {showMap ? "List View" : "Map View"}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
