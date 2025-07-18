import ProfileDesktop from "@/components/profile/ProfileDesktop";
import ProfileMobile from "@/components/profile/ProfileMobile";

export default function ProfilePage() {
  return (
    <div className="pt-30 pb-10">
      <div className="sm:hidden">
        <ProfileMobile />
      </div>
      <div className="hidden sm:block ">
        <ProfileDesktop />
      </div>
    </div>
  );
}
