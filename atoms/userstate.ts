import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userState",
  storage: localStorage,
});

export const userState = atom<string>({
  key: "userState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});
