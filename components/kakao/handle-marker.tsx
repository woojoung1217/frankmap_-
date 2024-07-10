"use client";
import {
  addModeState,
  addStepState,
  bottomSheetStyleState,
  emotionAddMarker,
  isActBottomSheetState,
  latlngState,
} from "@/atoms/atoms";
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { useSetRecoilState } from "recoil";
import { Latlng } from "@/types/types";

const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

const EventMarkerContainer = ({
  type,
  position,
  emotion,
  setCenterMarker,
}: {
  type: string;
  position: Latlng;
  emotion?: number;
  setCenterMarker?: React.Dispatch<React.SetStateAction<Latlng>>;
}) => {
  const map = useMap();
  const setAddMode = useSetRecoilState(addModeState);
  const setAddModeStep = useSetRecoilState(addStepState);
  const setLatlng = useSetRecoilState(latlngState);
  const setIsActBottomSheet = useSetRecoilState(isActBottomSheetState);
  const setBottomSheetStyle = useSetRecoilState(bottomSheetStyleState);
  const setIsEmotionAddMarker = useSetRecoilState(emotionAddMarker);

  const setBottomSheet = () => {
    const contentElement = document.querySelector(".bottomSheet .contents");
    const sheetHeight = contentElement?.clientHeight ?? 0;
    setBottomSheetStyle({
      transform: Math.max(-sheetHeight - 100, -windowHeight * 0.8) + 80,
      height: Math.min(sheetHeight + 100, windowHeight * 0.8),
    });
  };

  const handleClick = (marker: kakao.maps.Marker, type: string) => {
    if (type !== "search") {
      setAddMode(false);
      setIsEmotionAddMarker(false);
      setIsActBottomSheet(true);
      if (windowWidth < 1024) setBottomSheet();
    } else {
      // @ts-ignore
      const { Ma: lat, La: lng } = marker.getPosition();
      setAddMode(true);
      setLatlng({ lat, lng });
      map.panTo(marker.getPosition());
      setIsEmotionAddMarker(true);
      if (setCenterMarker) setCenterMarker({ lat, lng });
    }
  };

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
            src: `/icon-marker-act.svg`,
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
          onClick={(marker) => handleClick(marker, type)}
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
