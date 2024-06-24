"use client";
import { Dispatch, SetStateAction } from "react";
import { MapMarker, useMap } from "react-kakao-maps-sdk";

const EventMarkerContainer = ({
  type,
  position,
  emotion,
  setIsShowCenter,
}: {
  type: string;
  position: Latlng;
  emotion?: number;
  setIsShowCenter: Dispatch<SetStateAction<boolean>>;
}) => {
  const map = useMap();
  const handleClick = (marker, position: Latlng) => {
    map.panTo(marker.getPosition());
    console.log(position);
    setIsShowCenter(false);
  };
  const handleAdd = (position: Latlng) => {
    console.log(position);
  };

  return (
    <>
      {type === "center" ? (
        // 지도 중심 좌표 마커
        <MapMarker
          zIndex={99999}
          position={position} // 마커를 표시할 위치
          onClick={() => handleAdd(position)}
          image={{
            src: `/icon-marker.svg`,
            size: {
              width: 28,
              height: 40,
            },
            options: {
              offset: {
                x: 14,
                y: 20,
              },
            },
          }}
        />
      ) : (
        // 기본, 검색 시 마커
        <MapMarker
          position={position} // 마커를 표시할 위치
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
        />
      )}
    </>
  );
};

export default EventMarkerContainer;
