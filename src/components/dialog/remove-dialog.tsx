"use client"

import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

interface RemoveDialogProps {
  removeFn: React.MouseEventHandler<HTMLButtonElement>
}

export function RemoveDialog({ removeFn }: RemoveDialogProps) {
  return <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
      <AlertDialogDescription>
        Tem certeza que deseja remover esse(s) registro(s)? Essa operação não poderá ser revertida.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancelar</AlertDialogCancel>
      <AlertDialogAction
        onClick={removeFn}
        className="bg-destructive text-destructive-foreground hover:bg-destructive/80"
      >Remover</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
}