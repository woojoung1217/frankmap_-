import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Script
          strategy="beforeInteractive"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${"ad9016973c31a9e95d70517561c8215f"}&libraries=services&autoload=false`}
        ></Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
