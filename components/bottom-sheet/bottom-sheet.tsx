"use client";
import "@/components/bottom-sheet/bottom-sheet.scss";
import { useRef, useEffect, useState } from "react";

interface BottomSheetMetrics {
  touchStart: {
    sheetY: number;
    touchY: number;
  };
  touchMove: {
    prevTouchY?: number;
    movingDirection: "none" | "down" | "up";
  };
  isContentAreaTouched: boolean;
}

const BottomSheet = ({ children }: { children: React.ReactNode }) => {
  const MIN_Y = 60;
  const MAX_Y = window.innerHeight - 160;
  const BOTTOM_SHEET_HEIGHT = window.innerHeight - MIN_Y;
  const sheet = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const metrics = useRef<BottomSheetMetrics>({
    touchStart: {
      sheetY: 0,
      touchY: 0,
    },
    touchMove: {
      prevTouchY: 0,
      movingDirection: "none",
    },
    isContentAreaTouched: false,
  });

  useEffect(() => {
    const canUserMoveBottomSheet = () => {
      const { touchMove, isContentAreaTouched } = metrics.current;
      if (!isContentAreaTouched) return true;
      if (sheet.current!.getBoundingClientRect().y !== MIN_Y) return true;
      if (touchMove.movingDirection === "down") return content.current!.scrollTop <= 0;
      return false;
    };

    const handleTouchStart = (e: TouchEvent) => {
      const { touchStart } = metrics.current;
      touchStart.sheetY = sheet.current!.getBoundingClientRect().y;
      touchStart.touchY = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const { touchStart, touchMove } = metrics.current;
      const currentTouch = e.touches[0];

      if (touchMove.prevTouchY === undefined) touchMove.prevTouchY = touchStart.touchY;
      // 맨 처음 앱 시작하고 시작시
      if (touchMove.prevTouchY === 0) touchMove.prevTouchY = touchStart.touchY;
      if (touchMove.prevTouchY < currentTouch.clientY) touchMove.movingDirection = "down";
      if (touchMove.prevTouchY > currentTouch.clientY) touchMove.movingDirection = "up";

      if (canUserMoveBottomSheet()) {
        e.preventDefault();
        const touchOffset = currentTouch.clientY - touchStart.touchY;
        let nextSheetY = touchStart.sheetY + touchOffset;
        if (nextSheetY <= MIN_Y) nextSheetY = MIN_Y;
        if (nextSheetY >= MAX_Y) nextSheetY = MAX_Y;
        sheet.current!.style.setProperty("transform", `translateY(${nextSheetY - MAX_Y}px)`); //바닥 만큼은 빼야한다
      } else {
        document.body.style.overflowY = "hidden";
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      document.body.style.overflowY = "auto"; //스크롤 설정
      const { touchMove } = metrics.current;
      const currentSheetY = sheet.current!.getBoundingClientRect().y;

      if (currentSheetY !== MIN_Y) {
        if (touchMove.movingDirection === "down") {
          sheet.current!.style.setProperty("transform", "translateY(0)");
        }
        if (touchMove.movingDirection === "up") {
          sheet.current!.style.setProperty("transform", `translateY(${MIN_Y - MAX_Y}px)`);
        }
      }

      // metrics 초기화.
      metrics.current = {
        touchStart: {
          sheetY: 0,
          touchY: 0,
        },
        touchMove: {
          prevTouchY: 0,
          movingDirection: "none",
        },
        isContentAreaTouched: false,
      };
    };

    sheet.current!.addEventListener("touchstart", handleTouchStart);
    sheet.current!.addEventListener("touchmove", handleTouchMove);
    sheet.current!.addEventListener("touchend", handleTouchEnd);
  }, []);

  useEffect(() => {
    const handleTouchStart = () => {
      metrics.current!.isContentAreaTouched = true;
    };
    content.current!.addEventListener("touchstart", handleTouchStart);
  }, []);

  const [isClicked, setIsClicked] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    if (e.type !== "click") return;
    setIsClicked(!isClicked);
  };

  return (
    <div className={`bottomSheet ${isClicked ? "is-clicked" : ""}`} style={{ height: BOTTOM_SHEET_HEIGHT }} ref={sheet}>
      <div className="handlebar" onClick={(e) => handleClick(e)}>
        <span className="hidden">핸들바</span>
      </div>
      <div className="contents" ref={content}>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
