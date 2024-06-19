import React from "react";
import "./About.scss";

/** 프롭스 타입 정의 */
interface AboutMyEmotionProps {
  monthlyStats: { [key: number]: number };
  getCurrentMonthYear: () => string;
}

const AboutMyEmotion: React.FC<AboutMyEmotionProps> = ({ monthlyStats, getCurrentMonthYear }) => {
  // 감정 데이터 생성 매핑
  const emotionData = [
    { type: "행복", count: monthlyStats[1], color: "#000", imgSrc: "/emotion1.svg" },
    { type: "즐거움", count: monthlyStats[2], color: "#000", imgSrc: "/emotion2.svg" },
    { type: "설렘", count: monthlyStats[3], color: "#000", imgSrc: "/emotion3.svg" },
    { type: "슬픔", count: monthlyStats[4], color: "#000", imgSrc: "/emotion4.svg" },
    { type: "분노", count: monthlyStats[5], color: "#000", imgSrc: "/emotion5.svg" },
    { type: "걱정", count: monthlyStats[6], color: "#000", imgSrc: "/emotion6.svg" },
    { type: "놀라옴", count: monthlyStats[7], color: "#000", imgSrc: "/emotion7.svg" },
    { type: "창피함", count: monthlyStats[8], color: "#000", imgSrc: "/emotion8.svg" },
    { type: "무력감", count: monthlyStats[9], color: "#000", imgSrc: "/emotion9.svg" },
  ].sort((a, b) => b.count - a.count);

  // 가장 큰 감정 개수 찾기
  const maxEmotionCount = Math.max(...emotionData.map((emotion) => emotion.count));

  // 프로그레스 바 너비 계산
  const getProgressBarWidth = (emotionCount: number) => {
    if (emotionCount === 0) {
      return "0%";
    }
    return maxEmotionCount > 0 ? `${(emotionCount / maxEmotionCount) * 100 + 100}px` : "0%";
  };

  return (
    <div className="emotions">
      <div className="emotion-container">
        <div className="emotion-text-wrapper">
          <h1 className="emotiontext_h1">나는 요즘 어떤 기분일까?</h1>
          <p className="emotiontext_p">감정을 기록하고 한달 통계를 확인 해보세요!</p>
          <h3>{getCurrentMonthYear()} 감정 통계</h3>
        </div>
        <div className="emotions_sum">
          {emotionData.map((emotion, index) => (
            <div className="emotion-position" key={index}>
              <div className="emotion-stat">
                <img src={emotion.imgSrc} alt={emotion.type} className="emotion-size" />
                <div className="emotion-stat-position">
                  <p>
                    {emotion.type} {emotion.count}
                  </p>
                  <div className="progress-bar">
                    <div
                      className="progress-bar-fill"
                      style={{ width: getProgressBarWidth(emotion.count), backgroundColor: emotion.color }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMyEmotion;
