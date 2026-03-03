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
import "./index.css";

const containerStyle = { width: "100%", height: "100%" };

// Large suppression window to catch all ghost clicks after cluster/marker taps on mobile.
// Mobile can fire a delayed map click up to ~2s after a touch interaction.
const MAP_CLICK_SUPPRESS_MS = 2500;

export default function Map({ data }: { data: Incident[] }) {
  const mapRef = useRef<google.maps.Map | null>(null);

  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [isFocused, setIsFocused] = useState(false);

  // Mirror isFocused in a ref so callbacks always see the latest value without stale closures
  const isFocusedRef = useRef(false);

  // Timestamp of the last marker/cluster interaction (mobile can fire a late map click after this)
  const lastOverlayInteractionAtRef = useRef<number>(0);

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

  const setFocused = useCallback((value: boolean) => {
    isFocusedRef.current = value;
    setIsFocused(value);
  }, []);

  const markOverlayInteraction = useCallback(() => {
    lastOverlayInteractionAtRef.current = Date.now();
  }, []);

  const focusLatLng = useCallback(
    (pos: google.maps.LatLngLiteral, zoom: number) => {
      const map = mapRef.current;
      if (!map) return;

      setFocused(true);
      map.panTo(pos);
      map.setZoom(zoom);
    },
    [setFocused],
  );

  const handleMarkerClick = useCallback(
    (p: { id: number; lat: number; lng: number }) => {
      markOverlayInteraction();
      setSelectedId(p.id);
      focusLatLng({ lat: p.lat, lng: p.lng }, FOCUS_ZOOM);
    },
    [focusLatLng, markOverlayInteraction],
  );

  const handleClusterClick = useCallback(
    (cluster: any) => {
      markOverlayInteraction();

      const map = mapRef.current;
      if (!map) return;

      const center = cluster.getCenter?.();
      if (!center) return;

      const pos = { lat: center.lat(), lng: center.lng() };
      const currentZoom = map.getZoom() ?? DEFAULT_ZOOM;

      focusLatLng(pos, Math.min(currentZoom + CLUSTER_ZOOM_BUMP, MAX_FIT_ZOOM));

      // Re-stamp AFTER the zoom animation finishes so any trailing ghost map click
      // from the animation is still within the suppression window.
      window.google.maps.event.addListenerOnce(map, "idle", () => {
        markOverlayInteraction();
      });
    },
    [focusLatLng, markOverlayInteraction],
  );

  const handleMapClick = useCallback(() => {
    const now = Date.now();

    // Suppress ghost clicks that fire shortly after a marker/cluster tap on mobile.
    // This also catches the delayed map click that fires after cluster zoom animations.
    if (now - lastOverlayInteractionAtRef.current < MAP_CLICK_SUPPRESS_MS) {
      return;
    }

    setSelectedId(null);
    setFocused(false);
    fitToPoints();
  }, [fitToPoints, setFocused]);

  const handleUnMount = useCallback(() => {
    mapRef.current = null;
  }, []);

  const handleOnLoad = useCallback(
    (map: google.maps.Map) => {
      mapRef.current = map;
      fitToPoints();
    },
    [fitToPoints],
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
        clickableIcons: false,
        disableDoubleClickZoom: true,
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
