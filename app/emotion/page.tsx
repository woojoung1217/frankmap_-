"use client"



import { supabase } from '@/libs/supabase';
import { useEffect, useState } from 'react';

const Emotion = () => {
  
  const [records, setRecords] = useState<RecordType[]>();
  
  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const { data: record, error } = await supabase
        .from('record')
        .select('*')

        setRecords(record as RecordType[]);

      } catch (error) {
        console.log('Error: fetching data');
      }
    }

    fetchRecords();
  }, []);

  console.log(records);
  


  return (
    <>
      {records === undefined ? (
        <div>로딩 중...</div>
      ) : records.length > 0 ? (
        <div>
          {records.map((record) => (
            <div key={record.record_id}>
              <div>{record.content}</div>
            </div>
          ))}
        </div>
      ) : (
        <div>기록이 없습니다.</div>
      )}
    </>
  );
};

export default Emotion;
