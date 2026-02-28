import { useCallback } from "react";
import { Marker } from "@react-google-maps/api";
import type { GoogleMapPoint } from "../../types/GoogleMapPoint.tsx";

const MapsMarker = ({
  point,
  onClick,
  clusterer,
}: {
  point: GoogleMapPoint;
  onClick: any;
  clusterer: any;
}) => {
  const handleMarkerClick = useCallback(() => {
    return onClick(point);
  }, [onClick, point]);

  return (
    <Marker
      key={point.id}
      position={{ lat: point.lat, lng: point.lng }}
      clusterer={clusterer}
      onClick={handleMarkerClick}
    />
  );
};

export default MapsMarker;
