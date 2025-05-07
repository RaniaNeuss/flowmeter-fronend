import { Sidebar } from '@/components/ui/sidebar'
import { Navbar } from '@/components/layouth/Navbar'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-background">{children}</main>
      </div>
    </div>
  )
}
