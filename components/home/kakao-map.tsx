"use client";
import Script from "next/script";
import { Map } from "react-kakao-maps-sdk";
import { Pin } from "./get-markers";
import EventMarkerContainer from "./handle-marker";
import { useState } from "react";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

const KakaoMap = ({ data }: { data: Pin[] }) => {
  const [bounds, setBounds] = useState();
  const positions = data.map((marker) => ({
    content: marker.content,
    latlng: {
      lat: marker.gps.lat,
      lng: marker.gps.lng,
    },
    created_at: marker.created_at,
  }));
  // console.log(bounds);

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: 37.51112, lng: 127.095973 }}
        style={{ width: "100vw", height: "100vh" }}
        onBoundsChanged={(map) => {
          const bounds = map.getBounds();
          var swLatLng = bounds.getSouthWest();
          // 영역의 북동쪽 좌표를 얻어옵니다
          var neLatLng = bounds.getNorthEast();

          setBounds(bounds);
          const { ha: leftLat, qa: leftLng, oa: rightLat, pa: rightLng } = map.getBounds();
          // positions.map((item) =>
          // console.log(
          //   item.latlng.lat
          // ),
          // );
          // console.log(item.latlng.lat, item.latlng.lng)
        }}
      >
        {positions.map((marker) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${marker.latlng.lat}-${marker.latlng.lng}-${marker["created_at"]}`}
            position={marker.latlng}
            content={marker.content}
            bounds={bounds}
          />
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;

/**
 * 
남서 (37.54647193403319, 127.08087529385593)
북동 (37.549861932026396, 127.0902150592132)

범위 내 O : {"lat": "37.549139", "lng": "127.081857"}
범위 내 X : {"lat": "37.511082", "lng": "127.093967"}
 * 
 */
