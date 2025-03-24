"use client"

import { Button } from "@/components/ui/button"
import { useAppContext } from "@/context"
import Link from "next/link"

export default function ConfigurationsPage() {

    const ctx = useAppContext()

    return <section>
        <h1 className="m-5 p-2 text-3xl font-semibold border-b-2 ">Configurações</h1>
    
        <div className="m-5 p-2">
            {
                ctx?.user? <p>Logado como: {ctx?.user?.email}</p> : <Button variant="link"><Link href="/login">Logar</Link></Button>
            }

            
        </div>
    </section>
}