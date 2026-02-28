import {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useJsApiLoader } from '@react-google-maps/api';
import IncidentsTable from './components/IncidentsTable';
import Map from './components/GoogleMaps/index';
import SideBar from './components/SideBar';
import Header from './components/Header';
import FiltersModal from './components/Filters/FiltersModal';
import {
    fetchAllIncidents,
    fetchAllIncidentsFailure,
    fetchAllIncidentsSuccess
} from './features/Incidents/actions.tsx';
import { getAllIncidents } from './services/getAllIncidents.tsx';
import { selectIncidents } from './store.tsx';
import './App.css'

const useLoadIncidents = ({ dispatch }) => {
    useEffect(() => {
        const loadIncidents = async () => {
            dispatch(fetchAllIncidents());

            try {
                const data = await getAllIncidents();
                dispatch(fetchAllIncidentsSuccess(data));
            } catch (err) {
                dispatch(
                    fetchAllIncidentsFailure(
                        err instanceof Error ? err.message : "Unknown error"
                    )
                );
            }
        };

        loadIncidents();
    }, [dispatch]);
}

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
    <div className="min-h-screen flex">
      {/* Left column */}
        <aside className="w-64 shrink-0 border-r-4 border-[#343434] hidden md:block" style={{ backgroundColor: '#2C2C2C' }}>
          <SideBar />
        </aside>

        {/* Right column */}
        <div className="flex-1 min-h-screen flex flex-col p-1">
          <Header showMap={showMap} setShowMap={setShowMap} onOpenFilters={() => setFiltersOpen(true)} />
          {/* Main content (fills remaining height) */}
          <main className="flex-1 overflow-auto">
            <div className="space-y-4">
              {showMap && (
                  isLoaded ? (
                    <Map data={incidents} />
                  ):(
                    <div>...Loading</div>
                  )
              )}
              {showMap === false && <IncidentsTable />}
            </div>
          </main>
        </div>

        {/* Mobile full-screen filters */}
        <FiltersModal open={filtersOpen} onClose={() => setFiltersOpen(false)} />
    </div>
  );
}

export default App
