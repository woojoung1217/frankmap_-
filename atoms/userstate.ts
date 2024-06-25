// src/atoms/userState.ts

import { atom } from "recoil";

interface User {
  id: string;
  // 필요한 다른 필드들 추가
}

export const userState = atom<User | string>({
  key: "userState",
  default: "",
});
