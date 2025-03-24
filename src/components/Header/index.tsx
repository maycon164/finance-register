import { Calendar1, Cog, Gauge } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";


const menuItems = [
    {
        href: "/calendar",
        name: "Calendário",
        icon: <Calendar1 size={36} />
    },
    {
        href: "/dashboards",
        name: "Gráficos",
        icon: <Gauge size={36} />
    },

    {
        href: "/config",
        name: "Config",
        icon: <Cog size={36} />
    }
]

export function Header() {


    return <header className="w-screen p-5 fixed bottom-0 flex justify-center items-center inset-shadow-xs bg-white *:flex-1 *:text-center">

        {menuItems.map(item =>
            <Button key={item.name} variant="link" className="flex flex-col" asChild>
                <Link href={item.href}>
                    {item.icon}
                    {item.name}
                </Link>
            </Button>
        )}


    </header>
}