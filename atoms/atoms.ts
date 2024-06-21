// src/recoil/atoms.mjs
import { atom } from "recoil";
import getMarkers from "../components/kakao/get-markers";

export const FilteredData = atom({
  key: "filteredData",
  default: getMarkers(),
});

export const emotionState = atom({
  key: "emotion",
});

export const addModeState = atom({
  key: "addMode",
  default: true,
});

export const addStepState = atom({
  key: "addStep",
  default: "step1",
});
