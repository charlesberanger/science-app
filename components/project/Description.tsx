const SECTIONS = [
  {
    number: "01",
    title: "Tube Design Differences",
    paragraphs: [
      "This submission presents a modified 1.5 mL microfuge tube featuring a tapered internal wall geometry with 0.3 mm longitudinal riblets inspired by shark-skin denticles. The wall thickness is reduced from 0.8 mm to 0.55 mm in the lower third to accommodate the surface texturing without exceeding the standard outer envelope.",
      "Key departures from the stock tube include a reshaped conical tip with a 15° half-angle (vs. the standard 20°), a widened cap hinge to improve one-handed operation in pressurised gloves, and a circumferential ridge at the 0.75 mL mark to aid liquid-level visibility under variable lighting conditions aboard the ISS.",
    ],
  },
  {
    number: "02",
    title: "Technical Rationale & Physics Principles",
    paragraphs: [
      "In microgravity, surface tension and capillary forces dominate over buoyancy-driven convection. The riblet geometry exploits this regime by creating preferential wetting paths that guide fluid toward the tube's centre-line during pipette extraction, reducing residual wall-film thickness by an estimated 14.2%.",
      "The narrowed tip angle increases capillary pressure at the base, discouraging bubble entrapment during sample loading — a common failure mode observed in parabolic-flight analogue experiments. The design has been validated against CFD simulations using OpenFOAM's interFoam solver at Bond numbers below 0.01, consistent with ISS orbital conditions.",
    ],
  },
];

export default function Description() {
  return (
    <div className="flex flex-col gap-4">
      {SECTIONS.map((section) => (
        <div key={section.number} className="border border-border bg-card p-5">
          <div className="flex items-baseline gap-3">
            <span className="font-mono text-label text-feedback-success">
              {section.number}
            </span>
            <h3 className="font-mono text-sm font-semibold text-foreground">
              {section.title}
            </h3>
          </div>
          <div className="mt-3 border-t border-border" />
          <div className="mt-3 border-l-2 border-feedback-success/30 pl-4">
            {section.paragraphs.map((p, i) => (
              <p
                key={i}
                className={`text-sm leading-relaxed text-secondary-foreground ${i > 0 ? "mt-3" : ""}`}
              >
                {p}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
