"use client";
import { useRecoilValue } from "recoil";
import { FilteredData } from "../../atoms/atoms";
import { useModal } from "@/hooks/useModal";
import { useRouter } from "next/navigation";
import { RecordType } from "@/types/types";

const EmotionList = () => {
  const { openModal } = useModal();
  const router = useRouter();

  const handleClick = (post: RecordType) => {
    const modalData = {
      content: `
        <div className="recordModal">
          <img className="emotion" src="/emotion${post.emotion}.svg" alt="${post.emotion}" />
          <span className="date">${post.date}</span>
          ${post.image?.length ? `<img className="image" src="${post.image[0]}" alt={${post.image}} />` : ""}
          <p className="content">${post.content}</p>
        </div>
      `,
      button: "상세보기",
      callBack: () => router.push(`/emotion`),
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
