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
  { date: new Date(2024, 9, 14), name: "Columbus Day" },
  { date: new Date(2024, 9, 31), name: "Halloween Day" },
  { date: new Date(2024, 10, 1), name: "Diwali" },
  { date: new Date(2024, 10, 2), name: "Day of the Dead" },
  { date: new Date(2024, 10, 3), name: "Daylight Saving Time End" },
  { date: new Date(2024, 10, 5), name: "Election Day" },
  { date: new Date(2024, 10, 11), name: "Veteran Day" },
  { date: new Date(2024, 10, 28), name: "Thanksgiving Day" },
  { date: new Date(2024, 11, 24), name: "Christmas Eve" },
  { date: new Date(2024, 11, 25), name: "Christmas Day" },
  { date: new Date(2024, 11, 26), name: "Hanukkah Day" },
];

const Calendar = () => {
  const today = new Date();
  const start = startOfMonth(today);
  const end = endOfMonth(today);

  const paddingDays = Array.from({ length: start.getDay() }).map(
    (_, index) =>
      new Date(
        start.getFullYear(),
        start.getMonth(),
        index - start.getDay() + 1
      )
  );

  const days = eachDayOfInterval({ start, end });
  const allDays = [...paddingDays, ...days];

  // Determine if today is a holiday
  const holidayToday = holidays.find(
    (hol) =>
      isSameMonth(hol.date, today) &&
      hol.date.getDate() === today.getDate() &&
      hol.date.getFullYear() === today.getFullYear()
  );

  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div>
      <h2 className="text-xl font-bold text-center mb-4 dark:bg-slate-950 bg-white p-2 rounded-md border dark:border-slate-800 border-slate-300">
        {format(today, "MMMM yyyy")}
      </h2>
      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayLabels.map((label) => (
          <div key={label} className="font-medium text-center">
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 rounded-lg p-3">
        {allDays.map((day, index) => {
          // Check if the day is a holiday
          const holiday = holidays.find(
            (hol) =>
              isSameMonth(hol.date, day) &&
              hol.date.getDate() === day.getDate() &&
              hol.date.getFullYear() === day.getFullYear()
          );

          const isHolidayToday = holiday && isToday(day);
          // setHolidayToday(isHolidayToday);

          return (
            <div key={index} className={` flex flex-col `}>
              <span
                className={`p-2 text-center text-sm ${
                  isHolidayToday
                    ? "bg-yellow-500 rounded-full" // Today is a holiday
                    : isToday(day)
                    ? "bg-red-500 rounded-full" // Today but not a holiday
                    : isSameMonth(day, today)
                    ? "" // Normal day in the current month
                    : "text-gray-300" // Days outside the current month
                }`}
              >
                {isNaN(day.getTime()) ? "" : format(day, "d")}
              </span>
            </div>
          );
        })}
      </div>
      <div
        className={`${
          holidayToday
            ? "my-2 dark:bg-slate-950 bg-white rounded-md shadow p-3 text-xs"
            : "hidden"
        }`}
      >
        {holidayToday && (
          <div className="marquee">
            <span>Happy {holidayToday.name}! 🎉🎉</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
