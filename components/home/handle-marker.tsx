"use client";
import { MapMarker, useMap } from "react-kakao-maps-sdk";

const EventMarkerContainer = ({ position, content }: { position: { lat: number; lng: number }; content: string }) => {
  const map = useMap();
  const onClick = (marker) => {
    map.panTo(marker.getPosition());
  };
  return (
    <MapMarker
      position={position} // 마커를 표시할 위치
      // @ts-ignore
      onClick={(marker) => onClick(marker, position)}
    >
      {content}
    </MapMarker>
  );
};

export default EventMarkerContainer;
