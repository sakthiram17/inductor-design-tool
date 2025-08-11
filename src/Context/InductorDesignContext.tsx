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

type InductorDesignContextType = {
  possibleCores: Core[];
  setPossibleCores: Dispatch<SetStateAction<Core[]>>;
  selectedWire: Wire | null;
  setSelectedWire: Dispatch<SetStateAction<Wire | null>>;
  inductance: string;
  setInductance: Dispatch<SetStateAction<string>>;
  rmsCurrent: string;
  setRmsCurrent: Dispatch<SetStateAction<string>>;
  peakCurrent: string;
  setPeakCurrent: Dispatch<SetStateAction<string>>;
  projectTitle: string;
  setProjectTitle: Dispatch<SetStateAction<string>>;
  windingFactor: number;
  setWindingFactor: Dispatch<SetStateAction<number>>;
  isValid?: boolean;
  setIsValid?: (v: boolean) => void;
  areaProduct?: number | undefined;
  setAreaProduct?: (v: number | undefined) => void;
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
  const [areaProduct, setAreaProduct] = useState<number | undefined>(undefined);
  const [isValid, setIsValid] = useState(false);

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
        setIsValid,
        isValid,
        areaProduct,
        setAreaProduct,
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
