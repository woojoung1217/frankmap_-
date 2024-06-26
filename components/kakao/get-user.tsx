"use client";
import { dataState } from "@/atoms/atoms";
import { userState } from "@/atoms/userstate";
import fetchData from "@/libs/fetch-record";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const GetUser = () => {
  const loggedInUserId = useRecoilValue(userState);
  const setData = useSetRecoilState(dataState);

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
      }
    };
    getData();
  }, [loggedInUserId]);

  return null;
};

export default GetUser;
