// Utils.tsx

import Constants from "./Constants";

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
  return Math.round(ap * (10 ** 12));
}
