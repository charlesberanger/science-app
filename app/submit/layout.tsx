import type { Metadata } from "next";
import { FluidDynamicsFormProvider } from "@/contexts/FluidDynamicsFormContext";

export const metadata: Metadata = {
  title: "Submit Project",
  description: "Submit your Fluid Dynamics project to the Science Challenge.",
};

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return <FluidDynamicsFormProvider>{children}</FluidDynamicsFormProvider>;
}
