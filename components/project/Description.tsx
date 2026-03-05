export default function Description() {
  return (
    <div className="rounded border border-border bg-card p-5">
      <h3 className="font-mono text-sm font-semibold uppercase tracking-ui text-foreground">
        Project Description
      </h3>
      <div className="my-3 border-t border-border" />
      <p className="text-sm leading-relaxed text-secondary-foreground">
        This submission presents a novel approach to turbulent boundary layer modelling using
        adaptive mesh refinement. The solver achieves a 3× speedup over baseline CFD methods
        while maintaining sub-1% error margins on standard benchmark cases.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-secondary-foreground">
        Key innovations include a hybrid RANS/LES switching criterion and an automated
        mesh-coarsening pipeline that preserves boundary layer resolution in high-gradient zones.
        The model has been validated against experimental wind tunnel data from NACA 0012 and
        NACA 4412 airfoil configurations.
      </p>
    </div>
  );
}
