"use client"

import { InputForm } from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { actions, config, Model } from "../config";
import { FormProvider, useForm } from "react-hook-form";
import { defaultValues } from "./defaultValues";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast";
import { TextareaForm } from "@/components/form/textarea-form";
import { Session } from "next-auth";
import { canRoleEdit } from "@/helpers/roles";
import { InputMaskForm } from "@/components/form/input-mask-form";
import { cpfMask, phoneMask } from "@/helpers/mask";

interface SheetFormProps {
  dataToUpdate?: Partial<Model>
  session: Session | null
}

export function SheetForm({ dataToUpdate, session }: SheetFormProps) {
  const form = useForm<Partial<Model>>({
    defaultValues: dataToUpdate || defaultValues,
    resolver: zodResolver(dataToUpdate ? config.schemas.update : config.schemas.create),
    disabled: !canRoleEdit(session?.user.role)
  })

  const { toast } = useToast()

  const titulo = dataToUpdate
    ? config.conteudo.formulario.tituloEdicao
    : config.conteudo.formulario.tituloNovo

  const descricao = dataToUpdate
    ? config.conteudo.formulario.descricaoEdicao
    : config.conteudo.formulario.descricaoNovo

  async function handleSubmit(data: any) {
    const fn = dataToUpdate ? actions.update : actions.create

    const response = await fn(data)

    if ("error" in response) {
      return toast({
        title: response.error,
        variant: "destructive"
      })
    }

    return toast({
      title: "Salvo com sucesso",
      variant: "success"
    })
  }

  return <SheetContent className="w-full md:min-w-[550px]">
    <SheetHeader>
      <SheetTitle>{titulo}</SheetTitle>
      <SheetDescription>{descricao}</SheetDescription>
    </SheetHeader>
    <ScrollArea className="h-[calc(100vh-100px)]">
      <FormProvider {...form}>
        <form className="py-4 px-2 space-y-2" onSubmit={form.handleSubmit(handleSubmit)}>
          <InputForm label="Nome" name="name" />
          <InputMaskForm label="CPF" name="cpf" mask={cpfMask} />
          <InputForm label="CRM" name="crm" />
          <InputForm label="Email" name="email" />
          <InputMaskForm label="Telefone" name="phone" mask={phoneMask} />
          <div className="flex justify-end">
            {canRoleEdit(session?.user.role) && <Button type="submit" className="w-32">Salvar</Button>}
          </div>
        </form>
      </FormProvider>
    </ScrollArea>
  </SheetContent>
}