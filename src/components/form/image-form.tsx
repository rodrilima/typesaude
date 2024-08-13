"use client"

import { useFormContext } from "react-hook-form";
import { Input, InputProps } from "../ui/input";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { buttonVariants } from "../ui/button";
import { useEffect, useState } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";

interface ImageFormProps {
  label: string;
  name: string;
  defaultPreview?: string;
}

export function ImageForm({ label, defaultPreview, ...props }: ImageFormProps & InputProps) {
  const [preview, setPreview] = useState(defaultPreview)

  const { control, setValue, watch } = useFormContext()

  const imageFile = watch(props.name)

  function handleImage(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return;
    setValue(props.name, file)
  }

  useEffect(() => {
    if (!imageFile) return;
    const tempUrl = URL.createObjectURL(imageFile)
    setPreview(tempUrl)

    return () => {
      URL.revokeObjectURL(tempUrl)
    }
  }, [imageFile])

  return <FormField
    control={control}
    name={props.name}
    render={() => (
      <FormItem>
        <div className="grid grid-cols-4 items-center gap-4">
          <FormLabel className="col-span-1 text-right">{label}</FormLabel>
          <Input
            className="hidden"
            placeholder={label}
            type="file"
            accept="image/*"
            id={props.name}
            onChange={handleImage}
            {...props}
          />
          <label htmlFor={props.id || props.name} className="cursor-pointer">
            {
              preview
                ? <Avatar className="w-16 h-16">
                  <AvatarImage src={preview} />
                </Avatar>
                : <div className={buttonVariants({ variant: "outline" })}>Escolher Imagem</div>
            }
          </label>
        </div>
        <FormMessage className="text-right" />
      </FormItem>
    )}
  />
}