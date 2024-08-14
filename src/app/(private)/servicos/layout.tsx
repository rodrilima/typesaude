import { NotAuthorized } from "@/components/auth/not-authorized"
import { authOptions } from "@/config/authOptions"
import { ROLES } from "@/enums/roles"
import { getServerSession } from "next-auth"

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (session?.user.role !== ROLES.ADMIN) {
    return <NotAuthorized />
  }

  return <>{children}</>
}