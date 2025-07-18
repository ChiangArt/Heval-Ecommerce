"use client";
import { Title } from "@/components/ui/title/Title";
import MediaVideos from "../media-videos/MediaVideos";

interface Props {
  videos: { id: string; url: string; title: string }[];
}

export const DesktopVideoSection = ({ videos }: Props) => {
  return (
    <section className="hidden snap-always md:flex landscape:pt-21 md:flex-col md:gap-4 snap-start w-full pt-20 md:pt-26 px-6 h-screen min-h-[100dvh] lg:h-screen">
      <Title
        pretitle="Gorras en su mejor ángulo"
        title="Inspírate, comparte y únete"
        description1="Tu próxima gorra favorita está en estos clips"
      />
      <MediaVideos videos={videos} />
    </section>
  );
};
