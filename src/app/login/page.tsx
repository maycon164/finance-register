"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Facebook, Github } from "lucide-react";
import { LoginForm } from "./loginForm";

export default function LoginPage() {
  return (
    <section>
      <div className="flex flex-col items-center gap-5 p-5 mt-[10vh]">
        <Avatar className="w-30 h-30">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="*:text-center">
          <h1 className="text-2xl ">Faça login</h1>
          <p className="text-gray-400 text-sm tracking-wide">
            Acesse o sistema para registrar suas finanças
          </p>
        </div>

        <LoginForm />

        <p className="text-gray-400 text-sm tracking-wide text-center">
          Não tem uma conta? &nbsp;
          <span className="text-blue-600">Se Inscreva</span>
        </p>

        <div className="text-center">
          <p>Ou acesse com</p>
          <div className="flex gap-2 justify-center">
            <Facebook size={28} />
            <Github size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}
