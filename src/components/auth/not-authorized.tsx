interface NotAuthorizedProps { }

export function NotAuthorized({ }: NotAuthorizedProps) {
  return <div className="p-5">
    Você não tem autorização para acessar essa página.
  </div>
}