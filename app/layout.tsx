import RecoilRootWrapper from "@/components/recoil-wrapper";
import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "@/styles/reset.css";
import "@/styles/variable.css";
import "@/styles/common.css";
import "@/styles/responsible.css";

export const noto_Sans_KR = Noto_Sans_KR({
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "솔직할지도",
  description: "지역 기반 감정 일기 by next",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" href="" />
      </head>
      <body className={noto_Sans_KR.variable}>
        <RecoilRootWrapper>
          <header></header>
          <main className="containerLayout">{children}</main>
          <footer></footer>
        </RecoilRootWrapper>
      </body>
    </html>
  );
}
