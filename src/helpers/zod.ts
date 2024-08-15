import { z } from "zod";

export function zEmptyString(data: any) {
  return z.union([
    data,
    z.literal("")
  ])
}