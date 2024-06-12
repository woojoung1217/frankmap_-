"use client";

import Button from "@/components/button";
import "@/components/button.scss";

const Test = () => {
  const handleClick = () => {
    console.log("버튼 테스트");
  };

  return (
    <div>
      <Button handleClick={handleClick}>버튼 테스트</Button>
    </div>
  );
};

export default Test;
