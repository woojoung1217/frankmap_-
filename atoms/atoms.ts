// src/recoil/atoms.mjs
import { atom, atomFamily } from "recoil";
import getMarkers from "../components/kakao/get-markers";

interface ModalType {
  isOpen: Boolean;
  title?: string;
  content?: JSX.Element | string;
  button?: string;
  data?: string;
  image?: string;
  callBack?: () => any;
}

export const FilteredData = atom({
  key: "filteredData",
  default: [] as RecordType[],
});

export const emotionState = atom({
  key: "emotion",
  default: 0,
});

export const latlngState = atom({
  key: "latlng",
});

export const addModeState = atom({
  key: "addMode",
  default: false,
});

export const addStepState = atom({
  key: "addStep",
  default: "step1",
});

export const editStepState = atom({
  key: "editStep",
  default: "step2",
});

export const modalState = atom<ModalType>({
  key: "modalState",
  default: {
    isOpen: false,
    title: "",
    content: "",
    button: "",
  },
});

export const isActBottomSheetState = atom({
  key: "isActBottomSheet",
  default: false,
});
