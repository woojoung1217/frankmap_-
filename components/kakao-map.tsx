import Script from "next/script";
import { Map } from "react-kakao-maps-sdk";

const KAKAO_SDK_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APP_JS_KEY}&autoload=false`;

const KakaoMap = () => {
  return (
    <>
      <Script src={KAKAO_SDK_URL} strategy="beforeInteractive" />
      <Map center={{ lat: 33.450701, lng: 126.570667 }} style={{ width: "100vw", height: "100vh" }}></Map>
    </>
  );
};

export default KakaoMap;
