// Utils.tsx

import Constants from "./Constants";
import type { Core } from "./CoreData";
import type { Design } from "./Design";
import type { Wire } from "./Wires";
import * as XLSX from "xlsx";

/**
 * Calculates the area product (Ap) for an inductor design.
 * @param L Inductance in microhenries (µH)
 * @param I_peak Peak current in amperes (A)
 * @param I_rms RMS current in amperes (A)
 * @param Bm Maximum flux density in tesla (T)
 * @param J Current density in A/mm^2
 * @returns Area product (Ap) in cm^4
 */
export function calculateAreaProduct(
  L: number, // inductance in µH
  I_peak: number, // peak current in A
  I_rms: number // rms current in A
): number {
  // Convert inductance from µH to H
  const inductance_H = L * 1e-6;
  // Calculate area product (Ap)
  const Ap =
    (inductance_H * I_peak * I_rms) /
    (Constants.flux_density *
      Constants.winding_factor *
      Constants.current_desnity);
  return Ap;
}

export function convertToMM4(ap: number): number {
  // Convert area product from m^4 to mm^4
  return Math.round(ap * 10 ** 12);
}

export function computeResistance(selectedWire: Wire, length: number): number {
  // Calculate resistance using the formula R = ρ * (L / A)
  // where ρ is the resistivity of copper (1.7 * 10^-8 ohm-meters)
  // length is in mm and
  // area is in mm2
  const area_mm2 = selectedWire.Area; // in mm²
  const area_m2 = area_mm2 * 1e-6; // convert mm² to m²
  const length_m = length * 1e-3;
  const resistance =
    Constants.rho * (length_m / area_m2) * Constants.convertToMilli; // in ohms
  return resistance;
}
export function calculateTurns(
  inductance: number, // in µH
  peakCurrent: number, // in A
  coreArea: number // in mm²
): number {
  // Convert inductance from µH to H
  const L_H = inductance * 1e-6;

  // Convert core area from mm² to m²
  const coreArea_m2 = coreArea * 1e-6;

  // N = (L * I_peak) / (B_max * A_core)
  const turns = (L_H * peakCurrent) / (Constants.flux_density * coreArea_m2);

  return Math.ceil(turns);
}

export function checkIfWireFits(
  selectedWire: Wire | null,
  turns: number,
  coreWindowArea: number,
  winding_factor: number
): boolean {
  // Calculate the total area occupied by the wire
  const totalWireArea =
    ((selectedWire ? selectedWire?.Area : 0) * turns) / winding_factor; // in mm²
  // Check if the total wire area fits within the core window area
  return totalWireArea <= coreWindowArea;
}

export const exportDesignToExcel = (design: Design) => {
  const data = [
    { Label: "Project Title", Value: design.projectTitle },
    { Label: "Inductance (uH)", Value: design.inductance },
    { Label: "RMS Current (A)", Value: design.rmsCurrent },
    { Label: "Peak Current (A)", Value: design.peakCurrent },
    { Label: "Winding Factor", Value: design.windingFactor },
    {
      Label: "Area Product (mm³)",
      Value: convertToMM4(design.areaProduct || 0) ?? "",
    },
    { Label: "Valid Design", Value: design.isValid ? "Yes" : "No" },
    { Label: "Core SKU", Value: design.core.sku },
    { Label: "Core Area (mm²)", Value: design.core.coreArea },
    { Label: "Window Area (mm²)", Value: design.core.windowArea },
    { Label: "Mean Turn Length (mm)", Value: design.core.meanTurnLength },
    { Label: "Turns", Value: design.turns },
    { Label: "DCR (mΩ)", Value: design.resistance.toFixed(2) },
    {
      Label: "Wire Length (cm)",
      Value: (design.core.meanTurnLength * design.turns).toFixed(2),
    },
    { Label: "Power Loss (W)", Value: design.powerLoss.toFixed(2) },
    { Label: "Saved At", Value: design.savedAt },
  ];
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Design");
  XLSX.writeFile(wb, `Core_Design_${design.core.sku}.xlsx`);
};

export const saveDesignToLocal = (design: Design) => {
  const saved = localStorage.getItem("savedDesigns");
  let designs: Design[] = saved ? JSON.parse(saved) : [];
  designs.push(design);
  localStorage.setItem("savedDesigns", JSON.stringify(designs));
};

interface ContextParams {
  projectTitle: string;
  inductance: string;
  rmsCurrent: string;
  peakCurrent: string;
  windingFactor: number;
  areaProduct?: number;
  isValid: boolean;
  selectedWire: Wire | null;
}

export function buildDesignFromContext(
  params: ContextParams,
  core: Core,
  turns: number,
  resistance: number,
  powerLoss: number
): Design {
  return {
    ...params,
    core,
    turns,
    resistance,
    powerLoss,
    savedAt: new Date().toISOString(),
  };
}
