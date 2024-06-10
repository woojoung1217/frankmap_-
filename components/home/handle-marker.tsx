"use client";
import { MapMarker, useMap } from "react-kakao-maps-sdk";

type Position = {
  lat: number;
  lng: number;
};

const EventMarkerContainer = ({ position, content }: { position: Position; content: string }) => {
  const map = useMap();
  const onClick = (marker: any) => {
    map.panTo(marker.getPosition());
    console.log(position);
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
