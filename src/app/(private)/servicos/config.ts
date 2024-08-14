import { createServiceValidation, updateServiceValidation } from "@/validations/services.validation"
export type { Service as Model } from "@prisma/client"
export * as actions from "@/actions/services"

export const config = {
  conteudo: {
    tabela: {
      titulo: "Serviços Médicos",
      descricao: "Faça o controle dos serviços da sua clínica",
      botaoNovo: "Novo Serviço"
    },
    formulario: {
      tituloNovo: "Novo Serviço",
      descricaoNovo: "Adicione um novo serviço",
      tituloEdicao: "Dados do Serviço",
      descricaoEdicao: "Visualize e edite as informações do serviço"
    },
  },
  schemas: {
    create: createServiceValidation,
    update: updateServiceValidation
  },
  columnVisibility: {
    description: false,
    createdAt: false
  }
}