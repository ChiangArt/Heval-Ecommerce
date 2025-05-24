import ConsumerInformation from "@/components/home/consumer-information/ConsumerInformation";
import SocialNetworks from "@/components/home/social-networks/SocialNetworks";
import AnnouncementBar from "@/components/ui/announcement-bar/AnnouncementBar";
import News from "@/components/ui/footer/News";
import ScrollEffect from "@/components/ui/scroll-effect/ScrollEffect";
import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen overflow-hidden">
      <AnnouncementBar />
      <ScrollEffect>
        <TopMenu />
      </ScrollEffect>
      {children}
      <footer className="p-10 flex flex-wrap gap-10 bg-[#F7F3F3]">
        <News />
        <ConsumerInformation/>
        <SocialNetworks/>
      </footer>
    </main>
  );
}
