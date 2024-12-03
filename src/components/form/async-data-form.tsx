import { DefaultReturn, ErrorReturn } from "@/types/actions/_general"
import { TSelectOption } from "@/types/form"
import { useEffect, useState } from "react"

interface AsyncDataFormProps {
  render: (options: TSelectOption[]) => JSX.Element,
  fetchFn: () => Promise<DefaultReturn<TSelectOption[]> | ErrorReturn>
}

export function AsyncDataForm({ fetchFn, render }: AsyncDataFormProps) {
  const [options, setOptions] = useState<TSelectOption[]>([])

  useEffect(() => {
    fetchFn().then(response => {
      if ("error" in response) {
        console.error(response.error)
        return;
      }
      setOptions(response.data)
    })
  }, [fetchFn])

  return render(options)
}