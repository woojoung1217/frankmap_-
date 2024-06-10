"use client";
import Script from "next/script";
import { Map } from "react-kakao-maps-sdk";
import { Pin } from "./get-markers";
import EventMarkerContainer from "./handle-marker";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_JS_KEY}&autoload=false`;

const KakaoMap = ({ data }: { data: Pin[] }) => {
  const positions = data.map((marker) => ({
    content: marker.content,
    latlng: {
      lat: marker.gps.lat,
      lng: marker.gps.lng,
    },
    created_at: marker.created_at,
  }));

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map
        center={{ lat: 37.51112, lng: 127.095973 }}
        style={{ width: "100vw", height: "100vh" }}
        onBoundsChanged={(map) => {
          const bounds = map.getBounds();
          console.log("남서", bounds.getSouthWest().toString());
          console.log("북동", bounds.getNorthEast().toString());
        }}
      >
        {positions.map((marker) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${marker.latlng.lat}-${marker.latlng.lng}-${marker["created_at"]}`}
            position={marker.latlng}
            content={marker.content}
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
