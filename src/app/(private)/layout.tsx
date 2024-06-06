import { AvatarDropdown } from "@/components/layout/avatar-dropdown";
import { Sidebar } from "@/components/layout/sidebar";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return <div className="flex flex-col">
    <div className="fixed h-16 w-full border-b flex items-center justify-between px-10 bg-white">
      <div className="w-10">
        <Image src="/images/logo.png" width={500} height={500} alt="logo" />
      </div>
      <AvatarDropdown session={session} />
    </div>
    <div className="flex flex-row h-screen pt-16 items-start">
      <Sidebar />
      <main className="w-full max-w-[calc(100vw-200px)]">{children}</main>
    </div>
  </div>
}