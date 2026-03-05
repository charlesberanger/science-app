import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Submission",
  description: "View and track the status of your submission.",
};

export default function SubmissionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
