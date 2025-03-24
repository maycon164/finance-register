"use client"

import * as React from "react"
import { Label, Pie, PieChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
    { name: "Entrada", amount: 275, fill: "#22c55e" },
    { name: "Saída", amount: 200, fill: "#ef4444" },
]

const chartConfig = {
    entrada: {
        label: "Entrada",
        color: "hsl(140, 70%, 50%)", // Verde
    },
    saida: {
        label: "Saída",
        color: "hsl(0, 70%, 50%)", // Vermelho
    }
} satisfies ChartConfig;

export function ChartExampleV1() {
    const totalVisitors = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.amount, 0)
    }, [])

    return (
        <Card className="flex flex-col">
            <CardHeader className="items-center pb-0">
                <CardTitle>Total no Mês</CardTitle>
                <CardDescription>Janeiro de 2025</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Pie
                            data={chartData}
                            dataKey="amount"
                            nameKey="name"
                            innerRadius={60}
                            strokeWidth={5}
                        >
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {totalVisitors.toLocaleString()}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Total
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none text-center">
                    Média de gasto de 5.2% maior em relação ao mês passado
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                </div>
            </CardFooter>
        </Card>
    )
}


export function ChartExampleV2() {
    const chartData = [
        { month: "Janeiro", entrada: 186, saida: 80, },
        { month: "Fevereiro", entrada: 305, saida: 200 },
        { month: "Março", entrada: 237, saida: 120 },
        { month: "Abril", entrada: 73, saida: 190 },
        { month: "Maio", entrada: 209, saida: 130 },
        { month: "Junho", entrada: 214, saida: 140 },
    ]

    const chartConfig = {
        entrada: {
            label: "Entrada",
            color: "#22c55e",
        },
        saida: {
            label: "Saída",
            color: "#ef4444",
        },
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader>
                <CardTitle>Comparação dos últimos 6 mêses</CardTitle>
                <CardDescription>Janeiro - Junho 2025</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <BarChart accessibilityLayer data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dashed" />}
                        />
                        <Bar dataKey="entrada" fill="var(--color-entrada)" radius={4} />
                        <Bar dataKey="saida" fill="var(--color-saida)" radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
