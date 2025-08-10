import { createContext, useContext, useState, type ReactNode } from "react";
import type { Wire } from "../common/Wires";

export type Core = {
  SKU: string;
  "Core Area": number;
  "Window Area": number;
  "Area Product": number;
  "Mean Turn Length": number;
};

type InductorDesignContextType = {
  possibleCores: Core[];
  setPossibleCores: (cores: Core[]) => void;
  selectedWire: Wire | null;
  setSelectedWire: (wire: Wire | null) => void;
  inductance: string;
  setInductance: (v: string) => void;
  rmsCurrent: string;
  setRmsCurrent: (v: string) => void;
  peakCurrent: string;
  setPeakCurrent: (v: string) => void;
  projectTitle: string;
  setProjectTitle: (v: string) => void;
  windingFactor: number;
  setWindingFactor: (v: number) => void;
};

const InductorDesignContext = createContext<
  InductorDesignContextType | undefined
>(undefined);

export const InductorDesignProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [possibleCores, setPossibleCores] = useState<Core[]>([]);
  const [selectedWire, setSelectedWire] = useState<Wire | null>(null);
  const [inductance, setInductance] = useState("");
  const [rmsCurrent, setRmsCurrent] = useState("");
  const [peakCurrent, setPeakCurrent] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [windingFactor, setWindingFactor] = useState(0.2);

  return (
    <InductorDesignContext.Provider
      value={{
        possibleCores,
        setPossibleCores,
        selectedWire,
        setSelectedWire,
        inductance,
        setInductance,
        rmsCurrent,
        setRmsCurrent,
        peakCurrent,
        setPeakCurrent,
        projectTitle,
        setProjectTitle,
        windingFactor,
        setWindingFactor,
      }}
    >
      {children}
    </InductorDesignContext.Provider>
  );
};

export const useInductorDesign = () => {
  const context = useContext(InductorDesignContext);
  if (!context)
    throw new Error(
      "useInductorDesign must be used within InductorDesignProvider"
    );
  return context;
};
