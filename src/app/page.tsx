import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Github } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return <section>
      
      <div className="flex flex-col items-center gap-5 p-5 mt-[10vh]">
        
        <Avatar className="w-30 h-30">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="*:text-center">
          <h1 className="text-2xl ">
            Faça login
          </h1>
          <p className="text-gray-400 text-sm tracking-wide">
            Acesse o sistema para registrar suas finanças
          </p>
        </div>

        <form action="" className="grid gap-2 w-80">
          
          <div>
            <Input type="email" placeholder="Email" />
          </div>

          <div>
            <Input type="password" placeholder="Senha" />
          </div>

          <div>
            <p className="text-gray-400 text-sm tracking-wide text-right">
              <Link href="forgot-password">Esqueceu sua senha?</Link>
            </p>
          </div>

          <div>
            <Button className="w-full py-5 text-lg">
              Entrar
            </Button>
          </div>

          <p className="text-gray-400 text-sm tracking-wide text-center">
            Não tem uma conta? &nbsp;
              <span className="text-blue-600">
                  Se Inscreva
              </span>
          </p>

          <div className="text-center">
            <p>Ou acesse com</p>
            <div className="flex gap-2 justify-center">
              <Facebook size={28} />
              <Github size={28} />
            </div>
          </div>

        </form>

      </div>

  </section>
}
