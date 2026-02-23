import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIncidents } from "../../store.tsx";
import Form from "./Form.tsx";

const IncidentsTable = () => {
    const { items: incidents } = useSelector(selectIncidents);

    return (
        <React.Fragment>
            <Form />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Location</th>
                        <th>Date</th>
                        <th>Severity</th>
                        <th>Status</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                {incidents?.length === 0 ? (
                    <tr>{"There are no incidents"}</tr>
                ) : (
                    incidents?.map(incident => (
                        <tr key={incident.incidentId}>
                            <td>{incident.incidentId}</td>
                            <td>{incident.locationName}</td>
                            <td>{incident.occuredAt}</td>
                            <td>{incident.severity}</td>
                            <td>{incident.status}</td>
                            <td>{incident.type}</td>
                        </tr>
                    ))
                )}
                </tbody>
            </table>
        </React.Fragment>
    )
}

export default IncidentsTable;