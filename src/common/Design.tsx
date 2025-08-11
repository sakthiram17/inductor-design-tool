// types/Design.ts
import type { Core } from "./CoreData";
import type { Wire } from "./Wires";

export interface Design {
  projectTitle: string;
  inductance: string;
  rmsCurrent: string;
  peakCurrent: string;
  windingFactor: number;
  areaProduct?: number;
  isValid: boolean;
  selectedWire: Wire | null;
  core: Core;
  turns: number;
  resistance: number; // in ohms
  powerLoss: number; // in W
  savedAt: string;
}
