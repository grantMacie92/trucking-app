import { useCallback, useEffect, useMemo, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { MAX_FIT_ZOOM, DEFAULT_CENTER, DEFAULT_ZOOM } from './constants.tsx';

const containerStyle = {
    width: "100%",
    height: "500px",
};

const useRefitWhenPointsChange = (points, mapRef) => {
    const fitToPoints = useCallback(() => {
        const map = mapRef.current;
        if (!map) return;

        if (points.length === 0) {
            map.setCenter(DEFAULT_CENTER);
            map.setZoom(DEFAULT_ZOOM);
            return;
        }

        const bounds = new window.google.maps.LatLngBounds();
        points.forEach((pt) => bounds.extend(pt));

        // If all points are identical
        if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
            map.setCenter(points[0]);
            map.setZoom(14);
            return;
        }

        map.fitBounds(bounds, 50); // 50px padding

        // Cap zoom after fitBounds settles
        window.google.maps.event.addListenerOnce(map, "idle", () => {
            const z = map.getZoom();
            if (typeof z === "number" && z > MAX_FIT_ZOOM) map.setZoom(MAX_FIT_ZOOM);
        });
    }, [points, mapRef]);

    useEffect(() => {
        if (mapRef.current && points.length >= 0) {
            fitToPoints();
        }
    }, [fitToPoints, points.length, mapRef]);

    return { fitToPoints };
};

export default function Map({ data }) {
    const mapRef = useRef(null);

    const points = useMemo(
        () =>
            (data ?? [])
                .filter((p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude))
                .map((p) => ({ id: p.incidentId, lat: p.latitude, lng: p.longitude })),
        [data]
    );

    const { fitToPoints } = useRefitWhenPointsChange(points, mapRef);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={DEFAULT_CENTER}
                zoom={DEFAULT_ZOOM}
                onLoad={(map) => {
                    mapRef.current = map;
                    fitToPoints();
                }}
                onUnmount={() => {
                    mapRef.current = null;
                }}
            >
                <MarkerClusterer>
                    {(clusterer) =>
                        points?.map((p) => (
                            <Marker
                                key={p.id}
                                position={{ lat: p.lat, lng: p.lng }}
                                clusterer={clusterer}
                            />
                        ))
                    }
                </MarkerClusterer>
            </GoogleMap>
        </LoadScript>
    );
}