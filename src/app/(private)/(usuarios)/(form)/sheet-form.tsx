import { InputForm } from "@/components/form/input-form";
import { SelectForm } from "@/components/form/select-form";
import { TextareaForm } from "@/components/form/textarea-form";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { config, Model } from "../config";

interface SheetFormProps {
  dataToUpdate?: Partial<Model>
}

export function SheetForm({ dataToUpdate }: SheetFormProps) {
  const titulo = dataToUpdate
    ? config.conteudo.formulario.tituloEdicao
    : config.conteudo.formulario.tituloNovo

  const descricao = dataToUpdate
    ? config.conteudo.formulario.descricaoEdicao
    : config.conteudo.formulario.descricaoNovo

  return <SheetContent className="w-full md:min-w-[550px]">
    <SheetHeader>
      <SheetTitle>{titulo}</SheetTitle>
      <SheetDescription>{descricao}</SheetDescription>
    </SheetHeader>
    <ScrollArea className="h-[calc(100vh-100px)]">
      <form className="py-4 px-2 space-y-2">
        <InputForm label="Nome" name="name" />
        <InputForm label="Email" name="email" type="email" />
        <InputForm label="Senha" name="password" type="password" />
        <InputForm label="Data" name="date" type="date" />
        <TextareaForm label="Descrição" name="description" />
        <SelectForm label="Cargo" options={[
          { label: "ADMIN", value: "ADMIN" },
          { label: "EDITOR", value: "EDITOR" },
        ]} />
        <div className="flex justify-end">
          <Button className="w-32">Salvar</Button>
        </div>
      </form>
    </ScrollArea>
  </SheetContent>
}