import Overlay from "@/components/ui/overlay/Overlay";
import CartSideBar from "@/components/ui/side-bar/CartSideBar";
import { Sidebar } from "@/components/ui/side-bar/SideBar";
import SearchDropdown from "@/components/ui/top-menu/search-dropdown/SearchDropdown";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <Overlay />
      {children}
      <CartSideBar />
      <SearchDropdown />
    </>
  );
}
