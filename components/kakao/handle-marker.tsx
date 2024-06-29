"use client";
import {
  addModeState,
  addStepState,
  emotionAddMarker,
  heightState,
  isActBottomSheetState,
  latlngState,
  transformState,
} from "@/atoms/atoms";
import { MapMarker } from "react-kakao-maps-sdk";
import { useSetRecoilState } from "recoil";

interface Latlng {
  lat: number;
  lng: number;
}

const EventMarkerContainer = ({ type, position, emotion }: { type: string; position: Latlng; emotion?: number }) => {
  const setAddMode = useSetRecoilState(addModeState);
  const setAddModeStep = useSetRecoilState(addStepState);
  const setLatlng = useSetRecoilState(latlngState);
  const setIsActBottomSheet = useSetRecoilState(isActBottomSheetState);
  const setTransform = useSetRecoilState(transformState);
  const setHeight = useSetRecoilState(heightState);
  const setIsEmotionAddMarker = useSetRecoilState(emotionAddMarker);

  const setBottomSheet = () => {
    const contentElement = document.querySelector(".bottomSheet .contents");
    const sheetHeight = contentElement?.clientHeight ?? 0;
    setTransform(Math.max(-sheetHeight - 100, -window.innerHeight * 0.8) + 80);
    setHeight(Math.min(sheetHeight + 100, window.innerHeight * 0.8));
  };

  const handleClick = (type: string) => {
    setAddMode(false);
    if (type !== "search") {
      setIsEmotionAddMarker(false);
      setIsActBottomSheet(true);
    } else {
      console.log("xxx");
    }
    if (window.innerWidth < 1024) setBottomSheet();
  };

  const handleAdd = (position: Latlng) => {
    setAddMode(true);
    setAddModeStep("step1");
    setLatlng(position);
    setIsActBottomSheet(true);
    if (window.innerWidth < 1024) setBottomSheet();
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
          onClick={() => handleClick(type)}
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
