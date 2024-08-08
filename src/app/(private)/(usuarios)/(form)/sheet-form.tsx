"use client"

import { InputForm } from "@/components/form/input-form";
import { SelectForm } from "@/components/form/select-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { actions, config, Model } from "../config";
import { FormProvider, useForm } from "react-hook-form";
import { ROLES } from "@/enums/roles";
import { defaultValues } from "./defaultValues";
import { zodResolver } from "@hookform/resolvers/zod"
import { useToast } from "@/components/ui/use-toast";
import { ImageForm } from "@/components/form/image-form";
import { create as createDocument, update as updateDocument } from "@/actions/documents";

interface SheetFormProps {
  dataToUpdate?: Partial<Model>
}

export function SheetForm({ dataToUpdate }: SheetFormProps) {
  const form = useForm<Partial<Model & { avatarFile: File }>>({
    defaultValues: dataToUpdate || defaultValues,
    resolver: zodResolver(dataToUpdate ? config.schemas.update : config.schemas.create)
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

    const avatarFile = form.getValues('avatarFile')

    if (!avatarFile) {
      return toast({
        title: "Salvo com sucesso",
        variant: "success"
      })
    }

    toast({
      title: "Dados salvos, atualizando avatar...",
      variant: "default"
    })

    await uploadAvatar(avatarFile, response.data.id.toString())
  }

  async function uploadAvatar(file: File, userId: string) {
    const fn = dataToUpdate?.avatar?.id ? updateDocument : createDocument

    const formData = new FormData()
    formData.append('file', file)
    formData.set('userId', userId)
    formData.set('path', 'avatar')

    if (dataToUpdate?.avatar?.id) {
      formData.set('id', dataToUpdate.avatar.id.toString())
    }

    const response = await fn(formData)

    if ("error" in response) {
      return toast({
        title: response.error,
        variant: "destructive"
      })
    }

    toast({
      title: "Dados e avatar salvos com sucesso",
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
          <InputForm label="Email" name="email" type="email" />
          <InputForm label="Senha" name="password" type="password" />
          <SelectForm name="role" label="Cargo" options={[
            { label: "Administrador", value: ROLES.ADMIN },
            { label: "Editor", value: ROLES.EDITOR },
            { label: "Visitante", value: ROLES.VIEWER },
          ]} />
          <ImageForm name="avatarFile" label="Avatar" defaultPreview={form.getValues('avatar.url')} />
          <div className="flex justify-end">
            <Button type="submit" className="w-32">Salvar</Button>
          </div>
        </form>
      </FormProvider>
    </ScrollArea>
  </SheetContent>
}