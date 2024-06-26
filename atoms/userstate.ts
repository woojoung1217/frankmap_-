import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userState",
  storage: localStorage,
});

export const userState = atom<null | string>({
  key: "userState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
