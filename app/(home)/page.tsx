import KakaoMap from "@/components/kakao/kakao-map";
import BottomSheet from "@/components/bottom-sheet/bottom-sheet";
import BottomSheetCont from "@/components/bottom-sheet/bottom-sheet-cont";
import "@/app/(home)/home.scss";

const Home = () => {
  return (
    <div className="map">
      <KakaoMap />
      <BottomSheet>
        <BottomSheetCont />
      </BottomSheet>
    </div>
  );
};

export default Home;
