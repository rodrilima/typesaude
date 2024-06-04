import { Button } from "@/components/ui/button";
import { config } from "./config";
import { prisma } from "@/lib/prisma";

export default async function Home() {
  const users = await prisma.user.findMany()

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">{config.conteudo.tabela.titulo}</h1>
          <p className="text-sm">{config.conteudo.tabela.descricao}</p>
        </div>
        <Button>{config.conteudo.tabela.botaoNovo}</Button>
      </div>
      <div>
        {users.map(user => (
          <div key={user.id}>{user.id} {user.name} {user.email}</div>
        ))}
      </div>
    </div>
  );
}
