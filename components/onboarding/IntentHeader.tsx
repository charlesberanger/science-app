export default function IntentHeader() {
  return (
    <div className="border-b border-border pb-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-doto font-bold text-3xl text-foreground sm:text-4xl">
          What do you want to do?
        </h1>
        <p className="text-sm text-secondary-foreground">
          Choose your path to participate in the Fluid Dynamics Challenge
        </p>
      </div>
    </div>
  );
}
