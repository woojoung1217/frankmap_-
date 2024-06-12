import getMarkers from "@/components/home/get-markers";
import KakaoMap from "@/components/home/kakao-map";
import "./home.scss";

const Home = async () => {
  const data = await getMarkers();
  const emotionLists = data.map((post) => (
    <li key={post.created_at}>
      <img src={`/emotion${post.emotion}.svg`} alt={`${post.emotion}`} />
      <span className="location">{post.location}</span>
      <span className="date">{post.date}</span>
      <p className="content">{post.content}</p>
    </li>
  ));

  return (
    <div className="map">
      <KakaoMap data={data} />
      <div className="bottomSheet">
        <ul>{emotionLists}</ul>
      </div>
    </div>
  );
};

export default Home;
