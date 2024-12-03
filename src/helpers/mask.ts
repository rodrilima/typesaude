import { IMaskMixinProps, IMask } from "react-imask";

export const cpfMask = "000.000.000-00"
export const phoneMask = [
  {
    mask: "+000 (00) 0000-0000",
    lazy: false,
  },
  {
    mask: "+000 (00) 00000-0000",
    lazy: false,
  },
]

export function applyMask<T>(value: T, mask: IMaskMixinProps<HTMLInputElement>["mask"]) {
  if(typeof value !== "string") return value;
  const maskValue = IMask.createMask({ mask: mask as string })
  maskValue.resolve(value)
  return maskValue.value
}