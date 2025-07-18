import LayoutShell from "@/components/admin/LayoutShell";
import Overlay from "@/components/ui/overlay/Overlay";


export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <Overlay/>
      <LayoutShell>{children}</LayoutShell>
    </div>
  )
}
