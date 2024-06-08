import Script from "next/script";
import { Map } from "react-kakao-maps-sdk";
import EventMarkerContainer from "./marker-click";

type Pin = {
  emotion: number;
  content: string;
  gps: {
    lat: number;
    lng: number;
  };
  date: string;
  location: string;
  image: string;
};

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_JS_KEY}&autoload=false`;

const KakaoMap = ({ data }: { data: Pin[] }) => {
  const positions = data.map((marker) => ({
    content: marker.content,
    latlng: {
      lat: marker.gps.lat,
      lng: marker.gps.lng,
    },
  }));

  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map center={{ lat: 37.51112, lng: 127.095973 }} style={{ width: "100vw", height: "50vh" }}>
        {positions.map((marker) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${marker.latlng.lat}-${marker.latlng.lng}`}
            position={marker.latlng}
            content={marker.content}
          />
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
