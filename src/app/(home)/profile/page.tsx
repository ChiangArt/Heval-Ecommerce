"use client";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/user/use-auth-store";
import { useRouter } from "next/navigation";
import ProfileDesktop from "@/components/profile/ProfileDesktop";
import ProfileMobile from "@/components/profile/ProfileMobile";

export default function ProfilePage() {
  const { user } = useUserStore();
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!user) {
      router.replace("/auth/login"); 
    } else {
      setReady(true);
    }
  }, [user, router]);

  if (!ready) return null; 

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
