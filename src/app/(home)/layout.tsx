import ConsumerInformation from "@/components/ui/footer/consumer-information/ConsumerInformation";
import SocialNetworks from "@/components/ui/footer/social-networks/SocialNetworks";
import AnnouncementBar from "@/components/ui/announcement-bar/AnnouncementBar";
import News from "@/components/ui/footer/News";
import { Sidebar } from "@/components/ui/side-bar/SideBar";
import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen overflow-hidden">
      <AnnouncementBar />
      <TopMenu />
      <Sidebar />
      {children}
      <footer className="p-5 md:p-10 flex flex-wrap gap-10 bg-[#F7F3F3]">
        <News />
        <ConsumerInformation />
        <SocialNetworks />
      </footer>
    </main>
  );
}
