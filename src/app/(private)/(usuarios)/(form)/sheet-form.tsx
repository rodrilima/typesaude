"use client"

import { InputForm } from "@/components/form/input-form";
import { SelectForm } from "@/components/form/select-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { config, Model } from "../config";
import { FormProvider, useForm } from "react-hook-form";
import { ROLES } from "@/enums/roles";
import { defaultValues } from "./defaultValues";

interface SheetFormProps {
  dataToUpdate?: Partial<Model>
}

export function SheetForm({ dataToUpdate }: SheetFormProps) {
  const form = useForm({
    defaultValues
  })

  const titulo = dataToUpdate
    ? config.conteudo.formulario.tituloEdicao
    : config.conteudo.formulario.tituloNovo

  const descricao = dataToUpdate
    ? config.conteudo.formulario.descricaoEdicao
    : config.conteudo.formulario.descricaoNovo

  async function handleSubmit(data: any) {
    console.info(data)
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
          <InputForm label="Email" name="email" type="email" />
          <InputForm label="Senha" name="password" type="password" />
          <SelectForm name="role" label="Cargo" options={[
            { label: "Administrador", value: ROLES.ADMIN },
            { label: "Editor", value: ROLES.EDITOR },
            { label: "Visitante", value: ROLES.VIEWER },
          ]} />
          <div className="flex justify-end">
            <Button type="submit" className="w-32">Salvar</Button>
          </div>
        </form>
      </FormProvider>
    </ScrollArea>
  </SheetContent>
}