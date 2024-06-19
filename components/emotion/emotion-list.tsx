"use client";
import { useRecoilValue } from "recoil";
import { FilteredData } from "../../atoms/atoms";

const EmotionList = () => {
  const handleClick = (post: RecordType) => {
    console.log(post);
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
  return <ul className="emotionLists">{data.length ? emotionLists : <p>감정을 기록해보세요. :)</p>}</ul>;
};

export default EmotionList;
