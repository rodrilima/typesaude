import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";

interface InputFormProps {
  label: string;
}

export function InputForm({ label, ...pros }: InputFormProps & InputProps) {
  return <div className="grid grid-cols-4 items-center gap-4">
    <Label className="col-span-1 text-right">{label}</Label>
    <Input className="col-span-3" placeholder={label} {...pros} />
  </div>
}