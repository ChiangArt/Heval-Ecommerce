import AnnouncementBar from "@/components/ui/announcement-bar/AnnouncementBar";
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
    </main>
  );
}
