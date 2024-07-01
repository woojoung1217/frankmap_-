"use client";

import Loading from "@/app/loading";
import { userState } from "@/atoms/userstate";
import EmotionHeader from "@/components/list/emotion-header";
import EmotionItem from "@/components/list/emotion-item";
import { supabase } from "@/libs/supabase";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
// import GetUser from '../kakao/get-user';

const Emotion = () => {
  const user = useRecoilValue(userState);
  const [records, setRecords] = useState<RecordType[]>();
  const [filteredRecords, setFilteredRecords] = useState<RecordType[]>();
  const [selectedMonth, setSelectedMonth] = useState("");

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data: record, error } = await supabase
          .from("record")
          .select("*")
          .eq("user_id", user)
          .order("date", { ascending: true });

        setRecords(record as RecordType[]);
      } catch (error) {
        console.log("Error: fetching data");
      }
    };

    fetchRecords();
  }, []);

  console.log(records);

  useEffect(() => {
    if (selectedMonth) {
      const filtered = records?.filter((record) => record.date.startsWith(selectedMonth));
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records);
    }
  }, [selectedMonth, records]);

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  return (
    <>
      {/* <GetUser /> */}
      <div className="emotion-container">
        <EmotionHeader onMonthChange={handleMonthChange} />
        {records === undefined ? (
          <Loading />
        ) : // <div>loading</div> --> 추후 suspense로 교체할 예정
        records.length > 0 ? (
          <div>{filteredRecords?.map((record) => <EmotionItem key={record.record_id} record={record} />)}</div>
        ) : (
          <div>기록이 없습니다.</div>
        )}
      </div>
    </>
  );
};

export default Emotion;
