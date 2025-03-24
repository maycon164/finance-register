"use client"

import { ContinuousCalendar } from "@/components/Calendar";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export function Example() {
    const [isOpen, setIsOpen] = useState(false);

    return <>
            <ContinuousCalendar onClick={() => setIsOpen(true)}/>
            <CardWithForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
}


export function CardWithForm({isOpen, setIsOpen}: {isOpen: boolean, setIsOpen: (value :boolean) => void}) {


    return (
        <AlertDialog open={isOpen}>

        <AlertDialogContent>
            <Button onClick={() => setIsOpen(false)}>X</Button>
            <AlertDialogHeader>
                <AlertDialogTitle>Create project</AlertDialogTitle>
                <AlertDialogDescription>
                    Deploy your new project in one-click.
                </AlertDialogDescription>
            </AlertDialogHeader>

            <form>
                <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Name of your project" />
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Framework</Label>
                    <Select>
                    <SelectTrigger id="framework">
                        <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                        <SelectItem value="next">Next.js</SelectItem>
                        <SelectItem value="sveltekit">SvelteKit</SelectItem>
                        <SelectItem value="astro">Astro</SelectItem>
                        <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                    </Select>
                </div>

                <div>
                    <Button>Enviar</Button>
                </div>
                </div>
          </form>
     
      </AlertDialogContent>

      </AlertDialog>

    )
  }