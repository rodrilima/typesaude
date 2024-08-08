import { createUserValidation, updateUserValidation } from "@/validations/users.validation"
export type { UserItemReturn as Model } from "@/types/actions/users"
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
    },
  },
  schemas: {
    create: createUserValidation,
    update: updateUserValidation
  }
}