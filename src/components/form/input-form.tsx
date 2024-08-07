import { useFormContext } from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import { Label } from "../ui/label";
import { FormField, FormItem, FormMessage } from "../ui/form";

interface InputFormProps {
  label: string;
  name: string;
}

export function InputForm({ label, ...props }: InputFormProps & InputProps) {
  const { control } = useFormContext()

  return <FormField
    control={control}
    name={props.name}
    render={({ field }) => (
      <FormItem>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label className="col-span-1 text-right">{label}</Label>
          <Input className="col-span-3" placeholder={label} {...props} {...field} />
        </div>
        <FormMessage className="text-right" />
      </FormItem>
    )}
  />
}