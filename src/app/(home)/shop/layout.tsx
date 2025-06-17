import AnnouncementBar from "@/components/ui/announcement-bar/AnnouncementBar";
import ConsumerInformation from "@/components/ui/footer/consumer-information/ConsumerInformation";
import News from "@/components/ui/footer/News";
import SocialNetworks from "@/components/ui/footer/social-networks/SocialNetworks";
import TopMenuShop from "@/components/ui/top-menu/TopMenuShop";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar/>
      <TopMenuShop />
      <main >{children}</main>

      <footer className="bg-[#F7F3F3]">
        <News />
        <ConsumerInformation />
        <SocialNetworks />
      </footer>
    </>
  );
}
