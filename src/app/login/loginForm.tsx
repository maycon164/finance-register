"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppContext } from "@/context";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { z } from "zod";

const loginFormSchema = z.object({ 
  email: z.string().email(),
  password: z.string().min(6)
})

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export function LoginForm() {

    const {register, handleSubmit} = useForm<LoginFormSchema>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

    const router = useRouter();

    const ctx = useAppContext();
    
    function handleLogin(data: LoginFormSchema) {
        const { email } = data;
        const users = ["david@email.com", "maycon@email.com", "suzana@email", "ana@email.com", "stifani@email.com", "jean@email.com", "jessica@email.com"]
        
        console.log(users.includes(email))
        console.log(email)
        
        if(users.includes(email)) { 

            ctx?.setUser({name: email.split("@")[0], email})
            router.push("/calendar")
        }

    }

   return  <form onSubmit={handleSubmit(handleLogin)} className="grid gap-2 w-80">
          
    <div>
      <Input type="email" placeholder="Email" {...register("email")}/>
    </div>

    <div>
      <Input type="password" placeholder="Senha" {...register("password")}/>
    </div>

    <div>
      <p className="text-gray-400 text-sm tracking-wide text-right">
        <Link href="forgot-password">Esqueceu sua senha? </Link>
      </p>
    </div>

    <div>
      <Button className="w-full py-5 text-lg">
        Entrar
      </Button>
    </div>

  </form>
}