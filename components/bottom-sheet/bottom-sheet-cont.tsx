import React from "react";
import EmotionAdd from "../emotion/emotion-add";
import EmotionList from "../emotion/emotion-list";

const BottomSheetCont = () => {
  const isAddMode = false;
  return isAddMode ? <EmotionAdd /> : <EmotionList />;
};

export default BottomSheetCont;
