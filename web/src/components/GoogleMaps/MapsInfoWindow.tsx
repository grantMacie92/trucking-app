import { useCallback } from 'react';
import { InfoWindow } from '@react-google-maps/api';

const MapsInfoWindow = ({ selectedPoint, setSelectedId }) => {
    const handleSetSelectedId = useCallback(() => {
        return setSelectedId(null)
    }, [setSelectedId]);

    return (
        <InfoWindow
            position={{ lat: selectedPoint.lat, lng: selectedPoint.lng }}
            onCloseClick={() => setSelectedId(null)}
            options={{ headerDisabled: true }}
        >
            <div className="w-64">
                <div className="flex items-start justify-between gap-3">
                    <div>
                        <div className="text-sm font-semibold text-slate-900">
                            Incident #{selectedPoint.id}
                        </div>
                        <div className="mt-1 text-xs text-slate-600">
                            Click map background to reset.
                        </div>
                    </div>

                    <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700">
                        {selectedPoint.status}
                    </span>
                </div>

                <div className="mt-3 space-y-1 text-xs text-slate-700">
                    <div><span className="font-medium">Type:</span> {selectedPoint.type}</div>
                    <div><span className="font-medium">Severity:</span> {selectedPoint.severity}</div>
                    <div><span className="font-medium">Location:</span> {selectedPoint.location}</div>
                    {selectedPoint.occurredAt && (
                        <div><span className="font-medium">Date/Time:</span> {new Date(selectedPoint.occurredAt)?.toLocaleString()}</div>
                    )}
                    <div>
                        <span className="font-medium">{selectedPoint.drivers.length === 1 ? 'Driver:' : 'Drivers:'}</span>
                        {selectedPoint.drivers?.map(driver => driver.name).join(', ')}
                    </div>
                </div>
                <button className="my-2" onClick={handleSetSelectedId} type="close">Close</button>
            </div>
        </InfoWindow>
    )
}

export default MapsInfoWindow;