"use client";
import React from "react";
import EmotionAdd from "../emotion/emotion-add";
import EmotionList from "../emotion/emotion-list";
import { useRecoilValue } from "recoil";
import { addModeState } from "@/atoms/atoms";

const BottomSheetCont = ({ setSearch }: { setSearch: React.Dispatch<React.SetStateAction<string>> }) => {
  const addMode = useRecoilValue(addModeState);

  return addMode ? <EmotionAdd setSearch={setSearch} /> : <EmotionList />;
};

export default BottomSheetCont;
