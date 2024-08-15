import { Model } from "../config";

export const defaultValues: Partial<Model & { password: string }> = {
  name: "",
  cpf: "",
  crm: "",
  phone: "",
  email: "",
}