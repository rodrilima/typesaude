import { Model } from "../config";

export const defaultValues: Partial<Model & { password: string }> = {
  name: "",
  description: "",
  duration: 0,
  price: 0
}