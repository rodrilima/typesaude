import { createValidation, updateValidation } from "@/validations/_model.validation"
export type { Service as Model } from "@prisma/client"
export * as actions from "@/actions/_model"

export const config = {
  conteudo: {
    tabela: {
      titulo: "MODELO",
      descricao: "Faça o controle dos MODELO da sua clínica",
      botaoNovo: "Novo MODELO"
    },
    formulario: {
      tituloNovo: "Novo MODELO",
      descricaoNovo: "Adicione um novo MODELO",
      tituloEdicao: "Dados do MODELO",
      descricaoEdicao: "Visualize e edite as informações do MODELO"
    },
  },
  schemas: {
    create: createValidation,
    update: updateValidation
  },
  columnVisibility: {
    createdAt: false
  }
}