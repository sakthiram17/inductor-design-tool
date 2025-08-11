import React from "react";
import Card from "./ui/Card/Card";
import { type Core } from "../common/CoreData";
import { Button, ButtonStyle } from "./ui/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import "./DesignCard.css";
import {
  buildDesignFromContext,
  calculateTurns,
  checkIfWireFits,
  computeResistance,
  exportDesignToExcel,
  formatIndianNumber,
  saveDesignToLocal,
} from "../common/Utils";
import { useInductorDesign } from "../Context/InductorDesignContext";
import InfoBubble from "./ui/info-card/InfoBubble";
import type { Wire } from "../common/Wires";
interface CoreListProps {
  possibleCores: Core[];
}

const CoreList: React.FC<CoreListProps> = ({ possibleCores }) => {
  const {
    inductance,
    peakCurrent,
    selectedWire,
    windingFactor,
    rmsCurrent,
    projectTitle,
    isValid,
    areaProduct,
    setPossibleCores,
  } = useInductorDesign();
  if (possibleCores.length === 0) {
    if (isValid) {
      return (
        <div className="empty-state">
          <h2 className="empty-title">No Suitable Cores Found</h2>
          <p className="empty-description">
            We couldn't find any cores that match your design specifications.
          </p>
        </div>
      );
    }
    return null;
  }

  const deleteDesign = (sku: string) => {
    setPossibleCores((prev: Core[]): Core[] =>
      prev.filter(
        (core) => core.sku.trim().toLowerCase() !== sku.trim().toLowerCase()
      )
    );
  };
  return (
    <AnimatePresence>
      {possibleCores.map((core) => {
        const turns = calculateTurns(
          Number(inductance),
          Number(peakCurrent),
          core.coreArea
        );
        const isValid = checkIfWireFits(
          selectedWire,
          turns,
          core.windowArea,
          windingFactor
        );
        const resistance = computeResistance(
          selectedWire as Wire,
          turns * core.meanTurnLength
        );
        const powerLoss =
          (Number(peakCurrent) ** 2 * Number(resistance)) / 1000; // in W

        return (
          <motion.div
            key={core.sku}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <Card key={core.sku} header={<h4>Core: {core.sku}</h4>}>
              <div className="card-items">
                <ul className="core-specs">
                  <InfoBubble
                    label="Core Area"
                    value={core.coreArea}
                    unit="mm²"
                  />
                  <InfoBubble
                    label="Window Area"
                    value={core.windowArea}
                    unit="mm²"
                  />
                  <InfoBubble
                    label="Area Product"
                    value={formatIndianNumber(core.areaProduct)}
                    unit="mm³"
                  />
                  <InfoBubble
                    label="Mean Turn Length"
                    value={core.meanTurnLength}
                    unit="mm"
                  />
                  {isValid && (
                    <>
                      <InfoBubble label="Turns" value={turns} />
                      <InfoBubble
                        label="DCR (max) mΩ"
                        value={resistance.toFixed(2)}
                        unit="mΩ"
                      />
                      <InfoBubble
                        label="Length of Wire"
                        value={(core.meanTurnLength * turns) / 10}
                        unit="cm"
                      />
                      <InfoBubble
                        label="Power Loss (rms)"
                        value={powerLoss.toFixed(2)}
                        unit="W"
                      />
                    </>
                  )}

                  {!isValid && (
                    <InfoBubble label="Turns" value={turns} unit="turns" />
                  )}
                </ul>

                {isValid && (
                  <div className="button-group">
                    <Button
                      styleType={ButtonStyle.Primary}
                      onClick={() => {
                        const design = buildDesignFromContext(
                          {
                            projectTitle,
                            inductance,
                            rmsCurrent,
                            peakCurrent,
                            windingFactor,
                            areaProduct,
                            isValid,
                            selectedWire,
                          },
                          core,
                          turns,
                          resistance,
                          powerLoss
                        );
                        saveDesignToLocal(design);
                        deleteDesign(core.sku);
                      }}
                      label="Save Design"
                    />
                    <Button
                      styleType={ButtonStyle.Secondary}
                      onClick={() => {
                        const design = buildDesignFromContext(
                          {
                            projectTitle,
                            inductance,
                            rmsCurrent,
                            peakCurrent,
                            windingFactor,
                            areaProduct,
                            isValid,
                            selectedWire,
                          },
                          core,
                          turns,
                          resistance,
                          powerLoss
                        );
                        exportDesignToExcel(design);
                        deleteDesign(core.sku);
                      }}
                      label="Export Design"
                    />
                  </div>
                )}
                {!isValid && (
                  <>
                    {" "}
                    <p className="error-message">
                      Cannot fit the selected wire in the core window area with
                      this winding factor
                    </p>
                    <Button
                      styleType={ButtonStyle.Danger}
                      onClick={() => deleteDesign(core.sku)}
                      label="Discard Design"
                    />
                  </>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default CoreList;
