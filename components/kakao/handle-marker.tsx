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
import { MapMarker, useMap } from "react-kakao-maps-sdk";
import { useSetRecoilState } from "recoil";

const windowWidth = typeof window !== "undefined" ? window.innerWidth : 0;
const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

const EventMarkerContainer = ({
  type,
  position,
  emotion,
  setPosition,
}: {
  type: string;
  position: Latlng;
  emotion?: number;
  setPosition?: React.Dispatch<React.SetStateAction<LatLng>>;
}) => {
  const map = useMap();
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
    setTransform(Math.max(-sheetHeight - 100, -windowHeight * 0.8) + 80);
    setHeight(Math.min(sheetHeight + 100, windowHeight * 0.8));
  };

  const handleClick = (marker: any, type: string) => {
    setAddMode(false);
    if (type !== "search") {
      setIsEmotionAddMarker(false);
      setIsActBottomSheet(true);
      if (windowWidth < 1024) setBottomSheet();
    } else {
      // @ts-ignore
      const { Ma: lat, La: lng } = map.getCenter();
      map.panTo(marker.getPosition());
      if (setPosition) setPosition({ lat, lng });
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
