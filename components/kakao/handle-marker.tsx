"use client";
import { MapMarker, useMap } from "react-kakao-maps-sdk";

const EventMarkerContainer = ({ position, emotion }: { position: { lat: number; lng: number }; emotion: number }) => {
  const map = useMap();
  const onClick = (marker) => {
    map.panTo(marker.getPosition());
  };
  return (
    <MapMarker
      position={position} // 마커를 표시할 위치
      // @ts-ignore
      onClick={(marker) => onClick(marker, position)}
      image={{
        src: `/emotion${emotion}.svg`,
        size: {
          width: 50,
          height: 50,
        },
        options: {
          offset: {
            x: 27,
            y: 69,
          },
        },
      }}
    ></MapMarker>
  );
};

export default EventMarkerContainer;
