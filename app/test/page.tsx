"use client";

import Button from "@/components/button";

const Test = () => {
  const handleClick = () => {
    console.log("버튼 테스트");
  };

  return (
    <div>
      <Button size="normal" color="secondary" handleClick={handleClick}>
        {/* <img src="/icon-image.svg" /> */}
        로그인 / 회원가입
      </Button>
    </div>
  );
};

export default Test;
