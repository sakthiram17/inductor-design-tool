import {
  createContext,
  useContext,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import type { Wire } from "../common/Wires";
import type { Core } from "../common/CoreData";

type TransformerDesignContextType = {
  possibleCores: Core[];
  setPossibleCores: Dispatch<SetStateAction<Core[]>>;
  selectedWire: Wire[] | null;
  setSelectedWire: Dispatch<SetStateAction<Wire[] | null>>;
  rmsCurrents: string[]; // RMS currents for each winding as strings
  setRmsCurrents: Dispatch<SetStateAction<string[]>>;
  voltages: string[]; // Voltages for each winding
  setVoltages: Dispatch<SetStateAction<string[]>>;
  windingFactor: number;
  setWindingFactor: Dispatch<SetStateAction<number>>;
  frequency: string; // switching or supply frequency
  setFrequency: Dispatch<SetStateAction<string>>;
  coreArea: string; // Core cross-sectional area Ac
  setCoreArea: Dispatch<SetStateAction<string>>;
  peakFluxDensity: string; // Bpk
  setPeakFluxDensity: Dispatch<SetStateAction<string>>;
  currentDensity: string; // Jrms
  setCurrentDensity: Dispatch<SetStateAction<string>>;
  projectTitle: string;
  setProjectTitle: Dispatch<SetStateAction<string>>;
  isValid?: boolean;
  setIsValid?: (v: boolean) => void;
  areaProduct?: number | undefined;
  setAreaProduct?: (v: number | undefined) => void;
};

const TransformerDesignContext = createContext<
  TransformerDesignContextType | undefined
>(undefined);

export const TransformerDesignProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [possibleCores, setPossibleCores] = useState<Core[]>([]);
  const [selectedWire, setSelectedWire] = useState<Wire[] | null>(null);
  const [rmsCurrents, setRmsCurrents] = useState<string[]>([]);
  const [voltages, setVoltages] = useState<string[]>([]);
  const [windingFactor, setWindingFactor] = useState(0.2);
  const [frequency, setFrequency] = useState("");
  const [coreArea, setCoreArea] = useState("");
  const [peakFluxDensity, setPeakFluxDensity] = useState("");
  const [currentDensity, setCurrentDensity] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [areaProduct, setAreaProduct] = useState<number | undefined>(undefined);
  const [isValid, setIsValid] = useState(false);

  return (
    <TransformerDesignContext.Provider
      value={{
        possibleCores,
        setPossibleCores,
        selectedWire,
        setSelectedWire,
        rmsCurrents,
        setRmsCurrents,
        voltages,
        setVoltages,
        windingFactor,
        setWindingFactor,
        frequency,
        setFrequency,
        coreArea,
        setCoreArea,
        peakFluxDensity,
        setPeakFluxDensity,
        currentDensity,
        setCurrentDensity,
        projectTitle,
        setProjectTitle,
        isValid,
        setIsValid,
        areaProduct,
        setAreaProduct,
      }}
    >
      {children}
    </TransformerDesignContext.Provider>
  );
};

export const useTransformerDesign = () => {
  const context = useContext(TransformerDesignContext);
  if (!context)
    throw new Error(
      "useTransformerDesign must be used within TransformerDesignProvider"
    );
  return context;
};
