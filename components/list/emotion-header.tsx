"use-client";

import { usePathname, useRouter } from "next/navigation";
import "@/components/list/emotion-header.scss";
import { useModal } from "@/hooks/useModal";

interface EmotionHeaderProp {
  onMonthChange: (month: string) => void;
}

const EmotionHeader: React.FC<EmotionHeaderProp> = ({ onMonthChange }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { openModal } = useModal();

  const date = new Date();
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const formattedMonth = `${year}-${month}`;

  const handleBack = () => {
    router.back();
  };

  // TODO: user 받아와서 채우기!
  const modalData = {
    title: "전희선",
    content: "designh2sun@gmail.com",
    callBack: () => {}, // 로그아웃 버튼 클릭 이벤트 작성
  };

  return (
    <div className="emotion-header">
      <div className="header-content">
        {/* <button onClick={handleBack} className="button-back">
          <span className="hidden">뒤로가기</span>
        </button> */}
        {pathname === "/emotion" && (
          <input
            type="month"
            defaultValue={formattedMonth}
            className="select-month"
            onChange={(e) => onMonthChange(e.target.value)}
          />
        )}
        {/* <button onClick={() => openModal(modalData)} className="Button-userInfo">
          <span className="hidden">회원정보</span>
        </button> */}
      </div>
    </div>
  );
};

export default EmotionHeader;
