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
    if (num <= 0) {
      return "Peak current must be greater than zero.";
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

  voltage: (value: string): string | null => {
    if (value === undefined || value === null || value === "") {
      return "Voltage is required.";
    }
    const num = Number(value);
    if (isNaN(num)) {
      return "Voltage must be a number.";
    }
    if (num <= 0) {
      return "Voltage must be greater than zero.";
    }
    if (num > 100000) {
      return "Voltage seems too high.";
    }
    return null;
  },

  frequency: (value: string): string | null => {
    if (value === undefined || value === null || value === "") {
      return "Frequency is required.";
    }
    const num = Number(value);
    if (isNaN(num)) {
      return "Frequency must be a number.";
    }
    if (num <= 0) {
      return "Frequency must be greater than zero.";
    }
    return null;
  },

  windingFactor: (value: number): string | null => {
    if (value === undefined || value === null) {
      return "Winding factor is required.";
    }
    if (typeof value !== "number") {
      return "Winding factor must be a number.";
    }
    if (value < 0 || value > 1) {
      return "Winding factor must be between 0 and 1.";
    }
    return null;
  },

  projectTitle: (value: string): string | null => {
    if (!value) return null; // optional
    if (value.length > 100) {
      return "Project title must be less than 100 characters.";
    }
    return null;
  },
};
