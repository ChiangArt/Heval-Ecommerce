import AnnouncementBar from "@/components/ui/announcement-bar/AnnouncementBar";
import ConsumerInformation from "@/components/ui/footer/consumer-information/ConsumerInformation";
import News from "@/components/ui/footer/News";
import SocialNetworks from "@/components/ui/footer/social-networks/SocialNetworks";
import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <TopMenu showBackdropBlur={false} />
      <main>{children}</main>

      <footer className="flex flex-col gap-10 p-10 bg-[rgba(232,227,222,0.40)]">
        <News className="py-5"/>
        <ConsumerInformation />
        <SocialNetworks />
      </footer>
    </>
  );
}
