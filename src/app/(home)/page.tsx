import HomeClient from "@/components/home/client/HomeClient";
import AnnouncementBar from "@/components/ui/announcement-bar/AnnouncementBar";
import TopMenu from "@/components/ui/top-menu/TopMenu";
import { getAllBanners } from "@/core/banner/action/banner.actions";
import { getCollectionById } from "@/core/collection/action/collection.actions";
import { getProductsByCollectionId } from "@/core/product/action/product.actions";
import { Product } from "@/core/product/interface/productResponse";
import { cookies } from "next/headers";

const videos = [
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


export default async function HomePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value ?? "";

  let productsByCollection: Product[] = [];
  let firsCollection = null;
  let banners = [];
  let formattedDate = "(fecha no disponible)";

  try {
    productsByCollection = await getProductsByCollectionId(token, 1);
  } catch (error) {
    console.error("❌ Error al obtener productos:", error);
  }

  try {
    firsCollection = await getCollectionById(token, 1);
    const rawCreatedAt = firsCollection?.createdAt;
    if (rawCreatedAt) {
      const createdAt = new Date(rawCreatedAt);
      if (!isNaN(createdAt.getTime())) {
        formattedDate = `(${(createdAt.getMonth() + 1)
          .toString()
          .padStart(2, "0")} / ${createdAt.getFullYear()})`;
      }
    }
  } catch (error) {
    console.error("❌ Error al obtener la colección:", error);
  }

  try {
    banners = await getAllBanners(token);
  } catch (error) {
    console.error("❌ Error al obtener banners:", error);
  }

  return (
    <>
      <AnnouncementBar />
      <TopMenu />
      <HomeClient
        videos={videos}
        productsByCollection={productsByCollection}
        firsCollection={firsCollection}
        formattedDate={formattedDate}
        banners={banners}
      />
    </>
  );
}

