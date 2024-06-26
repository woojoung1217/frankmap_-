import fetchData from "@/libs/fetch-record";
import KakaoMap from "@/components/kakao/kakao-map";
import BottomSheet from "@/components/bottom-sheet/bottom-sheet";
import BottomSheetCont from "@/components/bottom-sheet/bottom-sheet-cont";
import "@/app/(home)/home.scss";

const Home = async () => {
  const data = await fetchData();
  return (
    <div className="map">
      <KakaoMap data={data} />
      <BottomSheet>
        <BottomSheetCont />
      </BottomSheet>
    </div>
  );
};

export default Home;
