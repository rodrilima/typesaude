import { TSelectOption } from "@/types/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

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
    render={({ field, fieldState }) => (
      <FormItem>
        <div className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="col-span-1 text-right">{label}</FormLabel>
          <FormControl>
            <Select name={field.name} value={field.value || ""} onValueChange={field.onChange} disabled={field.disabled} >
              <SelectTrigger className={`col-span-3 ${fieldState.error ? "border-red-500" : ""}`} onBlur={field.onBlur} ref={field.ref}>
                <SelectValue placeholder="Escolha uma opção" />
              </SelectTrigger>
              <SelectContent className="max-h-56">
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormControl>
        </div>
        <FormMessage className="text-right" />
      </FormItem>
    )}
  />
}