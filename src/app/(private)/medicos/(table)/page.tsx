import { Button } from "@/components/ui/button";
import { actions, config } from "../config";
import { Table } from "./table";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { SheetForm } from "../(form)/sheet-form";
import { getServerSession } from "next-auth";
import { authOptions } from "@/config/authOptions";
import { canRoleEdit } from "@/helpers/roles";

export default async function Home() {
  const findReturn = await actions.find()
  const session = await getServerSession(authOptions)

  if ("error" in findReturn) {
    return findReturn.error
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">{config.conteudo.tabela.titulo}</h1>
          <p className="text-sm">{config.conteudo.tabela.descricao}</p>
        </div>
        {canRoleEdit(session?.user.role) && <Sheet>
          <SheetTrigger asChild>
            <Button>{config.conteudo.tabela.botaoNovo}</Button>
          </SheetTrigger>
          <SheetForm session={session} />
        </Sheet>}
      </div>
      <div>
        <Table data={findReturn.data} />
      </div>
    </div>
  );
}
