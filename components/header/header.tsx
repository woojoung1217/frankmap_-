"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "./header.scss";

const Header = () => {
  const pathname = usePathname();
  const [isPC, setIsPC] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsPC(window.innerWidth >= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header className="header">
      <div className="home">
        <Link href={"/"}>
          <img src={pathname === "/" ? "/home_black.svg" : "/home_gray.svg"} alt="홈" />
          <h1>홈</h1>
        </Link>
      </div>

      <div className="group">
        <div className="calendar">
          <Link href={"/calendar"}>
            <img src={pathname === "/calendar" ? "/calendar_black.svg" : "/calendar_gray.svg"} alt="캘린더" />
            <h1>캘린더</h1>
          </Link>
        </div>

        <div className="emotion">
          <Link href={"/emotion"}>
            <img src={pathname === "/emotion" ? "/list_black.svg" : "/list_gray.svg"} alt="감정기록" />
            <h1>감정기록</h1>
          </Link>
        </div>

        {isPC && <div className="profile">프로필</div>}
      </div>
    </header>
  );
};

export default Header;
