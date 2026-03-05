import type { Metadata } from "next";
import AppShell from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "Edit Profile",
  description: "Update your Science challenge public profile.",
};
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfileEditPage() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE">
      <ProfileHeader />
      <ProfileForm />
    </AppShell>
  );
}
