import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "userState",
  storage: localStorage,
});

interface User {
  id: string;
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
