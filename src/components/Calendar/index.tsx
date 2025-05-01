"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab"];
const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julio",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

interface ContinuousCalendarProps {
  onClick?: (_day: number, _month: number, _year: number) => void;
}

export const ContinuousCalendar: React.FC<ContinuousCalendarProps> = ({
  onClick,
}) => {
  const today = new Date();
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const monthOptions = monthNames.map((month, index) => ({
    name: month,
    value: `${index}`,
  }));

  const handlePrevYear = () => setYear((prevYear) => prevYear - 1);
  const handleNextYear = () => setYear((prevYear) => prevYear + 1);

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const monthIndex = parseInt(event.target.value, 10);
    setSelectedMonth(monthIndex);
  };

  const handleTodayClick = () => {
    setYear(today.getFullYear());
  };

  const handleDayClick = (day: number, month: number, year: number) => {
    if (!onClick) {
      return;
    }
    if (month < 0) {
      onClick(day, 11, year - 1);
    } else {
      onClick(day, month, year);
    }
  };

  return (
    <div className="max-h-full px-3 overflow-y-scroll rounded-t-2xl bg-white pb-10 text-slate-800 ">
      <div className="sticky -top-px z-50 w-full rounded-t-2xl bg-white px-5 pt-7 sm:px-8 sm:pt-8">
        <div className="mb-4 flex w-full flex-wrap items-center justify-between gap-6">
          <div className="flex flex-wrap gap-2 sm:gap-3">
            <Select
              name="month"
              value={`${selectedMonth}`}
              options={monthOptions}
              onChange={handleMonthChange}
            />
            <button
              onClick={handleTodayClick}
              type="button"
              className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 lg:px-5 lg:py-2.5"
            >
              Hoje
            </button>
          </div>
          <div className="flex w-fit items-center justify-between">
            <button
              onClick={handlePrevYear}
              className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
            >
              <svg
                className="size-5 text-slate-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m15 19-7-7 7-7"
                />
              </svg>
            </button>
            <h1 className="min-w-16 text-center text-lg font-semibold sm:min-w-20 sm:text-xl">
              {year}
            </h1>
            <button
              onClick={handleNextYear}
              className="rounded-full border border-slate-300 p-1 transition-colors hover:bg-slate-100 sm:p-2"
            >
              <svg
                className="size-5 text-slate-800"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m9 5 7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="grid w-full grid-cols-7 justify-between text-slate-500">
        {daysOfWeek.map((day, index) => (
          <div
            key={day.toString()}
            className="w-full border-b border-slate-200 py-2 text-center font-semibold"
          >
            {day}
          </div>
        ))}
      </div>

      <div className="w-full  pt-4 ">
        <DaysInMonth
          year={year}
          month={selectedMonth}
          onClickDay={handleDayClick}
        />
      </div>
    </div>
  );
};

function DaysInMonth({
  year,
  month,
  onClickDay,
}: Readonly<{
  year: number;
  month: number;
  onClickDay: (day: number, month: number, year: number) => void;
}>) {
  const today = new Date();
  const dayRefs = useRef<(HTMLDivElement | null)[]>([]);

  const daysInYear = (): { month: number; day: number }[] => {
    const daysInYear = [];

    const startDayOfWeek = new Date(year, month, 1).getDay();

    if (startDayOfWeek < 6) {
      for (let i = 0; i < startDayOfWeek; i++) {
        daysInYear.push({ month: -1, day: 32 - startDayOfWeek + i });
      }
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      daysInYear.push({ month, day });
    }

    const lastWeekDayCount = daysInYear.length % 7;
    if (lastWeekDayCount > 0) {
      const extraDaysNeeded = 7 - lastWeekDayCount;
      for (let day = 1; day <= extraDaysNeeded; day++) {
        daysInYear.push({ month: 0, day });
      }
    }

    return daysInYear;
  };

  const calendarDays = daysInYear();

  const calendarWeeks = [];
  for (let i = 0; i < calendarDays.length; i += 7) {
    calendarWeeks.push(calendarDays.slice(i, i + 7));
  }

  useEffect(() => {
    const calendarContainer = document.querySelector(".calendar-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const month = parseInt(
              entry.target.getAttribute("data-month")!,
              10
            );
            //setSelectedMonth(month);
          }
        });
      },
      {
        root: calendarContainer,
        rootMargin: "-75% 0px -25% 0px",
        threshold: 0,
      }
    );

    dayRefs.current.forEach((ref) => {
      if (ref && ref.getAttribute("data-day") === "15") {
        observer.observe(ref);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return calendarWeeks.map((week, weekIndex) => (
    <div className="flex w-full" key={`week-${weekIndex}`}>
      {week.map(({ month, day }, dayIndex) => {
        const index = weekIndex * 7 + dayIndex;

        const isToday =
          today.getMonth() === month &&
          today.getDate() === day &&
          today.getFullYear() === year;

        return (
          <div
            key={`${month}-${day}`}
            ref={(el) => {
              dayRefs.current[index] = el;
            }}
            data-month={month}
            data-day={day}
            onClick={() => onClickDay(day, month, year)}
            className={`relative z-10 m-[-0.5px] group aspect-square w-full grow cursor-pointer rounded-xl border font-medium transition-all hover:z-20 hover:border-cyan-400 sm:-m-px sm:size-20 sm:rounded-2xl sm:border-2 lg:size-36 lg:rounded-3xl 2xl:size-40`}
          >
            <span
              className={`absolute left-1 top-1 flex size-5 items-center justify-center rounded-full text-xs sm:size-6 sm:text-sm lg:left-2 lg:top-2 lg:size-8 lg:text-base ${
                isToday ? "bg-blue-500 font-semibold text-white" : ""
              } ${month < 0 ? "text-slate-400" : "text-slate-800"}`}
            >
              {day}
            </span>

            <button
              type="button"
              className="absolute right-2 top-2 rounded-full opacity-0 transition-all focus:opacity-100 group-hover:opacity-100"
            >
              <svg
                className="size-8 scale-90 text-blue-500 transition-all hover:scale-100 group-focus:scale-100"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4.243a1 1 0 1 0-2 0V11H7.757a1 1 0 1 0 0 2H11v3.243a1 1 0 1 0 2 0V13h3.243a1 1 0 1 0 0-2H13V7.757Z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        );
      })}
    </div>
  ));
}

export interface SelectProps {
  name: string;
  value: string;
  label?: string;
  options: { name: string; value: string }[];
  onChange: (_event: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export const Select = ({
  name,
  value,
  label,
  options = [],
  onChange,
  className,
}: SelectProps) => (
  <div className={`relative ${className}`}>
    {label && (
      <label htmlFor={name} className="mb-2 block font-medium text-slate-800">
        {label}
      </label>
    )}
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="cursor-pointer rounded-lg border border-gray-300 bg-white py-1.5 pl-2 pr-6 text-sm font-medium text-gray-900 hover:bg-gray-100 sm:rounded-xl sm:py-2.5 sm:pl-3 sm:pr-8"
      required
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.name}
        </option>
      ))}
    </select>
    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-1 sm:pr-2">
      <svg
        className="size-5 text-slate-600"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  </div>
);
