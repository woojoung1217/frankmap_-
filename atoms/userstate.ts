// src/atoms/userState.ts

import { atom } from "recoil";

interface User {
  email: string;
  // 여기에 필요한 다른 사용자 정보도 추가할 수 있습니다.
}

export const userState = atom<User | null>({
  key: "userState",
  default: null,
});
