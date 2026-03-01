import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";
import IncidentsTable from "./components/IncidentsTable";
import Map from "./components/GoogleMaps/index";
import SideBar from "./components/SideBar";
import Header from "./components/Header";
import FiltersModal from "./components/Filters/FiltersModal";
import {
  fetchIncidents,
  fetchIncidentsFailure,
  fetchIncidentsSuccess,
} from "./features/Incidents/actions.tsx";
import { getIncidents } from "./services/getIncidents.tsx";
import { type AppDispatch, selectIncidents } from "./store.tsx";
import type { IncidentFilters } from "./types/Incident.tsx";
import "./App.css";

const useLoadIncidents = ({ dispatch }: { dispatch: AppDispatch }) => {
  useEffect(() => {
    const loadIncidents = async () => {
      dispatch(fetchIncidents());
      const query: IncidentFilters = {};
      try {
        const data = await getIncidents({ request: query });
        dispatch(fetchIncidentsSuccess(data));
      } catch (err) {
        dispatch(
          fetchIncidentsFailure(
            err instanceof Error ? err.message : "Unknown error",
          ),
        );
      }
    };

    loadIncidents();
  }, [dispatch]);
};

function App() {
  const { items: incidents } = useSelector(selectIncidents);
  const dispatch = useDispatch();
  const [showMap, setShowMap] = useState(true);
  const [filtersOpen, setFiltersOpen] = useState(false);

  useLoadIncidents({ dispatch });

  const { isLoaded } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_KEY,
  });

  return (
    <div className="min-h-screen bg-[#242424]">
      {/* Fixed sidebar (desktop only) */}
      <aside
        className="hidden md:flex md:fixed md:inset-y-0 md:left-0 md:w-64 md:flex-col
                   border-r-4 border-[#343434] bg-[#2C2C2C]"
      >
        {/* Let the sidebar content scroll internally if it overflows */}
        <div className="h-full overflow-y-auto">
          <SideBar />
        </div>
      </aside>

      {/* Main column. On desktop, offset for the fixed sidebar */}
      <div className="h-screen md:pl-64 flex flex-col">
        <Header
          showMap={showMap}
          setShowMap={setShowMap}
          onOpenFilters={() => setFiltersOpen(true)}
        />

        {/* Constrained area under header */}
        <main className="flex-1 min-h-0 p-1">
          {showMap ? (
            <div className="h-full min-h-0">
              {isLoaded ? <Map data={incidents} /> : <div>...Loading</div>}
            </div>
          ) : (
            <div className="h-full min-h-0 overflow-auto">
              <IncidentsTable />
            </div>
          )}
        </main>
      </div>

      {/* Mobile full-screen filters */}
      <FiltersModal open={filtersOpen} onClose={() => setFiltersOpen(false)} />
    </div>
  );
}

export default App;
