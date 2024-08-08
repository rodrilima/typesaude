import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Textarea, TextareaProps } from "../ui/textarea";

interface TextareaFormProps {
  label: string;
  name: string;
}

export function TextareaForm({ label, ...props }: TextareaFormProps & TextareaProps) {
  const { control } = useFormContext()

  return <FormField
    control={control}
    name={props.name}
    render={({ field, fieldState }) => (
      <FormItem>
        <div className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="col-span-1 text-right">{label}</FormLabel>
          <FormControl>
            <Textarea
              className={`col-span-3 ${fieldState.error ? "border-red-500" : ""}`}
              placeholder={label}
              {...props}
              {...field}
              value={field.value || ""}
            />
          </FormControl>
        </div>
      </FormItem>
    )}
  />
}