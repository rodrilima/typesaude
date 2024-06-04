export default function Layout({ children }: { children: React.ReactNode }) {
  return <main className="h-screen bg-[url('/images/authbg.webp')] bg-cover bg-center">{children}</main>
}