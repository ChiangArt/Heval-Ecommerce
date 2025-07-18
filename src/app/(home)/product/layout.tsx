"use client";

import ConsumerInformation from "@/components/ui/footer/consumer-information/ConsumerInformation";
import SocialNetworks from "@/components/ui/footer/social-networks/SocialNetworks";
import WholesaleContact from "@/components/ui/footer/WholesaleContact";
import TopMenu from "@/components/ui/top-menu/TopMenu";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <TopMenu initialMargin={false} showBackdropBlur={false} />
      <main>{children}</main>
      <footer className="flex flex-col gap-10 p-10 bg-[rgba(232,227,222,0.40)]">
        <WholesaleContact className="py-5" />
        <ConsumerInformation />
        <SocialNetworks />
      </footer>
    </>
  );
}
