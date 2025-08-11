export const NavigationConstants = {
  InductorDesign: "Inductor Design",
  TransformerDesign: "Transformer Design",
  CoresAndWires: "Cores & Wires",
  YourDesigns: "Your Designs",
} as const;

// Type from values
export type PageName = typeof NavigationConstants[keyof typeof NavigationConstants];

export const NavigationList = Object.values(NavigationConstants)
