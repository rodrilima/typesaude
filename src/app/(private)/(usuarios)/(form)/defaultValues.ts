import { ROLES } from "@/enums/roles";
import { Model } from "../config";

export const defaultValues: Partial<Model & { password: string }> = {
  name: "",
  email: "",
  role: ROLES.VIEWER,
  password: ""
}