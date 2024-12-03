import { useFormContext } from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { IMaskMixin, IMaskMixinProps } from "react-imask"

interface InputMaskFormProps {
  label: string;
  name: string;
  mask: IMaskMixinProps<HTMLInputElement>["mask"];
}

export function InputMaskForm({ label, ...props }: InputMaskFormProps & InputProps) {
  const { control } = useFormContext()

  return <FormField
    control={control}
    name={props.name}
    render={({ field: { ref, ...field }, fieldState }) => {
      return (
        <FormItem>
          <div className="grid grid-cols-4 items-center gap-4">
            <FormLabel className="col-span-1 text-right">{label}</FormLabel>
            <FormControl>
              <MaskedInput
                className={`col-span-3 ${fieldState.error ? "border-red-500" : ""}`}
                placeholder={label}
                {...props}
                {...field}
                onAccept={(value: string) => field.onChange(value)}
              />
            </FormControl>
          </div>
          <FormMessage className="text-right" />
        </FormItem>
      )
    }}
  />
}

const MaskedInput = IMaskMixin(({ inputRef, ...props }) => (
  <Input
    {...props}
    ref={inputRef as React.LegacyRef<HTMLInputElement>}
  />
));