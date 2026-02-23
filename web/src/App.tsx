import './App.css'
import IncidentsTable from "./components/IncidentsTable";

function App() {
  return (
    <>
      <h1>Incidents Map</h1>
        <IncidentsTable companyId={2} />
    </>
  )
}

export default App
