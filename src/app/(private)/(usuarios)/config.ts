export type { User as Model } from "@prisma/client"
export * as actions from "@/actions/users"

export const config = {
  conteudo: {
    tabela: {
      titulo: "Listagem de Usuários",
      descricao: "Faça o controle dos usuários do sistema",
      botaoNovo: "Novo Usuário"
    },
    formulario: {
      tituloNovo: "Novo Usuário",
      descricaoNovo: "Adicione um novo usuário",
      tituloEdicao: "Dados do Usuário",
      descricaoEdicao: "Visualize e edite as informações do usuário"
    }
  }
}