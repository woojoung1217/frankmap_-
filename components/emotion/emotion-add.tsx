"use client";
import { addStepState } from "@/atoms/atoms";
import { useRecoilValue } from "recoil";
import EmotionSelect from "@/components/emotion/emotion-select";
import EmotionRecord from "@/components/emotion/emotion-record";

const EmotionAdd = ({ setSearch }: { setSearch: React.Dispatch<React.SetStateAction<string>> }): JSX.Element => {
  const addState = useRecoilValue(addStepState);

  return <>{addState === "step1" ? <EmotionSelect /> : <EmotionRecord setSearch={setSearch} />}</>;
};

export default EmotionAdd;
