"use client";
import { MapMarker, useMap } from "react-kakao-maps-sdk";

const EventMarkerContainer = ({
  position,
  content,
  bounds,
}: {
  position: { lat: number; lng: number };
  content: string;
  bounds: object;
}) => {
  const map = useMap();
  // console.log(bounds);
  const onClick = (marker: any) => {
    map.panTo(marker.getPosition());
    console.log(position, bounds);
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
