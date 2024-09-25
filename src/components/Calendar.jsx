import React from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
} from "date-fns";

const holidays = [
  { date: new Date(2024, 0, 1), name: "New Year's Day" },
  { date: new Date(2024, 6, 4), name: "Independence Day" },
  { date: new Date(2024, 10, 28), name: "Thanksgiving" },
  { date: new Date(2024, 11, 25), name: "Christmas Day" },
];

const Calendar = () => {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);

  const days = eachDayOfInterval({ start, end });

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="">
      <h2 className="text-xl font-bold text-center mb-4 dark:bg-slate-950 bg-white p-2 rounded-md border dark:border-slate-800 border-slate-300">
        {format(today, "MMMM yyyy")}
      </h2>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayLabels.map((label) => (
          <div key={label} className="font-bold text-center">
            {label}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 border dark:border-slate-800 border-slate-300 dark:bg-slate-950 bg-white rounded-lg">
        {days.map((day) => {
          const holiday = holidays.find(
            (hol) =>
              hol.date.getDate() === day.getDate() &&
              hol.date.getMonth() === day.getMonth()
          );

          return (
            <div
              key={day}
              className={`p-2 text-center text-xs ${
                isToday(day)
                  ? "bg-red-500 rounded-full"
                  : holiday
                  ? "bg-yellow-500 rounded-full"
                  : isSameMonth(day, today)
                  ? ""
                  : ""
              }`}
            >
              {format(day, "d")}
              {holiday && <div className="text-sm">{holiday.name}</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
