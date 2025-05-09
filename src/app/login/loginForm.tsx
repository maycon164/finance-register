"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { z } from "zod";
import { LoginResponseSuccess, useMakeLogin } from "./api/make-login";
import { Loading } from "@/components/loading";
import { toast } from "sonner";
import { ShieldAlert } from "lucide-react";

const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const ctx = useAppContext();

  const login = useMakeLogin({
    onSuccess: onLoginSuccess,
    onError: onLoginError,
  });

  function handleLogin(data: LoginFormSchema) {
    login.mutate(data);
  }

  function onLoginSuccess(response: LoginResponseSuccess) {
    ctx?.setToken(response.token);
    router.push("/calendar");
  }

  function onLoginError(error: string) {
    //TODO: add if based on status code
    toast.error("Erro ao Autenticar", {
      description: "Usuário não encontrado ou senha incorreta.",
      icon: <ShieldAlert />,
    });
  }

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="grid gap-2 w-80">
      <div>
        <Input type="email" placeholder="Email" {...register("email")} />
      </div>

      <div>
        <Input type="password" placeholder="Senha" {...register("password")} />
      </div>

      <div>
        <p className="text-gray-400 text-sm tracking-wide text-right">
          <Link href="forgot-password">Esqueceu sua senha? </Link>
        </p>
      </div>

      <div>
        <Button className="w-full py-5 text-lg">
          {login.isPending ? <Loading /> : "Entrar"}
        </Button>
      </div>
    </form>
  );
}
