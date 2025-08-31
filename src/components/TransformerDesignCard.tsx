import React from "react";
import Card from "./ui/Card/Card";
import { type Core } from "../common/CoreData";
import { Button, ButtonStyle } from "./ui/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import "./DesignCard.css";
import {
  buildDesignFromContext,
  calculateTransformerTurns,
  checkIfTransformerWireFits,
  computeResistance,
  exportDesignToExcel,
  formatIndianNumber,
  saveDesignToLocal,
} from "../common/Utils";
import { useTransformerDesign } from "../Context/TransformerDesignContext";
import InfoBubble from "./ui/info-card/InfoBubble";

interface TransformerDesignCardProps {
  possibleCores: Core[];
}

const TransformerDesignCard: React.FC<TransformerDesignCardProps> = ({
  possibleCores,
}) => {
  const {
    rmsCurrents,
    voltages,
    selectedWire,
    windingFactor,
    projectTitle,
    isValid,
    areaProduct,
    setPossibleCores,
    frequency,
  } = useTransformerDesign();

  if (possibleCores.length === 0) {
    if (isValid) {
      return (
        <div className="empty-state">
          <h2 className="empty-title">No Suitable Cores Found</h2>
          <p className="empty-description">
            We couldn't find any cores that match your transformer design specs.
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
        // Use first voltage value for turns calculation
        const turns = calculateTransformerTurns(
          rmsCurrents,
          Number(voltages[0]),
          core.coreArea,
          frequency
        );

        const isWireFit = checkIfTransformerWireFits(
          selectedWire,
          turns,
          core.windowArea,
          Number(windingFactor)
        );

        // Calculate total wire length: sum(turns per winding * meanTurnLength)
        const totalWireLength = turns.reduce(
          (acc, t) => acc + t * core.meanTurnLength,
          0
        );

        // Assume resistance calc on average wire or sum? Here sum resistance for demo
        let totalResistance = 0;
        turns.forEach((turnCount, idx) => {
          if (selectedWire && selectedWire[idx]) {
            totalResistance += computeResistance(
              selectedWire[idx],
              turnCount * core.meanTurnLength
            );
          }
        });

        // Power loss based on total resistance and max rms current (approx)
        const maxRmsCurrent = Math.max(...rmsCurrents.map(Number));
        const powerLoss = (maxRmsCurrent ** 2 * totalResistance) / 1000;

        // Sum all turns for buildDesignFromContext
        const totalTurns = Array.isArray(turns)
          ? turns.reduce((a, b) => a + b, 0)
          : turns;

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
                  {isWireFit ? (
                    <>
                      {turns.map((t, idx) => (
                        <InfoBubble
                          key={idx}
                          label={`Turns Winding ${idx + 1}`}
                          value={t}
                          unit="turns"
                        />
                      ))}
                      <InfoBubble
                        label="Total DCR (max) mΩ"
                        value={totalResistance.toFixed(2)}
                        unit="mΩ"
                      />
                      <InfoBubble
                        label="Total Wire Length"
                        value={totalWireLength / 10}
                        unit="cm"
                      />
                      <InfoBubble
                        label="Power Loss (rms)"
                        value={powerLoss.toFixed(2)}
                        unit="W"
                      />
                    </>
                  ) : (
                    <p className="error-message">
                      Selected wires cannot fit in the core window area with
                      this winding factor.
                    </p>
                  )}
                </ul>

                {isWireFit && (
                  <div className="button-group">
                    <Button
                      styleType={ButtonStyle.Primary}
                      onClick={() => {
                        const design = buildDesignFromContext(
                          {
                            inductance: "0",
                            peakCurrent: "0",
                            rmsCurrent: rmsCurrents[0],
                            windingFactor,
                            selectedWire: Array.isArray(selectedWire)
                              ? selectedWire[0]
                              : selectedWire,
                            projectTitle,
                            isValid: !!isValid,
                            areaProduct,
                          },
                          core,
                          totalTurns,
                          totalResistance,
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
                            inductance: "0",
                            peakCurrent: "0",
                            rmsCurrent: rmsCurrents[0],
                            windingFactor,
                            selectedWire: Array.isArray(selectedWire)
                              ? selectedWire[0]
                              : selectedWire,
                            projectTitle,
                            isValid: !!isValid,
                            areaProduct,
                          },
                          core,
                          totalTurns,
                          totalResistance,
                          powerLoss
                        );
                        exportDesignToExcel(design);
                        deleteDesign(core.sku);
                      }}
                      label="Export Design"
                    />
                  </div>
                )}
                {!isWireFit && (
                  <Button
                    styleType={ButtonStyle.Danger}
                    onClick={() => deleteDesign(core.sku)}
                    label="Discard Design"
                  />
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </AnimatePresence>
  );
};

export default TransformerDesignCard;
