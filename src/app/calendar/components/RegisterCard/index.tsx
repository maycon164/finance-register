import { Card, CardContent } from "@/components/ui/card";
import { RegisterType } from "@/models";
import { ArrowDown, ArrowUp } from "lucide-react";

interface RegisterCardProps {
  type: RegisterType;
  value: number;
  username: string;
}

export function RegisterCard(props: Readonly<RegisterCardProps>) {
  const { type, value, username } = props;

  const isIncome = type === RegisterType.INCOME;

  return (
    <Card className="w-full max-w-sm shadow-md border border-gray-200">
      <CardContent className="flex flex-col ">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {isIncome ? "Entrada" : "Saída"}
          </h3>
          {isIncome ? (
            <ArrowUp className="text-green-500" />
          ) : (
            <ArrowDown className="text-red-500" />
          )}
        </div>
        <p className="text-xl font-bold ${isIncome ? 'text-green-600' : 'text-red-600'}">
          ${value.toFixed(2)}
        </p>
        <p className="text-sm text-gray-500">Registered by: {username}</p>
      </CardContent>
    </Card>
  );
}
