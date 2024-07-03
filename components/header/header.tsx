// Header.tsx

"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useModal } from "@/hooks/useModal";
import "./header.scss";

const Header = () => {
  const pathname = usePathname();
  const [isPC, setIsPC] = useState<boolean>(false);
  const { openModal } = useModal();

  useEffect(() => {
    const handleResize = () => {
      setIsPC(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // 모달에 전달할 데이터 예시
  const modalData = {
    title: "회원정보",
    content: "<p>여기에 회원정보를 입력하세요.</p>",
    button: "확인",
    callBack: () => {
      console.log("모달 확인 버튼 클릭");
    },
    emoticon: "😊",
  };

  return (
    <header className="header">
      <div className="home">
        <Link href={"/"}>
          <img src={pathname === "/" ? "/home_blue.svg" : "/home_black.svg"} alt="홈" />
          <h1>홈</h1>
        </Link>
        {/* 모바일에서만 보이는 프로필 */}
        <Link href={"/"}>
          <img src={pathname === "/" ? "/home_blue.svg" : "/home_black.svg"} alt="홈" />
          <h1>홈</h1>
        </Link>
      </div>

      <div className="group">
        <div className="calendar">
          <Link href={"/calendar"}>
            <img src={pathname === "/calendar" ? "/calendar_blue.svg" : "/calendar_black.svg"} alt="캘린더" />
            <h1>캘린더</h1>
          </Link>
        </div>
        <div className="emotion">
          <Link href={"/emotion"}>
            <img src={pathname === "/emotion" ? "/emotion_blue.svg" : "/emotion_black.svg"} alt="감정기록" />
            <h1>감정기록</h1>
          </Link>
        </div>
        {/* pc에서만 보이는 프로필 */}
        <button onClick={() => openModal(modalData)} className="Button-userInfo">
          <span className="hidden">회원정보</span>
        </button>
      </div>
    </header>
  );
};

export default Header;
