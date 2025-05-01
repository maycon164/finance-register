import { Card, CardContent } from "@/components/ui/card";
import { RegisterType } from "@/models";
import { formatToBRL } from "@/utils";

interface RegisterCardProps {
  type: RegisterType;
  value: number;
  email?: string;
}

export function RegisterCard(props: Readonly<RegisterCardProps>) {
  const { type, value, email } = props;

  const isIncome = type === RegisterType.INCOME;
  return (
    <Card
      className={`w-full max-w-sm shadow-md rounded-none border-l-4 border-l-${
        isIncome ? "green" : "red"
      }-600`}
    >
      <CardContent className="flex flex-col">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {isIncome ? "ENTRADA" : "SAIDA"}
          </h3>

          <p
            className={`text-xl font-bold text-${
              isIncome ? "green" : "red"
            }-600`}
          >
            {formatToBRL(isIncome ? value : value * -1)}
          </p>
        </div>

        <p className="text-sm text-gray-500">Registrado por: {email}</p>
      </CardContent>
    </Card>
  );
}
