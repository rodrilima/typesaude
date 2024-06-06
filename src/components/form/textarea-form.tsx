import { Label } from "../ui/label";
import { Textarea, TextareaProps } from "../ui/textarea";

interface TextareaFormProps {
  label: string;
}

export function TextareaForm({ label, ...props }: TextareaFormProps & TextareaProps) {
  return <div className="grid grid-cols-4 items-center gap-4">
    <Label className="col-span-1 text-right">{label}</Label>
    <Textarea className="col-span-3" placeholder={label} {...props} />
  </div>
}