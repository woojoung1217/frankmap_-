"use client";

import { useEffect, useState } from "react";
import AboutMyEmotion from "./(About)/About";
import { createClient } from "@supabase/supabase-js";
import "./calendar.scss";

const Calendar = () => {
  /********************* fetching *************************** */
  const [data, setData] = useState([]); // Supabase로부터 가져온 데이터를 저장할 상태

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Supabase 클라이언트 초기화
    const supabaseUrl = "https://jyrfxniwlrpwpcdjivbe.supabase.co";
    const supabaseKey =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp5cmZ4bml3bHJwd3BjZGppdmJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTc0MTc3MTcsImV4cCI6MjAzMjk5MzcxN30.Z_tGSYleW1nANDdys23jsCCUkEh888R6GniRPNMofzM";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 데이터 가져오기
    try {
      const { data, error }: any = await supabase.from("post").select("*");
      if (error) {
        throw error;
      }
      setData(data);
    } catch (error: any) {
      console.error("Error fetching data:", error.message);
    }
  };

  console.log(data);

  /********************* calendar *************************** */

  /** 현재 날짜를 가져오는 state */
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  /** 클릭 한 날짜로 데이터를 변경하는 함수 */
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  /** 지정 된 타입으로 날짜를 변환 해주는 함수 */
  const getCurrentMonthYear = (): string => {
    const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
    return selectedDate.toLocaleDateString("kr", options);
  };

  /** 이전 달로 넘어가는 함수 */
  const goToPreviousMonth = (): void => {
    const previousMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, selectedDate.getDate());
    console.log("<< go to previous month");
    setSelectedDate(previousMonth);
  };

  /** 다음 달로 넘어가는 함수 */
  const goToNextMonth = (): void => {
    const nextMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, selectedDate.getDate());
    console.log("go to next month >> ");
    setSelectedDate(nextMonth);
  };

  /** 현재 선택된 달의 일 수를 반환 하는 함수. */
  const getDaysInMonth = (): number => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  /** 시작날짜를 가져오는 함수 */
  const getStartDayOfWeek = (): number => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    return new Date(year, month, 1).getDay();
  };

  /** 받아온 데이터에서 이미지를 맵핑 하는 함수  */
  const getEmojiByEmotion = (emotion: number): string => {
    switch (emotion) {
      case 1:
        return "/emotion1.svg";
      case 2:
        return "/emotion2.svg";
      case 3:
        return "/emotion3.svg";
      default:
        return "";
    }
  };

  /** 그리드 랜더 해주는 함수  */
  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth();
    const startDayOfWeek = getStartDayOfWeek();
    const blanksBefore: number[] = Array.from({ length: startDayOfWeek }, (_, index) => index);
    const days: number[] = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    const titleOfDays: string[] = ["일", "월", "화", "수", "목", "금", "토"];

    return (
      <div className="calendarGrid">
        {titleOfDays.map((title, index) => (
          <div key={index} className={`calendarCell calendarHeader`}>
            {title}
          </div>
        ))}
        {blanksBefore.map((day) => (
          <div key={`blank-${day}`} className={`calendarCell`}></div>
        ))}
        {days.map((day) => {
          const currentDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day + 1);
          const formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 변환
          const dailyData: any = data.find((item: any) => item.date === formattedDate); // 해당 날짜의 데이터 가져오기
          const emoji = dailyData ? getEmojiByEmotion(dailyData.emotion) : ""; // 해당 날짜의 이모지 가져오기

          return (
            <div
              key={day}
              className={`calendarCell ${day === selectedDate.getDate() ? "selected" : ""}`}
              onClick={() => handleDateClick(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
            >
              {emoji ? <img src={emoji} alt="emoji" style={{ width: "25px", height: "25px" }}></img> : day}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <>
      <div className="calendar">
        <div className="calendarHeader">
          <button onClick={goToPreviousMonth}>&lt;</button>
          <span>{getCurrentMonthYear()}</span>
          <button onClick={goToNextMonth}>&gt;</button>
        </div>
        {renderCalendarGrid()}
      </div>
      <AboutMyEmotion />
    </>
  );
};

export default Calendar;
