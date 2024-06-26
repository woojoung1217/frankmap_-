"use client";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { FilteredData } from "../../atoms/atoms";
import { useModal } from "@/hooks/useModal";

const EmotionList = () => {
  const { openModal } = useModal();

  const handleClick = (post: RecordType) => {
    const modalData = {
      title: `<img src={/emotion${post.emotion}.svg} alt={${post.emotion}} />`,
      content: `
        <p>${post.date}</p>
        <img src={${post.image}} alt={${post.emotion}} />
      `,
      button: "상세보기",
      callback: () => {}, // 로그아웃 버튼 클릭 이벤트 작성
    };
    openModal(modalData);
  };
  const data = useRecoilValue(FilteredData);

  const emotionLists = data.map((post) => (
    <li key={post.created_at} onClick={() => handleClick(post)}>
      <img src={`/emotion${post.emotion}.svg`} alt={`${post.emotion}`} />
      <div className="r-wr">
        <div className="t-wr">
          <span className="location">{post.location}</span>
          <span className="date">{post.date}</span>
        </div>
        <div className="b-wr">
          <p className="content">{post.content}</p>
        </div>
      </div>
    </li>
  ));
  return (
    <>
      <ul className="emotionLists">{data.length ? emotionLists : <p>감정을 기록해보세요. :)</p>}</ul>
    </>
  );
};

export default EmotionList;
