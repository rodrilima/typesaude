import { Button } from "@/components/ui/button";
import { config } from "../config";
import { Table } from "./table";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { SheetForm } from "../(form)/sheet-form";
import { find } from "@/actions/users";

export default async function Home() {
  const users = await find()

  if ("error" in users) {
    return users.error
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">{config.conteudo.tabela.titulo}</h1>
          <p className="text-sm">{config.conteudo.tabela.descricao}</p>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button>{config.conteudo.tabela.botaoNovo}</Button>
          </SheetTrigger>
          <SheetForm />
        </Sheet>
      </div>
      <div>
        <Table data={users.data} />
      </div>
    </div>
  );
}
