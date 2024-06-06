import { InputForm } from "@/components/form/input-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";

interface SheetFormProps { }

export function SheetForm({ }: SheetFormProps) {
  return <SheetContent className="min-w-[550px]">
    <SheetHeader>
      <SheetTitle>Novo Usuário</SheetTitle>
      <SheetDescription>Adicione um novo usuário</SheetDescription>
    </SheetHeader>
    <ScrollArea className="h-[calc(100vh-100px)]">
      <form className="py-4 px-2 space-y-2">
        <InputForm label="Nome" name="name" />
        <InputForm label="Email" name="email" type="email" />
        <InputForm label="Senha" name="password" type="password" />
        <div className="flex justify-end">
          <Button className="w-32">Salvar</Button>
        </div>
      </form>
    </ScrollArea>
  </SheetContent>
}