import { Example } from "./components/example";

const lastRegisters = [
    {
        id: 1,
        userName: "David",
        type: "OUTCOME",
        value: 1000,
        description: "Gasto com o ponto xxx"
    },
    {
        id: 2,
        userName: "Ana",
        type: "INCOME",
        value: 2500,
        description: "Venda de Vestido"
    },
    {
        id: 3,
        userName: "David",
        type: "OUTCOME",
        value: 150,
        description: "Valor da luz"
    },
    {
        id: 4,
        userName: "David",
        type: "OUTCOME",
        value: 300,
        description: "Segurança"
    },
    {
        id: 5,
        userName: "Ana",
        type: "INCOME",
        value: 500,
        description: "Pedido xxx"
    },
]

export default function CalendarPage() {
    return (
        <section>
            <h1 className="m-5 p-2 text-3xl font-semibold border-b-2 ">Calendário</h1>

            <div className="relative mt-10">
                <Example/>
            </div>

            <div className="m-5">
                <p className="text-2xl font-semibold mb-5"> Últimos registros </p>
                <ul>
                    {
                        lastRegisters.map(register => <li className="my-5" key={register.id}>
                            <div className={(register.type === "INCOME" ? "bg-green-600 " : "bg-red-600 ") + "text-white rounded inset-shadow-xs p-5 grid grid-cols-[1fr_auto] gap-2"}>
                                <p className="text-lg font-semibold">{register.userName}</p>
                                <p className="text-lg text-right font-semibold">{register.type === "INCOME" ? "ENTRADA" : "SAÍDA"}</p>
                                <p className="col-span-2" >Valor: {register.type === "INCOME" ? "+" : "-"}R${register.value}</p>
                                <p > Descrição: {register.description}</p>
                            </div>
                        </li>
                        )}
                </ul>
            </div>

        </section >
    )
}