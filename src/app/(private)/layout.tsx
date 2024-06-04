import { AvatarDropdown } from "@/components/layout/avatar-dropdown";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col">
    <div className="fixed h-16 w-full border-b flex items-center justify-between px-10">
      <div className="w-10">
        <Image src="/images/logo.png" width={500} height={500} alt="logo" />
      </div>
      <AvatarDropdown />
    </div>
    <div className="flex flex-row h-screen pt-16">
      <div className="h-full w-64 border-r">Sidebar</div>
      <main className="w-full">{children}</main>
    </div>
  </div>
}