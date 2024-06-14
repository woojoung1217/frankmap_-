import getMarkers from "@/components/home/get-markers";
import KakaoMap from "@/components/home/kakao-map";
import BottomSheet from "@/components/bottomSheet/bottomSheet";
import "@/app/(home)/home.scss";

const Home = async () => {
  const data = await getMarkers();
  const emotionLists = data.map((post) => (
    <li key={post.created_at}>
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
    <div className="map">
      <KakaoMap data={data} />
      <BottomSheet>
        <ul className="emotionLists">{emotionLists}</ul>
      </BottomSheet>
    </div>
  );
};

export default Home;
