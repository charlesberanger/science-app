import Stepper from "./Stepper";

export default function IntentHeader() {
  return (
    <div className="border-b border-[#2a2a2a] pb-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            What do you want to do?
          </h1>
          <p className="text-xs text-[#777]">
            Choose your path to participate in the Fluid Dynamics Challenge
          </p>
        </div>
        <Stepper />
      </div>
    </div>
  );
}
