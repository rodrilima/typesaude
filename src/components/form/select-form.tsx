import { TSelectOption } from "@/types/form";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useFormContext } from "react-hook-form";
import { FormField, FormItem, FormMessage } from "../ui/form";

interface SelectFormProps {
  label: string;
  options?: TSelectOption[];
  name: string;
}

export function SelectForm({ name, label, options = [] }: SelectFormProps) {
  const { control } = useFormContext()

  return <FormField
    control={control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="col-span-1 text-right">{label}</Label>
          <Select name={field.name} value={field.value} onValueChange={field.onChange} disabled={field.disabled} >
            <SelectTrigger className="col-span-3" onBlur={field.onBlur} ref={field.ref}>
              <SelectValue placeholder="Escolha uma opção" />
            </SelectTrigger>
            <SelectContent>
              {options.map(option => (
                <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <FormMessage className="text-right" />
      </FormItem>
    )}
  />
}