import { Button } from "@/components/ui/button";
import { config } from "./config";

export default function Home() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-3xl font-bold">{config.conteudo.tabela.titulo}</h1>
          <p className="text-sm">{config.conteudo.tabela.descricao}</p>
        </div>
        <Button>{config.conteudo.tabela.botaoNovo}</Button>
      </div>
      <div>Conteúdo</div>
    </div>
  );
}
