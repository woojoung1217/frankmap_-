"use client";
import { CustomOverlayMap, Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "../../hooks/useKakaoLoader";
import EventMarkerContainer from "./handle-marker";
import { useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FilteredData } from "../../atoms/atoms";

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
  useKakaoLoader();
  const [bounds, setBounds] = useState<{ sw: string; ne: string }>();
  const [filteredData, setFilteredData] = useRecoilState(FilteredData);
  const [map, setMap] = useState();

  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState([]);
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const ps = new kakao.maps.services.Places();

    // 키워드 검색 및 지도 반경 이동
    ps.keywordSearch(search, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        const bounds = new kakao.maps.LatLngBounds();
        let markers = [];

        for (var i = 0; i < data.length; i++) {
          // @ts-ignore
          markers.push({
            position: {
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
        center={{ lat: 37.51112, lng: 127.095973 }}
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
                  key={`overlay-${marker.position.lat}-${marker.position.lng}-${marker["created_at"]}`}
                  position={{
                    lat: marker.position.lat,
                    lng: marker.position.lng,
                  }}
                >
                  <p className="markerContent">{marker.content}</p>
                </CustomOverlayMap>
                <EventMarkerContainer
                  type="search"
                  key={`marker-${marker.position.lat}-${marker.position.lng}-${marker["created_at"]}`}
                  position={marker.position}
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
