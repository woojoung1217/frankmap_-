import { atom } from "recoil";

interface RecordType {
  record_id: number;
  emotion: number;
  content: string;
  latlng: {
    lat: number;
    lng: number;
  };
  date: string;
  location: string;
  image: string[];
  user_id: string;
  created_at: string;
}

interface ModalType {
  isOpen: Boolean;
  title?: string;
  emoticon?: JSX.Element | string;
  content?: JSX.Element | string;
  button?: string;
  data?: string;
  image?: string;
  callBack?: () => any;
}

export const dataState = atom({
  key: "dataState",
  default: [] as RecordType[],
});

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
  default: {
    lat: 0,
    lng: 0,
  },
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

export const transformState = atom({
  key: "transformState",
  default: 0,
});

export const heightState = atom({
  key: "heightState",
  default: 0,
});

export const emotionAddMarker = atom({
  key: "emotionAddMarker",
  default: false,
});

export const locationState = atom({
  key: "locationState",
  default: {
    // 위치 확인 허용하지 않은 경우 기본 위치(서울역) 설정
    lat: 37.5546788388674,
    lng: 126.970606917394,
  },
});
