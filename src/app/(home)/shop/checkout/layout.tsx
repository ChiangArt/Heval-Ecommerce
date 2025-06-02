import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F6F4F2]">
      <TopMenu />
      <main className=" w-full h-full">{children}</main>
    </div>
  );
}
