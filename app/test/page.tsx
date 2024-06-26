"use client";

import Button from "@/components/button/button";
import Input from "@/components/input/input";

const Test = () => {
  const handleClick = () => {
    console.log("버튼 테스트");
  };

  return (
    <div>
      <Button size="normal" color="primary" handleClick={handleClick} imgUrl="/icon-image.svg">
        로그인 / 회원가입
      </Button>

      <label htmlFor="email">이메일</label>
      <Input id="email" type="email" placeholder="이메일을 입력하세요" size="full" />
    </div>
  );
};

export default Test;
