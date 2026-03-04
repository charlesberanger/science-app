import SidebarController from "./SidebarController";
import ThemeToggle from "@/components/theme/ThemeToggle";
import { ToastProvider } from "@/components/ui/toast";

export default function AppShell({
  children,
  badgeLabel,
}: {
  children: React.ReactNode;
  badgeLabel?: string;
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen bg-background">
        <SidebarController badgeLabel={badgeLabel} />

        <main
          id="main-content"
          className="flex flex-col gap-5 p-4 pt-20 sm:p-6 sm:pt-20 lg:ml-[220px]"
        >
          {children}
        </main>

        <ThemeToggle />
      </div>
    </ToastProvider>
  );
}
