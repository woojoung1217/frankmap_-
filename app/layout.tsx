import type { Metadata } from "next";

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
      <body>{children}</body>
    </html>
  );
}
