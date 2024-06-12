import KakaoMap from "@/components/kakao-map";
import { supabase } from "@/components/supabase";

export type Pin = {
  emotion: number;
  content: string;
  gps: {
    lat: number;
    lng: number;
  };
  date: string;
  location: string;
  image: string;
  created_at: string;
};

const getPins = async (): Promise<Pin[]> => {
  const { data } = await supabase.from("post").select("emotion, content, gps, date, location, image, created_at");
  if (!data) return [];
  return data;
};

const Home = async () => {
  const data = await getPins();
  const emotionLists = data.map((post) => (
    <li key={post.created_at}>
      <img src={`${post.emotion}`} alt={`${post.emotion}`} />
      <span className="location">{post.location}</span>
      <span className="date">{post.date}</span>
      <p className="content">{post.content}</p>
    </li>
  ));
  return (
    <>
      <KakaoMap data={data} />
      <div className="bottomSheet">
        <ul>{emotionLists}</ul>
      </div>
    </>
  );
};

export default Home;
