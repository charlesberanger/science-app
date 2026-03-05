import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to the Science platform.",
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return children;
}
