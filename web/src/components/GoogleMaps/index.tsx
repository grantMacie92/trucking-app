import { GoogleMap, LoadScript, Marker, MarkerClusterer } from '@react-google-maps/api';
import { useMemo } from "react";

const containerStyle = {
    width: '100%',
    height: '500px'
};

export default function Map({ data }) {
    const center = useMemo(() => {
        if (data?.length > 0) return { lat: data[0].latitude, lng: data[0].longitude };
        return { lat: 37.7749, lng: -122.4194 };
    }, [data]);

    const zoom = data?.length > 0 ? 13 : 12
    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
            <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={zoom}>
                <MarkerClusterer>
                    {(clusterer) =>
                        data?.map((p) => (
                            <Marker
                                key={p.id}
                                position={{ lat: p.latitude, lng: p.longitude }}
                                clusterer={clusterer}
                            />
                        ))
                    }
                </MarkerClusterer>
            </GoogleMap>
        </LoadScript>
    );
}