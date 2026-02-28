import { useSelector } from "react-redux";
import { selectIncidents } from "../../store.tsx";
import Component from "./component.tsx";

const IncidentsTable = () => {
  const { items: incidents } = useSelector(selectIncidents);

  return <Component incidents={incidents} />;
};

export default IncidentsTable;
