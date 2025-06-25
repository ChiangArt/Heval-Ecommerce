
export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#F6F4F2]">

      <main className=" w-full h-full">{children}</main>
    </div>
  );
}
