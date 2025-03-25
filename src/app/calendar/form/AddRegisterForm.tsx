import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerForm = z.object({
  quantity: z.number().min(1),
  type: z.string(),
  pointSale: z.string(),
});

type RegisterForm = z.infer<typeof registerForm>;

export function RegisterForm() {
  const { register, handleSubmit, formState, setValue } = useForm<RegisterForm>(
    {
      resolver: zodResolver(registerForm),
      defaultValues: {
        quantity: 1,
        type: "",
        pointSale: "",
      },
    }
  );

  function handleFormSubmit(data: RegisterForm) {
    console.log(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-y-3 mt-5 *:w-full"
    >
      <div className="flex flex-col space-y-2">
        <Label htmlFor="name">Quantidade</Label>
        <Input
          id="quantity"
          placeholder="informe a quantidade"
          {...register("quantity")}
        />
        <p>{formState.errors.quantity?.message}</p>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="framework">Selecione o tipo</Label>
        <Select onValueChange={(value) => setValue("type", value)}>
          <SelectTrigger className="w-full" id="framework">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="income">Entrada</SelectItem>
            <SelectItem value="outome">Saída</SelectItem>
          </SelectContent>
        </Select>
        <p>{formState.errors.type?.message}</p>
      </div>

      <div className="flex flex-col space-y-2">
        <Label htmlFor="framework">Selecione o ponto</Label>
        <Select onValueChange={(value) => setValue("pointSale", value)}>
          <SelectTrigger className="w-full" id="tipo">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectGroup>
            <SelectContent>
              <SelectItem value="ponto-a">Ponto Tears</SelectItem>
              <SelectItem value="ponto-b">Ponto Barão</SelectItem>
              <SelectItem value="pedido">Ponto Exemplo</SelectItem>
            </SelectContent>
          </SelectGroup>
        </Select>
        <p>{formState.errors.pointSale?.message}</p>
      </div>

      <div>
        <Button type="submit" className="w-full">
          Enviar
        </Button>
      </div>
    </form>
  );
}
