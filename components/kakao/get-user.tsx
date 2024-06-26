// get-user.tsx
"use client";
import { userState } from "@/atoms/userstate";
import fetchData from "@/libs/fetch-record";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

const GetUser = ({ onUserDataFetched }) => {
  const [data, setData] = useState<RecordType[]>(null);
  const loggedInUserId = useRecoilValue(userState);

  useEffect(() => {
    const getData = async () => {
      if (loggedInUserId) {
        console.log("로그인된 uuid :", loggedInUserId);
        try {
          const resultData = await fetchData(loggedInUserId);
          setData(resultData);
          console.log("결과값", resultData);
          onUserDataFetched(resultData); // 부모 컴포넌트에 데이터 전달
        } catch (error) {
          console.error("데이터 가져오기 오류:", error);
          setData([]);
          onUserDataFetched([]); // 오류 발생 시 빈 배열 전달
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
