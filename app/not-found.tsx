"use client";

import "@/styles/not-found.css";
import Image from "next/image";
import errorImage from "../public/not-found.svg";
import Button from "@/components/button/button";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <>
      <div className="error-wrapper">
        <div className="error-cover">
          <Image priority className="error-image" src={errorImage} alt="에러 페이지" />
        </div>
        <div>
          <p className="error-message">
            알 수 없는 에러가 발생했어요.
            <br />
            잠시 후에 다시 시도해 주세요.
          </p>
          <Button handleClick={handleClick}>뒤로 가기</Button>
        </div>
      </div>
    </>
  );
};

export default NotFound;
