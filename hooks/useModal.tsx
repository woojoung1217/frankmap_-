import { modalState } from "@/atoms/atoms";
import { useCallback } from "react";
import { useRecoilState } from "recoil";

type OpenModalType = {
  title?: string;
  content?: JSX.Element | string;
  button?: string;
  data?: string;
  image?: string;
  emoticon?: JSX.Element | string;
  callBack?: () => any;
};

export const useModal = () => {
  const [modalDataState, setModalDataState] = useRecoilState(modalState);

  const closeModal = useCallback(
    () =>
      setModalDataState((prev) => {
        return { ...prev, isOpen: false };
      }),
    [setModalDataState],
  );

  const openModal = useCallback(
    ({ title = "", content = "", button = "", data = "", image = "", emoticon, callBack = () => {} }: OpenModalType) =>
      setModalDataState({
        isOpen: true,
        title,
        content,
        button,
        callBack,
      }),
    [setModalDataState],
  );

  return { modalDataState, closeModal, openModal };
};
