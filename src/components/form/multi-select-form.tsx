import { TSelectOption } from "@/types/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { X } from "lucide-react";

interface MultiSelectFormProps {
  label: string;
  options?: TSelectOption[];
  name: string;
}

export function MultiSelectForm({ name, label, options = [] }: MultiSelectFormProps) {
  const { control, getValues, watch } = useFormContext()

  const { append, remove, fields } = useFieldArray({
    name,
    control
  })

  function getOptionLabel(index: number) {
    const data = getValues(`${name}.${index}`)
    return options.find(option => +option.value === +data?.id)?.label
  }

  const selectedIds = watch("services")?.map((field: { id: string }) => field.id) as string[] ?? []
  const filteredOptions = options.filter(option => !selectedIds.includes(option.value))

  return <div className="grid grid-cols-4 items-start gap-4">
    <Label className="col-span-1 text-right pt-3">{label}</Label>
    <div className="col-span-3">
      <Select value="" onValueChange={value => append({ id: value })}>
        <SelectTrigger>
          <SelectValue placeholder="Escolha uma opção" />
        </SelectTrigger>
        <SelectContent className="max-h-56">
          {filteredOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center gap-2">
            <div className="flex-1 text-sm">{getOptionLabel(index)}</div>
            <Button variant="ghost" size="icon" type="button" onClick={() => remove(index)}>
              <X size={12} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  </div>
}