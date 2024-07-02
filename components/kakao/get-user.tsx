"use client";
import { dataState } from "@/atoms/atoms";
import { userState } from "@/atoms/userstate";
import { useModal } from "@/hooks/useModal";
import fetchData from "@/libs/fetch-record";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const GetUser = () => {
  const loggedInUserId = useRecoilValue(userState);
  const setData = useSetRecoilState(dataState);
  const { openModal } = useModal();

  useEffect(() => {
    const getData = async () => {
      if (loggedInUserId) {
        try {
          const resultData = await fetchData(loggedInUserId);
          setData(resultData); // 부모 컴포넌트에 데이터 전달
        } catch (error) {
          console.error("데이터 가져오기 오류:", error);
          setData([]); // 오류 발생 시 빈 배열 전달
        }
      } else {
        // 사용자가 로그인되지 않은 경우 처리
        openModal({
          content: `
            <div className="recordModal"> 
              <div className="closePrevention"></div>
              <img className="emotion" src="/emotion7-folded.svg" alt="로그인 안됨" />
              <p className="content">감정기록을 할 수 없어요! <br> 회원가입 후 이용 해 주세요</p>
            </div>
          `,
          button: "회원가입 / 로그인",
        });
      }
    };
    getData();
  }, [loggedInUserId]);

  return null;
};

export default GetUser;
