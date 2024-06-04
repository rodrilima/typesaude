import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Page() {
  return <div className="flex justify-center items-center h-full">
    <div className="bg-black opacity-20 fixed top-0 left-0 w-full h-screen"></div>
    <div className="bg-white w-[400px] min-h-[300px] p-10 flex justify-center items-center flex-col z-10">
      <div className="w-36">
        <Image src="/images/logo.png" width={500} height={500} alt="Logo" />
      </div>
      <div className="w-full space-y-3 my-5">
        <Input placeholder="Email" className="w-full" />
        <Input placeholder="Senha" className="w-full" />
        <Button className="w-full">Entrar</Button>
      </div>
    </div>
  </div>
}