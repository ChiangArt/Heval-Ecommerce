"use client";
import { useRef } from "react";
import ConsumerInformation from "@/components/ui/footer/consumer-information/ConsumerInformation";
import SocialNetworks from "@/components/ui/footer/social-networks/SocialNetworks";
import { Product } from "@/core/product/interface/productResponse";
import { Collection } from "@/core/collection/interface/collectionResponse";
import { useEnableAudioOnVisible } from "@/hooks/use-Enable-Audio-On-Visible";
import { NewCollectionSection } from "../new-collection-section/NewCollectionSection";
import { EssentialsSection } from "../essentials-section/EssentialsSection";
import { MobileVideoSection } from "../mobile-video-section/MobileVideoSection";
import { HeroVideoSection } from "../hero-video-section/HeroVideoSection";
import { DesktopVideoSection } from "../desktop-video-section/DesktopVideoSection";
import { AboutUsSection } from "../about-us-section/AboutUsSection";
import { WhatsAppButton } from "@/components/ui/whatsApp-button/WhatsAppButton";
import { PromoModal } from "../promo-modal/PromoModal";
import WholesaleContact from "@/components/ui/footer/WholesaleContact";

interface Props {
  videos: { id: string; url: string; title: string }[];
  productsByCollection: Product[];
  firsCollection: Collection | null;
  formattedDate: string;
  banners: { id: number; url: string[] }[];
}

export default function HomeClient({
  videos,
  productsByCollection,
  firsCollection,
  formattedDate,
  banners,
}: Props) {
  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  useEnableAudioOnVisible(videoRef1);
  useEnableAudioOnVisible(videoRef2);
  useEnableAudioOnVisible(videoRef3);

const videoBanner = banners.find(b => b.url.length >= 2) ?? { url: ["", ""] };
const [desktopUrl, mobileUrl] = videoBanner.url;

  return (
    <main className="snap-y snap-mandatory h-screen min-h-[100dvh] lg:h-screen">
      {/* SECCION 1 */}
      <HeroVideoSection urls={[desktopUrl, mobileUrl]} />

      {/* SECCION 2 */}
      <NewCollectionSection
        firsCollection={firsCollection}
        products={productsByCollection}
        formattedDate={formattedDate}
      />
      {/* SECCION 3 */}
      <EssentialsSection products={productsByCollection} />
      <AboutUsSection />
      {/* VIDEO DE REDES SOCIALES PARA WEB */}
      <DesktopVideoSection videos={videos} />
      {/* VIDEO DE REDES SOCIALES PARA MOBILE */}
      <MobileVideoSection
        videoRef={videoRef1}
        videoUrl={videos?.[0]?.url}
        showTitle
        pretitle="Gorras en su mejor ángulo"
        title="Inspírate, comparte y únete"
        description1="Tu próxima gorra favorita está en estos clips"
        linkText="SÍGUENOS EN TIK TOK"
        linkHref="/"
      />
      <MobileVideoSection
        videoRef={videoRef2}
        videoUrl={videos?.[1]?.url}
        linkText="SÍGUENOS EN FACEBOOK"
        linkHref="/"
      />
      <MobileVideoSection
        videoRef={videoRef3}
        videoUrl={videos?.[2]?.url}
        linkText="SÍGUENOS EN INSTAGRAM"
        linkHref="/"
      />
      {/* <ContactSection /> */}
      <footer className="bg-[#F7F3F3]">
        <section className="snap-start snap-always landscape:px-20 w-full flex items-center justify-center h-screen min-h-[100dvh] lg:h-screen">
          <WholesaleContact className="py-5 sm:p-15" />
        </section>
        <section className="snap-always pt-8 flex landscape:px-20 flex-col gap-3 snap-start w-full items-center justify-center h-screen min-h-[100dvh] lg:h-screen">
          <ConsumerInformation />
          <SocialNetworks />
        </section>
      </footer>
      <WhatsAppButton />

      <PromoModal />
    </main>
  );
}
