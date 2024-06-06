"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useToast } from "../ui/use-toast";

interface LoginFormProps { }

export function LoginForm({ }: LoginFormProps) {
  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get("email")
    const password = formData.get("password")

    const response = await signIn("credentials", {
      email,
      password,
      redirect: false
    })

    if (response?.status === 200) {
      return router.push('/')
    }

    if (response?.status === 401) {
      return toast({
        title: "Usuário ou senha inválidos.",
        variant: "destructive"
      })
    }

    toast({
      title: "Erro no servidor de autenticação. Tente novamente mais tarde.",
      variant: "destructive"
    })
  }

  return <form className="w-full space-y-3 my-5" onSubmit={handleSubmit}>
    <Input placeholder="Email" className="w-full" type="email" name="email" />
    <Input placeholder="Senha" className="w-full" type="password" name="password" />
    <Button className="w-full">Entrar</Button>
  </form>
}