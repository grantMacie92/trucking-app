import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GoogleMap, MarkerClusterer } from "@react-google-maps/api";
import {
  MAX_FIT_ZOOM,
  DEFAULT_CENTER,
  DEFAULT_ZOOM,
  FOCUS_ZOOM,
  CLUSTER_ZOOM_BUMP,
} from "./constants.tsx";
import MapsMarker from "./MapsMarker.tsx";
import MapsInfoWindow from "./MapsInfoWindow.tsx";
import type { Incident } from "../../types/Incident.tsx";

const containerStyle = { width: "100%", height: "100%" };

export default function Map({ data }: { data: T[] }) {
  const mapRef = useRef<google.maps.Map | null>(null);

  // blocks ONLY the immediate bubbling click from marker/cluster -> map
  const suppressMapClickRef = useRef(false);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  const points = useMemo(
    () =>
      (data ?? [])
        .filter(
          (p) => Number.isFinite(p.latitude) && Number.isFinite(p.longitude),
        )
        .map((p: Incident) => ({
          id: p.incidentId,
          lat: p.latitude,
          lng: p.longitude,
          type: p.type,
          severity: p.severity,
          drivers: p.drivers,
          status: p.status,
          location: p.locationName,
          occurredAt: p.occurredAt,
        })),
    [data],
  );

  const selectedPoint = useMemo(
    () => points.find((p) => p.id === selectedId) ?? null,
    [points, selectedId],
  );

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

    // All points identical
    if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
      map.setCenter(points[0]);
      map.setZoom(14);
      return;
    }

    map.fitBounds(bounds, 50);

    window.google.maps.event.addListenerOnce(map, "idle", () => {
      const z = map.getZoom();
      if (typeof z === "number" && z > MAX_FIT_ZOOM) map.setZoom(MAX_FIT_ZOOM);
    });
  }, [points]);

  useEffect(() => {
    // Only auto-fit when the user isn't focused on a specific marker/cluster
    if (!isFocused && mapRef.current) fitToPoints();
  }, [fitToPoints, isFocused]);

  const suppressMapClickBriefly = useCallback(() => {
    suppressMapClickRef.current = true;
    // release suppression immediately after this click finishes bubbling
    setTimeout(() => {
      suppressMapClickRef.current = false;
    }, 0);
  }, []);

  const focusLatLng = useCallback(
    (pos: google.maps.LatLngLiteral, zoom: number) => {
      const map = mapRef.current;
      if (!map) return;

      setIsFocused(true);
      map.panTo(pos);
      map.setZoom(zoom);
    },
    [mapRef],
  );

  const handleMarkerClick = useCallback(
    (p: { id: number; lat: number; lng: number }) => {
      suppressMapClickBriefly();
      setSelectedId(p.id);
      focusLatLng({ lat: p.lat, lng: p.lng }, FOCUS_ZOOM);
    },
    [focusLatLng, suppressMapClickBriefly, setSelectedId],
  );

  const handleClusterClick = useCallback(
    (cluster: any) => {
      suppressMapClickBriefly();

      const map = mapRef.current;
      if (!map) return;

      const center = cluster.getCenter?.();
      if (!center) return;

      const pos = { lat: center.lat(), lng: center.lng() };
      const currentZoom = map.getZoom() ?? DEFAULT_ZOOM;

      // zoom in a bit (custom behavior)
      focusLatLng(pos, Math.min(currentZoom + CLUSTER_ZOOM_BUMP, MAX_FIT_ZOOM));
    },
    [focusLatLng, suppressMapClickBriefly],
  );

  const handleMapClick = useCallback(() => {
    if (suppressMapClickRef.current) return;

    setSelectedId(null);
    setIsFocused(false);
    fitToPoints();
  }, [fitToPoints]);

  const handleUnMount = useCallback(() => {
    mapRef.current = null;
  }, [mapRef]);

  const handleOnLoad = useCallback(
    (map: any) => {
      mapRef.current = map;
      fitToPoints();
    },
    [fitToPoints, mapRef],
  );

  return (
    <GoogleMap
      mapContainerClassName="w-full h-full"
      mapContainerStyle={containerStyle}
      center={DEFAULT_CENTER}
      zoom={DEFAULT_ZOOM}
      onLoad={handleOnLoad}
      onUnmount={handleUnMount}
      onClick={handleMapClick}
      options={{
        clickableIcons: false, // prevents Google's default POI popups
      }}
    >
      <MarkerClusterer
        onClick={handleClusterClick}
        options={{
          zoomOnClick: false, // we zoom manually in handleClusterClick
        }}
      >
        {(clusterer) => (
          <>
            {points.map((p) => (
              <MapsMarker
                key={p.id}
                point={p}
                onClick={handleMarkerClick}
                clusterer={clusterer}
              />
            ))}

            {selectedPoint && (
              <MapsInfoWindow
                selectedPoint={selectedPoint}
                setSelectedId={setSelectedId}
              />
            )}
          </>
        )}
      </MarkerClusterer>
    </GoogleMap>
  );
}
