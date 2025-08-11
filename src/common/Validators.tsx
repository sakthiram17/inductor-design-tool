import wiresList from "./Wires";
const maxCurrent = Math.max(...wiresList.map((wire) => wire.Current));
export const validator = {
  peakCurrent: (value: string): string | null => {
    if (value === undefined || value === null || value === "") {
      return "Peak current is required.";
    }
    const num = Number(value);
    if (isNaN(num)) {
      return "Peak current must be a number.";
    }
    if (num > maxCurrent) {
      return `Peak current cannot exceed ${maxCurrent} A.`;
    }
    return null;
  },

  rmsCurrent: (value: string): string | null => {
    if (value === undefined || value === null || value === "") {
      return "RMS current is required.";
    }
    const num = Number(value);
    if (isNaN(num)) {
      return "RMS current must be a number.";
    }
    if (num > maxCurrent) {
      return `RMS current cannot exceed ${maxCurrent} A.`;
    }
    if (num <= 0) {
      return "RMS current must be greater than zero.";
    }
    return null;
  },

  inductance: (value: string): string | null => {
    if (value === undefined || value === null || value === "") {
      return "Inductance value is required.";
    }
    const num = Number(value);
    if (isNaN(num)) {
      return "Inductance value must be a number.";
    }
    if (num <= 0) {
      return "Inductance value must be greater than zero.";
    }
    return null;
  },
};
