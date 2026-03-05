"use client";

import { createContext, useContext } from "react";
import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const schema = z.object({
  citizenCheckbox: z
    .boolean()
    .refine((v) => v === true, "Citizenship eligibility confirmation required"),
  teamCheckbox: z
    .boolean()
    .refine((v) => v === true, "Team submission confirmation required"),
  title: z.string().min(1, "Tube design name is required"),
  tubeDesignDifferences: z
    .string()
    .min(1500, "Must be at least 1,500 characters"),
  technicalRationale: z
    .string()
    .min(1500, "Must be at least 1,500 characters"),
  cadFiles: z.array(z.instanceof(File)).min(1, "A CAD file is required"),
  coverImage: z.array(z.instanceof(File)).optional(),
});

export type FluidDynamicsFormData = z.infer<typeof schema>;

interface ContextValue {
  form: UseFormReturn<FluidDynamicsFormData>;
}

const FluidDynamicsFormContext = createContext<ContextValue | undefined>(undefined);

export function FluidDynamicsFormProvider({ children }: { children: React.ReactNode }) {
  const form = useForm<FluidDynamicsFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      citizenCheckbox: false,
      teamCheckbox: false,
      title: "",
      tubeDesignDifferences: "",
      technicalRationale: "",
      cadFiles: [],
      coverImage: [],
    },
    mode: "onSubmit",
  });

  return (
    <FluidDynamicsFormContext.Provider value={{ form }}>
      {children}
    </FluidDynamicsFormContext.Provider>
  );
}

export function useFluidDynamicsForm() {
  const ctx = useContext(FluidDynamicsFormContext);
  if (!ctx) throw new Error("useFluidDynamicsForm must be used within FluidDynamicsFormProvider");
  return ctx;
}
