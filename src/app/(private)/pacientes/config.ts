import { createPatientValidation, updatePatientValidation } from "@/validations/patients.validation"
export type { Patient as Model } from "@prisma/client"
export * as actions from "@/actions/patients"

export const config = {
  conteudo: {
    tabela: {
      titulo: "Pacientes",
      descricao: "Faça o controle dos pacientes da sua clínica",
      botaoNovo: "Novo Paciente"
    },
    formulario: {
      tituloNovo: "Novo Paciente",
      descricaoNovo: "Adicione um novo paciente",
      tituloEdicao: "Dados do paciente",
      descricaoEdicao: "Visualize e edite as informações do paciente"
    },
  },
  schemas: {
    create: createPatientValidation,
    update: updatePatientValidation
  },
  columnVisibility: {
    createdAt: false
  }
}