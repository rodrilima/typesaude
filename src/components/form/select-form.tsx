import { TSelectOption } from "@/types/form";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface SelectFormProps {
  label: string;
  options?: TSelectOption[];
}

export function SelectForm({ label, options = [] }: SelectFormProps) {
  return <div className="grid grid-cols-4 items-center gap-4">
    <Label className="col-span-1 text-right">{label}</Label>
    <Select>
      <SelectTrigger className="col-span-3">
        <SelectValue placeholder="Escolha uma opção" />
      </SelectTrigger>
      <SelectContent>
        {options.map(option => (
          <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
}