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
import { useAddRegister } from "../api/add-register";
import { toast } from "sonner";

const registerForm = z.object({
  quantity: z.string().min(1),
  description: z.string().optional(),
  type: z.string(),
  pointSale: z.string(),
  register: z.date(),
});

export type RegisterForm = z.infer<typeof registerForm>;

export function RegisterForm({ date }: Readonly<{ date: Date }>) {
  const { register, handleSubmit, formState, setValue } = useForm<RegisterForm>(
    {
      resolver: zodResolver(registerForm),
      defaultValues: {
        quantity: "1",
        type: "",
        pointSale: "",
        register: date,
        description: "",
      },
    }
  );

  const addRegister = useAddRegister({
    onSuccess: () => {
      toast.success("Registro adicionado com sucesso", {
        description: "O registro foi adicionado com sucesso.",
      });
    },
    onError: () => {
      toast.error("Erro ao adicionar registro", {
        description: "Tente novamente mais tarde.",
      });
    },
  });

  function handleFormSubmit(data: RegisterForm) {
    console.log(data);
    addRegister.mutate(data);
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col gap-y-3 mt-5 *:w-full"
    >
      <div className="flex flex-col space-y-2">
        <Label htmlFor="name">Quantia</Label>
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
