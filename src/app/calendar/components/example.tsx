"use client"

import { ContinuousCalendar } from "@/components/Calendar";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function Example() {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState("")

    function handleClick(day: number, month: number, year: number) {
        console.log(day)
        console.log(month)
        console.log(year)
        const months = [
            "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
            "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
        ];


        setData(`${day} ${months[month]} de ${year}`)
        setIsOpen(true)
    }

    return <>
        <ContinuousCalendar onClick={handleClick} />
        <CardWithForm isOpen={isOpen} setIsOpen={setIsOpen} data={data} />
    </>
}


export function CardWithForm({ isOpen, setIsOpen, data }: { isOpen: boolean, setIsOpen: (value: boolean) => void, data: string }) {


    return (
        <AlertDialog open={isOpen}>

            <AlertDialogContent className="">
                <Button variant="link" className="absolute top-0 right-0 p-5 text-2xl" onClick={() => setIsOpen(false)}>X</Button>

                <h1 className="text-2xl font-semibold" >Adicionar Registro</h1>
                <p>{data}</p>
                <form className="flex flex-col gap-y-3 mt-5 *:w-full">

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="name">Quantidade</Label>
                        <Input id="quantity" placeholder="informe a quantidade" />
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="framework">Selecione o tipo</Label>
                        <Select>
                            <SelectTrigger className="w-full" id="framework">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                <SelectItem value="income">Entrada</SelectItem>
                                <SelectItem value="outome">Saída</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col space-y-2">
                        <Label htmlFor="framework">Selecione o ponto</Label>
                        <Select>
                            <SelectTrigger className="w-full" id="tipo">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectGroup>
                                <SelectContent>
                                    <SelectItem value="ponto-a">Ponto Tears</SelectItem>
                                    <SelectItem value="ponto-b">Ponto Sraet</SelectItem>
                                    <SelectItem value="pedido">Pedido</SelectItem>
                                </SelectContent>
                            </SelectGroup>
                        </Select>
                    </div>

                    <div>
                        <Button className="w-full" >Enviar</Button>
                    </div>
                </form>

            </AlertDialogContent>

        </AlertDialog>

    )
}