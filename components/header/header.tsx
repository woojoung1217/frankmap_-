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
    <>
      {/* 홈, 캘린더, 감정기록, 프로필 묶기 - pc용 mobile용 따로 css 주기, pc버전에서는 프로필 hidden처리
      mobile에서만 보이는 로고,프로필 - pc에서는 숨기기 */}
      <header className="header">
        <div className="header_PC">
          <div className="calendar_PC">
            <Link href={"/calendar"}>
              <img src={pathname === "/calendar" ? "/calendar_black.svg" : "/calendar_gray.svg"} alt="캘린더" />
              <h1>캘린더</h1>
            </Link>
          </div>
          <div className="home_PC">
            <Link href={"/"}>
              <img src={pathname === "/" ? "/home_black.svg" : "/home_gray.svg"} alt="홈" />
              <h1>홈</h1>
            </Link>
          </div>
          <div className="emotion_PC">
            <Link href={"/emotion"}>
              <img src={pathname === "/emotion" ? "/emotion_black.svg" : "/emotion_gray.svg"} alt="감정기록" />
              <h1>감정기록</h1>
            </Link>
          </div>
          <button className="profile_PC">
            <img src="icon-user.svg" onClick={() => openModal(modalData)} alt="프로필" />
          </button>
        </div>
        {/* ------------모바일에만 보이는 header / 로고 이미지 & 유저 프로필 / pc버전에서 사라져야함--------------- */}
        <div className="header_MO">
          <div className="home_MO">
            <Link href={"/"}>
              <img src="emotion1-folded.svg" alt="홈" />
            </Link>
          </div>

          <button className="profile_MO">
            <img src="icon-user.svg" onClick={() => openModal(modalData)} alt="프로필" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
