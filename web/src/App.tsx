import './App.css'
import IncidentsTable from "./components/IncidentsTable";
import Map from "./components/GoogleMaps/index";
import { useSelector } from "react-redux";
import { selectIncidents } from "./store.tsx";
import googleMapIcon from "./assets/google-map-icon.svg";
import Tabs from "./components/Tabs/index";
import Filters from "./components/Filters/index";


function App() {
  const { items: incidents } = useSelector(selectIncidents);

  return (
    <>
      <div className="flex items-center p-4">
        <img src={googleMapIcon} className="logo" alt="google maps logo" height="50px" width="50px"/>
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
