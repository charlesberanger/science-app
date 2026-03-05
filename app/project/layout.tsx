import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project",
  description: "View project details, CAD model, and community feedback.",
};

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return children;
}
