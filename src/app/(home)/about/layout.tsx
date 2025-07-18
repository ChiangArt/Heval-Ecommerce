import AnnouncementBar from "@/components/ui/announcement-bar/AnnouncementBar";
import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <TopMenu showBackdropBlur={false} />
      {children}
    </>
  );
}
