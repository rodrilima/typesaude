import { useFormContext } from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

interface InputFormProps {
  label: string;
  name: string;
}

export function InputForm({ label, ...props }: InputFormProps & InputProps) {
  const { control } = useFormContext()

  return <FormField
    control={control}
    name={props.name}
    render={({ field, fieldState }) => (
      <FormItem>
        <div className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="col-span-1 text-right">{label}</FormLabel>
          <FormControl>
            <Input
              className={`col-span-3 ${fieldState.error ? "border-red-500" : ""}`}
              placeholder={label}
              {...props}
              {...field}
              value={field.value || ""}
            />
          </FormControl>
        </div>
        <FormMessage className="text-right" />
      </FormItem>
    )}
  />
}