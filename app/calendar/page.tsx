"use client"

import { useState } from "react";
import "./calendar.scss";

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date()); // 현재 날짜

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

 const getCurrentMonthYear = (): string => {
    const options: Intl.DateTimeFormatOptions = { month: "long", year: "numeric" };
    return selectedDate.toLocaleDateString("kr", options);
};

  const goToPreviousMonth = () => {
    const previousMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() - 1,
      selectedDate.getDate()
    );
    setSelectedDate(previousMonth);
  };

  const goToNextMonth = () => {
    const nextMonth = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      selectedDate.getDate()
    );
    setSelectedDate(nextMonth);
  };

  const getDaysInMonth = (): number => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getStartDayOfWeek = (): number => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const renderCalendarGrid = () => {
    const daysInMonth = getDaysInMonth();
    const startDayOfWeek = getStartDayOfWeek();
    const blanksBefore: number[] = Array.from({ length: startDayOfWeek }, (_, index) => index);
    const days: number[] = Array.from({ length: daysInMonth }, (_, index) => index + 1);
    const titleOfDays: string[] = ["일", "월", "화", "수", "목", "금", "토"];

    return (
      <div className="calendarGrid">
        {titleOfDays.map((title, index) => (
          <div
            key={index}
            className={`calendarCell calendarHeader`}
          >
            {title}
          </div>
        ))}
        {blanksBefore.map((day) => (
          <div key={`blank-${day}`} className={`calendarCell`}></div>
        ))}
        {days.map((day) => (
          <div
            key={day}
            className={`calendarCell ${day === selectedDate.getDate() ? 'selected' : ''}`}
            onClick={() =>
              handleDateClick(
                new Date(
                  selectedDate.getFullYear(),
                  selectedDate.getMonth(),
                  day
                )
              )
            }
          >
            {day}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="calendar">
      <div className="calendarHeader">
        <button onClick={goToPreviousMonth}>&lt;</button>
        <span>{getCurrentMonthYear()}</span>
        <button onClick={goToNextMonth}>&gt;</button>
      </div>
      {renderCalendarGrid()}
    </div>
  );
};

export default Calendar;
