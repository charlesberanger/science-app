import { FluidDynamicsFormProvider } from "@/contexts/FluidDynamicsFormContext";

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return <FluidDynamicsFormProvider>{children}</FluidDynamicsFormProvider>;
}
