"use client";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKakaoLoader";
import EventMarkerContainer from "./handle-marker";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FilteredData } from "../../atoms/atoms";
import GetGeolocation from "./get-geolocation";

const throttle = (callback: (arg: string) => void, delay: number) => {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return function (...args: any[]): void {
    if (!timer) {
      timer = setTimeout(() => {
        callback.apply(this, args);
        timer = undefined;
      }, delay);
    }
  };
};

const KakaoMap = ({ data }: { data: RecordType[] }) => {
  // console.log(data);
  const [bounds, setBounds] = useState<{ sw: string; ne: string }>();
  const [filteredData, setFilteredData] = useRecoilState(FilteredData);
  const [map, setMap] = useState();
  const [position, setPosition] = useState<{ lat: number; lng: number }>({
    // 위치 확인 허용하지 않은 경우 기본 위치(서울역) 설정
    lat: 37.5546788388674,
    lng: 126.970606917394,
  });
  useKakaoLoader();
  GetGeolocation(setPosition);
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState<{ content: string; latlng: { lat: string; lng: string } }[]>([]);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ps = new kakao.maps.services.Places();

    // 키워드 검색 및 지도 반경 이동
    ps.keywordSearch(search, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          markers.push({
            latlng: {
              lat: data[i].y,
              lng: data[i].x,
            },
            content: data[i].place_name,
          });
          // @ts-ignore
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        setSearchedData(markers);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      } else if (status === "ZERO_RESULT") {
        // 검색 결과가 없는 경우
        console.log(`${search} 검색 결과가 없습니다.`);
        setSearchedData([]);
        setSearch("");
      }
    });
  };

  const filterData = useCallback(
    throttle(() => {
      if (bounds?.sw && bounds?.ne) {
        const swLatLng = bounds.sw.slice(1, -1).split(", ").map(Number);
        const neLatLng = bounds.ne.slice(1, -1).split(", ").map(Number);

        const swLat = swLatLng[0];
        const swLng = swLatLng[1];
        const neLat = neLatLng[0];
        const neLng = neLatLng[1];

        const newFilteredData = data.filter((marker) => {
          const lat = marker.latlng.lat;
          const lng = marker.latlng.lng;
          return lat >= swLat && lat <= neLat && lng >= swLng && lng <= neLng;
        });

        setFilteredData(newFilteredData);
      }
    }, 500),
    [bounds, data],
  );

  useEffect(() => {
    filterData();
  }, [bounds, filterData]);

  return (
    <>
      <form onSubmit={(e) => handleSearch(e)} className="searchWr">
        <input type="text" id="search" value={search} onChange={(e) => setSearch(e.target.value)} />
        <button>
          <span className="hidden">검색</span>
        </button>
      </form>
      <Map
        onCreate={setMap}
        center={{ lat: position.lat, lng: position.lng }}
        style={{ width: "100%", height: "100vh" }}
        onBoundsChanged={(map) => {
          const bounds = map.getBounds();
          setBounds({
            sw: bounds.getSouthWest().toString(),
            ne: bounds.getNorthEast().toString(),
          });
        }}
      >
        {search
          ? searchedData.map((marker) => (
              <>
                <CustomOverlayMap
                  key={`overlay-${marker.latlng.lat}-${marker.latlng.lng}`}
                  position={{
                    lat: Number(marker.latlng.lat),
                    lng: Number(marker.latlng.lng),
                  }}
                >
                  <p className="markerContent">{marker.content}</p>
                </CustomOverlayMap>
                <EventMarkerContainer
                  type="search"
                  key={`marker-${marker.latlng.lat}-${marker.latlng.lng}`}
                  position={marker.latlng}
                />
              </>
            ))
          : filteredData.map((marker) => (
              <EventMarkerContainer
                type="default"
                key={`${marker.latlng.lat}-${marker.latlng.lng}-${marker["created_at"]}`}
                position={marker.latlng}
                emotion={marker.emotion}
              />
            ))}
      </Map>
    </>
  );
};

export default KakaoMap;
