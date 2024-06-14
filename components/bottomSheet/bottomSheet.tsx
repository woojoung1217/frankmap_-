"use client";
import "@/components/bottomSheet/bottomSheet.scss";
import { useState } from "react";

// https://blog.mathpresso.com/bottom-sheet-for-web-55ed6cc78c00
const BottomSheet = ({ children }: { children: React.ReactNode }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleMove = (e: React.UIEvent) => {
    setIsClicked(!isClicked);
  };

  return (
    <div className={`bottomSheet ${isClicked ? "is-act" : ""}`} onTouchStart={handleMove}>
      <div className="handlebar">
        <span className="hidden">핸들바</span>
      </div>
      <div className="contents">{children}</div>
    </div>
  );
};

export default BottomSheet;
