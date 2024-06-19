// src/recoil/atoms.mjs
import { atom } from "recoil";
import getMarkers from "./get-markers";

export const FilteredData = atom({
  key: "filteredData",
  default: getMarkers(),
});
