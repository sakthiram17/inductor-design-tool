// Utils.tsx

import Constants from "./Constants";
import type { Wire } from "./Wires";

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

