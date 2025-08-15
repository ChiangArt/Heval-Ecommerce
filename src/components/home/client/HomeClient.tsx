"use client";
import { useRef, useState, useEffect } from "react";
import ConsumerInformation from "@/components/ui/footer/consumer-information/ConsumerInformation";
import SocialNetworks from "@/components/ui/footer/social-networks/SocialNetworks";
import WholesaleContact from "@/components/ui/footer/WholesaleContact";
import { NewCollectionSection } from "../new-collection-section/NewCollectionSection";
import { EssentialsSection } from "../essentials-section/EssentialsSection";
import { MobileVideoSection } from "../mobile-video-section/MobileVideoSection";
import { HeroVideoSection } from "../hero-video-section/HeroVideoSection";
import { DesktopVideoSection } from "../desktop-video-section/DesktopVideoSection";
import { AboutUsSection } from "../about-us-section/AboutUsSection";
import { WhatsAppButton } from "@/components/ui/whatsApp-button/WhatsAppButton";
import { PromoModal } from "../promo-modal/PromoModal";
import { useEnableAudioOnVisible } from "@/hooks/use-Enable-Audio-On-Visible";

import { getAllBanners } from "@/core/banner/action/banner.actions";
import { getCollectionById } from "@/core/collection/action/collection.actions";
import { getProductsByCollectionId } from "@/core/product/action/product.actions";

import { Product } from "@/core/product/interface/productResponse";
import { Collection } from "@/core/collection/interface/collectionResponse";
import { Banner } from "@/core/banner/interface/bannerResponse";
import { logError } from "@/app/utils/logger";

interface Video {
  id: string;
  url: string;
  title: string;
}

const defaultVideos: Video[] = [
  {
    id: "1",
    url: "https://heval-group-rrgaeg144.s3.us-east-2.amazonaws.com/videos/ALFA+%2B+otro+modelo.mp4",
    title: "SÍGUENOS EN TIK TOK",
  },
  {
    id: "2",
    url: "https://heval-group-rrgaeg144.s3.us-east-2.amazonaws.com/videos/Toda+la+coleccion+ALFA.mp4",
    title: "SÍGUENOS EN FACEBOOK",
  },
  {
    id: "3",
    url: "https://heval-group-rrgaeg144.s3.us-east-2.amazonaws.com/videos/WhatsApp+Video+2025-06-18+at+10.36.16+PM.mp4",
    title: "SÍGUENOS EN INSTAGRAM",
  },
];

export default function HomeClient() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [productsByCollection, setProductsByCollection] = useState<Product[]>(
    []
  );
  const [firsCollection, setFirsCollection] = useState<Collection | null>(null);
  const [formattedDate, setFormattedDate] = useState("(fecha no disponible)");
  const [videos] = useState<Video[]>(defaultVideos);

  const videoRef1 = useRef<HTMLVideoElement>(null);
  const videoRef2 = useRef<HTMLVideoElement>(null);
  const videoRef3 = useRef<HTMLVideoElement>(null);
  useEnableAudioOnVisible(videoRef1);
  useEnableAudioOnVisible(videoRef2);
  useEnableAudioOnVisible(videoRef3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const allBanners = await getAllBanners();
        setBanners(allBanners);
      } catch (error) {
        logError("❌ Error al obtener banners:", error);
      }

      try {
        const products = await getProductsByCollectionId(1);
        setProductsByCollection(products);
      } catch (error) {
        logError("❌ Error al obtener productos:", error);
      }

      try {
        const collection = await getCollectionById(1);
        setFirsCollection(collection);

        const rawCreatedAt = collection?.createdAt;
        if (rawCreatedAt) {
          const createdAt = new Date(rawCreatedAt);
          if (!isNaN(createdAt.getTime())) {
            setFormattedDate(
              `(${(createdAt.getMonth() + 1)
                .toString()
                .padStart(2, "0")} / ${createdAt.getFullYear()})`
            );
          }
        }
      } catch (error) {
        logError("❌ Error al obtener la colección:", error);
      }
    };

    fetchData();
  }, []);

  const videoBanner =
    Array.isArray(banners) && banners.length > 0
      ? banners.find((b) => Array.isArray(b.urls) && b.urls.length >= 2) ?? {
          urls: ["", ""],
        }
      : { urls: ["", ""] };

  const [desktopUrl, mobileUrl] = videoBanner.urls;

  return (
    <main className="snap-y snap-mandatory h-screen min-h-[100dvh] lg:h-screen">
      <HeroVideoSection urls={[desktopUrl, mobileUrl]} />
      <NewCollectionSection
        firsCollection={firsCollection}
        products={productsByCollection}
        formattedDate={formattedDate}
      />
      <EssentialsSection products={productsByCollection} />
      <AboutUsSection />
      <DesktopVideoSection videos={videos} />
      <MobileVideoSection
        videoRef={videoRef1}
        videoUrl={videos[0]?.url}
        showTitle
        pretitle="Gorras en su mejor ángulo"
        title="Inspírate, comparte y únete"
        description1="Tu próxima gorra favorita está en estos clips"
        linkText="SÍGUENOS EN TIK TOK"
        linkHref="/"
      />
      <MobileVideoSection
        videoRef={videoRef2}
        videoUrl={videos[1]?.url}
        linkText="SÍGUENOS EN FACEBOOK"
        linkHref="/"
      />
      <MobileVideoSection
        videoRef={videoRef3}
        videoUrl={videos[2]?.url}
        linkText="SÍGUENOS EN INSTAGRAM"
        linkHref="/"
      />

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
