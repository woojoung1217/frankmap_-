"use client";

import Loading from "@/app/loading";
import { editStepState } from "@/atoms/atoms";
import { userState } from "@/atoms/userstate";
import EmotionHeader from "@/components/list/emotion-header";
import EmotionItem from "@/components/list/emotion-item";
import { supabase } from "@/libs/supabase";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "@/components/list/emotion.scss";
import { RecordType } from "@/types/types";

const Emotion = () => {
  const user = useRecoilValue(userState);
  const [records, setRecords] = useState<RecordType[]>();
  const [filteredRecords, setFilteredRecords] = useState<RecordType[]>();
  const [selectedMonth, setSelectedMonth] = useState("");
  const setEditState = useSetRecoilState(editStepState);

  useEffect(() => {
    fetchRecords();
    // 감정 변경하다가 뒤로 가기 눌러도 다시 처음 수정 상태로
    setEditState("step2");
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      const filtered = records?.filter((record) => record.date.startsWith(selectedMonth));
      setFilteredRecords(filtered);
    } else {
      setFilteredRecords(records);
    }
  }, [selectedMonth, records]);

  const fetchRecords = async () => {
    try {
      const { data: record } = await supabase
        .from("record")
        .select("*")
        .eq("user_id", user)
        .order("date", { ascending: true })
        .order("created_at", { ascending: true });

      setRecords(record as RecordType[]);
    } catch (error) {
      console.log("Error: fetching data");
    }
  };

  const handleMonthChange = (month: string) => {
    setSelectedMonth(month);
  };

  return (
    <>
      {/* <GetUser /> */}

      {records === undefined ? (
        <Loading />
      ) : (
        <div className="emotion-list-container">
          <EmotionHeader onMonthChange={handleMonthChange} />
          {records?.length > 0 ? (
            <div>
              {filteredRecords?.map((record) => (
                <EmotionItem key={record.record_id} record={record} fetchRecords={fetchRecords} />
              ))}
            </div>
          ) : (
            <div>기록이 없습니다.</div>
          )}
        </div>
      )}
    </>
  );
};

export default Emotion;
