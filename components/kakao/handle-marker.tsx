"use client";
import { MapMarker, useMap } from "react-kakao-maps-sdk";

const EventMarkerContainer = ({
  type,
  position,
  emotion,
}: {
  type: string;
  position: { lat: number; lng: number };
  emotion?: number;
}) => {
  const map = useMap();
  const handleClick = (marker, position: { lat: string; lng: string }) => {
    map.panTo(marker.getPosition());
    console.log(position);
  };

  return (
    <MapMarker
      position={position} // 마커를 표시할 위치
      // @ts-ignore
      onClick={(marker) => handleClick(marker, position)}
      image={{
        src: type === "default" ? `/emotion${emotion}.svg` : `/icon-marker.svg`,
        size: {
          width: type === "default" ? 50 : 28,
          height: type === "default" ? 50 : 40,
        },
        options: {
          offset: {
            x: type === "default" ? 25 : 14,
            y: type === "default" ? 25 : 20,
          },
        },
      }}
    ></MapMarker>
  );
};

export default EventMarkerContainer;
