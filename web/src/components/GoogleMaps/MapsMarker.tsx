import { useCallback } from 'react';
import { Marker } from '@react-google-maps/api';

const MapsMarker = ({ point, onClick, clusterer }) => {
    const handleMarkerClick = useCallback(() => {
        return onClick(point)
    }, [onClick, point]);

    return (
        <Marker
            key={point.id}
            position={{ lat: point.lat, lng: point.lng }}
            clusterer={clusterer}
            onClick={handleMarkerClick}
        />
    )
}

export default MapsMarker;