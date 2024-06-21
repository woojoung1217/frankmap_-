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
  default: getMarkers(),
});

export const modalState = atom<ModalType>({
  key: "modalState",
  default: {
    isOpen: false,
    title: "",
    content: "",
    button: "",
  }
});