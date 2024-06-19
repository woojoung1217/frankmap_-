import getMarkers from "@/components/home/get-markers";
import KakaoMap from "@/components/home/kakao-map";
import BottomSheet from "@/components/bottomSheet/bottomSheet";
import EmotionList from "@/components/home/emotion-list";
import "@/app/(home)/home.scss";

const Home = async () => {
  const data = await getMarkers();
  return (
    <div className="map">
      <KakaoMap data={data} />
      <BottomSheet>
        <EmotionList />
      </BottomSheet>
    </div>
  );
};

export default Home;
