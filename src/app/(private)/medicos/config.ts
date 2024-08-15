import { createDoctorValidation, updateDoctorValidation } from "@/validations/doctors.validation"
export type { Doctor as Model } from "@prisma/client"
export * as actions from "@/actions/doctors"

export const config = {
  conteudo: {
    tabela: {
      titulo: "Médicos",
      descricao: "Faça o controle dos médicos da sua clínica",
      botaoNovo: "Novo Médico"
    },
    formulario: {
      tituloNovo: "Novo Médico",
      descricaoNovo: "Adicione um novo médico",
      tituloEdicao: "Dados do Médico",
      descricaoEdicao: "Visualize e edite as informações do Médico"
    },
  },
  schemas: {
    create: createDoctorValidation,
    update: updateDoctorValidation
  },
  columnVisibility: {
    createdAt: false
  }
}