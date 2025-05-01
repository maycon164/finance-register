"use client";

import { useState } from "react";
import { RegisterCard } from "./components/RegisterCard";
import WrapperCalendarWithForm from "./components/WrapperCalendar";
import { formatDate, formatToBRL } from "@/utils";
import { useGetRegisters } from "./api/get-registers";
import { RegisterType } from "@/models";

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());

  const registers = useGetRegisters({ date });

  const totalValue =
    registers.data?.reduce((acc, register) => {
      if (register.type === RegisterType.OUTCOME) {
        return acc - register.value;
      }

      return acc + register.value;
    }, 0) ?? 0;

  return (
    <section>
      <h1 className="m-5 p-2 text-3xl font-semibold border-b-2 ">Calendário</h1>

      <div className="relative mt-10">
        <WrapperCalendarWithForm onClickDate={setDate} />
      </div>

      <div className="m-5">
        <div>
          <p className="text-sm text-gray-500">Últimos registros para</p>

          <p className="text-2xl font-semibold mb-5">{formatDate(date)}</p>
        </div>
        {totalValue != 0 && (
          <p
            className={`text-3xl font-bold text-${
              totalValue > 0 ? "green" : "red"
            }-700`}
          >
            {formatToBRL(totalValue)}
          </p>
        )}

        <ul>
          {registers.data?.map((register) => (
            <li className="my-5" key={register.id}>
              <RegisterCard
                email={register.createdBy.email}
                value={register.value}
                type={register.type}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
