"use client";

import { addStepState } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";
import EmotionSelect from "@/components/emotion/emotion-select";
import EmotionRecord from "@/components/emotion/emotion-record";

const EmotionAdd = (): JSX.Element => {
  const addState = useRecoilValue(addStepState);

  return <>{addState === "step1" ? <EmotionSelect /> : <EmotionRecord />}</>;
};

export default EmotionAdd;
