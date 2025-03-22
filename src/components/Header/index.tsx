import { Calendar1, Cog, Gauge, Tags } from "lucide-react";
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
        href: "/tags",
        name: "Identificadores",
        icon: <Tags size={36} />
    },
    {
        href: "/config",
        name: "Configurações",
        icon: <Cog size={36} />

    }
]

export function Header() {
    return <header className="w-screen p-5 fixed bottom-0 flex justify-center items-center inset-shadow-xs bg-white *:flex-auto *:text-center">

        {menuItems.map(item =>
            <Button variant="link" className="flex flex-col " asChild>
                <Link href={item.href}>
                    {item.icon}
                    {item.name}
                </Link>
            </Button>
        )}


    </header>
}