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
import { useEffect, useState } from "react";
import { MapMarker } from "react-kakao-maps-sdk";
import { useSetRecoilState } from "recoil";

const windowWidth = typeof window !== "undefined" ? window.innerWidth : undefined;
const windowHeight = typeof window !== "undefined" ? window.innerHeight : undefined;

const EventMarkerContainer = ({
  type,
  position,
  emotion,
  idx,
  children,
}: {
  type: string;
  position: Latlng;
  emotion?: number;
  idx?: number;
  children?: Element;
}) => {
  const setAddMode = useSetRecoilState(addModeState);
  const setAddModeStep = useSetRecoilState(addStepState);
  const setLatlng = useSetRecoilState(latlngState);
  const setIsActBottomSheet = useSetRecoilState(isActBottomSheetState);
  const setTransform = useSetRecoilState(transformState);
  const setHeight = useSetRecoilState(heightState);
  const setIsEmotionAddMarker = useSetRecoilState(emotionAddMarker);
  const [selectedMarker, setSeleteMarker] = useState<number>();

  const setBottomSheet = () => {
    const contentElement = document.querySelector(".bottomSheet .contents");
    const sheetHeight = contentElement?.clientHeight ?? 0;
    setTransform(Math.max(-sheetHeight - 100, -windowHeight * 0.8) + 80);
    setHeight(Math.min(sheetHeight + 100, windowHeight * 0.8));
  };

  const handleClick = (e, idx: number, type: string) => {
    setAddMode(false);
    if (type !== "search") {
      setIsEmotionAddMarker(false);
      setIsActBottomSheet(true);
    } else {
      setSeleteMarker(undefined);
      if (!selectedMarker) setSeleteMarker(idx);
      // 클릭한 애 말고 전체 마커의 색상 변경 필요
    }
    if (windowWidth < 1024) setBottomSheet();
  };

  useEffect(() => {
    // 상태가 변경될 때마다 재랜더링하여 마커 이미지를 업데이트
  }, [selectedMarker]);

  const handleAdd = (position: Latlng) => {
    setAddMode(true);
    setAddModeStep("step1");
    setLatlng(position);
    setIsActBottomSheet(true);
    if (windowWidth < 1024) setBottomSheet();
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
          onClick={(e) => handleClick(e, idx, type)}
          image={{
            src:
              type === "default"
                ? `/emotion${emotion}.svg`
                : selectedMarker === idx
                  ? `/icon-marker-act.svg`
                  : `/icon-marker.svg`,
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
