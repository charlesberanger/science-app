import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profile",
  description: "Researcher profile and submission history.",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
