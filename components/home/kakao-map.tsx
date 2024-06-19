"use client";
import { Map } from "react-kakao-maps-sdk";
import useKakaoLoader from "../useKakaoLoader";
import EventMarkerContainer from "./handle-marker";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { FilteredData } from "./filtered-data";

const KakaoMap = ({ data }: { data: RecordType[] }) => {
  useKakaoLoader();
  const [bounds, setBounds] = useState<{ sw: string; ne: string }>();
  const [filteredData, setFilteredData] = useRecoilState(FilteredData);

  useEffect(() => {
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
  }, [bounds]);

  return (
    <>
      <Map
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
        {filteredData.map((marker) => (
          <EventMarkerContainer
            key={`EventMarkerContainer-${marker.latlng.lat}-${marker.latlng.lng}-${marker["created_at"]}`}
            position={marker.latlng}
            content={marker.content}
          />
        ))}
      </Map>
    </>
  );
};

export default KakaoMap;
