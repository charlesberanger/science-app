import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse Projects",
  description: "Explore all submissions to the Science Fluid Dynamics Challenge.",
};

export default function BrowseLayout({ children }: { children: React.ReactNode }) {
  return children;
}
