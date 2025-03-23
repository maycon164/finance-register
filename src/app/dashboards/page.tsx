import { ChartExampleV1, ChartExampleV2 } from "./components/chart";

export default function DashboardsPage() {
    return (
        <section>
            <h1 className="m-5 p-2 text-3xl font-semibold border-b-2 ">Gráficos</h1>

            <div className="mt-10">
                <ChartExampleV1 />
            </div>

            <div className="mt-10">
                <ChartExampleV2 />
            </div>


        </section>
    )
}