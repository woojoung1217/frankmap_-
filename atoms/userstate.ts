// src/atoms/userState.ts

import { atom } from "recoil";

interface User {
  id: string;
}

export const userState = atom({
  key: "userState",
  default: null,
});
