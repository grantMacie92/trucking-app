import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import googleMapIcon from './assets/google-map-icon.svg';
import IncidentsTable from './components/IncidentsTable';
import Map from './components/GoogleMaps/index';
import Tabs from './components/Tabs/index';
import Filters from './components/Filters';
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

  useLoadIncidents({ dispatch });

  return (
    <>
      <div className="flex items-center p-4">
        <img src={googleMapIcon} className="logo" alt="google maps logo" height="50px" width="50px" />
        <h1 className="px-3">Incidents Map</h1>
        <Filters />
      </div>
      <div className="app-body">
          <Tabs
              tabs={[
                  {
                      id: "map",
                      label: "Map",
                      content: <Map data={incidents} />,
                  },
                  {
                      id: "table",
                      label: "Table",
                      content: <IncidentsTable />,
                  },
              ]}
              initialTabId="map"
          />
      </div>
    </>
  )
}

export default App
