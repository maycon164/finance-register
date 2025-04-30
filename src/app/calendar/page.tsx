"use client";

import { useState } from "react";
import { RegisterCard } from "./components/RegisterCard";
import WrapperCalendarWithForm from "./components/WrapperCalendar";
import { formatDate } from "@/utils";
import { useGetRegisters } from "./api/get-registers";

export default function CalendarPage() {
  const [date, setDate] = useState<Date>(new Date());

  const registers = useGetRegisters();

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

        <p className="text-3xl font-bold text-green-700">+R$500</p>

        <ul>
          {registers.data?.map((register) => (
            <li className="my-5" key={register.id}>
              <RegisterCard
                username={register.createdBy.name}
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
