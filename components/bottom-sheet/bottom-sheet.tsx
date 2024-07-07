"use client";
import { bottomSheetStyleState, isActBottomSheetState } from "@/atoms/atoms";
import "@/components/bottom-sheet/bottom-sheet.scss";
import { useRef, useEffect } from "react";
import { useRecoilState } from "recoil";

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
const windowHeight = typeof window !== "undefined" ? window.innerHeight : 0;

const BottomSheet = ({ children }: { children: React.ReactNode }) => {
  const [isAct, setIsAct] = useRecoilState(isActBottomSheetState);
  const [bottomSheetStyle, setBottomSheetStyle] = useRecoilState(bottomSheetStyleState);
  const MIN_Y = 80;
  const MAX_Y = windowHeight - 160;
  const docHeight = 60;
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
      const contentEl = content.current!;
      if (touchMove.movingDirection === "down" && contentEl.scrollTop <= 0) return true;
      if (touchMove.movingDirection === "up" && contentEl.scrollTop + contentEl.clientHeight >= contentEl.scrollHeight)
        return true;
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
      const height = content.current!.clientHeight;

      if (touchMove.prevTouchY === undefined) touchMove.prevTouchY = touchStart.touchY;
      // 맨 처음 앱 시작하고 시작시
      if (touchMove.prevTouchY === 0) touchMove.prevTouchY = touchStart.touchY;
      if (touchMove.prevTouchY < currentTouch.clientY) touchMove.movingDirection = "down";
      if (touchMove.prevTouchY > currentTouch.clientY) touchMove.movingDirection = "up";

      if (canUserMoveBottomSheet()) {
        if (height < content.current!.clientHeight) {
          e.preventDefault();
          const touchOffset = currentTouch.clientY - touchStart.touchY;
          let nextSheetY = touchStart.sheetY + touchOffset;
          if (nextSheetY <= MIN_Y) nextSheetY = MIN_Y;
          if (nextSheetY >= MAX_Y) nextSheetY = MAX_Y;
          setBottomSheetStyle({ transform: nextSheetY - MAX_Y, height });
          setIsAct(true);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const { touchMove } = metrics.current;
      const currentSheetY = sheet.current!.getBoundingClientRect().y;
      const height = content.current!.clientHeight + docHeight + 20;
      if (currentSheetY !== MIN_Y) {
        if (!sheet.current!.scrollTop && touchMove.movingDirection === "down") {
          setBottomSheetStyle({ transform: 0, height });
          setIsAct(false);
        }
        if (touchMove.movingDirection === "up") {
          setBottomSheetStyle({
            transform: Math.max(-height, -windowHeight * 0.8) + docHeight,
            height: Math.min(height, windowHeight * 0.8),
          });
          setIsAct(true);
        }
      }

      // metrics 초기화
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

  const handleClick = (e: React.MouseEvent) => {
    if (e.type !== "click") return;
    setIsAct(!isAct);
  };

  return (
    <div
      className={`bottomSheet ${isAct ? "is-act" : ""}`}
      ref={sheet}
      style={{ transform: `translateY(${bottomSheetStyle.transform}px)`, height: `${bottomSheetStyle.height}px` }}
    >
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
