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

      <TopMenu />
      <main >{children}</main>

      <footer className="bg-[#F7F3F3]">
        <News />
        <ConsumerInformation />
        <SocialNetworks />
      </footer>
    </>
  );
}
