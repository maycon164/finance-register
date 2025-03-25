"use client";

import { ContinuousCalendar } from "@/components/Calendar";
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { formatDate } from "@/utils";
import { useState } from "react";
import { RegisterForm } from "../../form/AddRegisterForm";

interface WrapperCalendarWithForm {
  onClickDate: (date: Date) => void;
}

export default function WrapperCalendarWithForm(
  props: Readonly<WrapperCalendarWithForm>
) {
  const { onClickDate } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState("");

  function handleClick(day: number, month: number, year: number) {
    const date = new Date(year, month, day);

    setData(formatDate(date));
    onClickDate(date);
    setIsOpen(true);
  }

  return (
    <>
      <ContinuousCalendar onClick={handleClick} />
      <CardWithForm isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
    </>
  );
}

interface CardWithFormProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  data: string;
}

export function CardWithForm(props: Readonly<CardWithFormProps>) {
  const { isOpen, setIsOpen, data } = props;

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent className="border-none">
        <Button
          variant="link"
          className="absolute top-0 right-0 p-5 text-2xl"
          onClick={() => setIsOpen(false)}
        >
          X
        </Button>

        <h1 className="text-2xl font-semibold">Adicionar Registro</h1>
        <p>{data}</p>

        <RegisterForm />
      </AlertDialogContent>
    </AlertDialog>
  );
}
