import React from "react";
import "./About.scss";

/** 프롭스 타입 정의 */
interface AboutMyEmotionProps {
  monthlyStats: { [key: number]: number };
  getCurrentMonthYear: () => string;
}

const AboutMyEmotion: React.FC<AboutMyEmotionProps> = ({ monthlyStats, getCurrentMonthYear }) => {
  const totalEmotions = monthlyStats[1] + monthlyStats[2] + monthlyStats[3];

  const getProgressBarWidth = (emotionCount: number) => {
    return totalEmotions > 0 ? `${(emotionCount / totalEmotions) * 100}%` : "0%";
  };

  // Combine emotion data into an array and sort by count in descending order
  const emotionData = [
    { type: "행복", count: monthlyStats[1], color: "#000", imgSrc: "/emotion1.svg" },
    { type: "분노", count: monthlyStats[2], color: "#000", imgSrc: "/emotion2.svg" },
    { type: "슬픔", count: monthlyStats[3], color: "#000", imgSrc: "/emotion3.svg" },
  ].sort((a, b) => b.count - a.count);

  return (
    <div className="emotions">
      <div className="emotion-container">
        <h1 className="emotiontext_h1">나는 요즘 어떤 기분일까?</h1>
        <p className="emotiontext_p">감정을 기록하고 한달 통계를 확인 해보세요!</p>
        <div className="emotions_sum">
          <h3>{getCurrentMonthYear()} 감정 통계</h3>
          {emotionData.map((emotion, index) => (
            <div key={index} className="emotion-stat">
              <img src={emotion.imgSrc} alt={emotion.type} />
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutMyEmotion;
