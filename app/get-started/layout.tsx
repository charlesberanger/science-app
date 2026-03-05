import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Choose how you want to engage with the Science Challenge — browse, compete, or submit.",
};

export default function GetStartedLayout({ children }: { children: React.ReactNode }) {
  return children;
}
