import AppShell from "@/components/layout/AppShell";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileForm from "@/components/profile/ProfileForm";

export default function ProfileEditPage() {
  return (
    <AppShell badgeLabel="CHALLENGE LIVE" isAuthenticated>
      <ProfileHeader />
      <div className="max-w-3xl">
        <ProfileForm />
      </div>
    </AppShell>
  );
}
