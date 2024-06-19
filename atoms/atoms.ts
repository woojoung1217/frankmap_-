// src/recoil/atoms.mjs
import { atom } from "recoil";
import getMarkers from "../components/kakao/get-markers";

export const FilteredData = atom({
  key: "filteredData",
  default: getMarkers(),
});
