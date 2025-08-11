import React from "react";
import Card from "./ui/Card/Card";
import { type Core } from "../common/CoreData";
import { Button, ButtonStyle } from "./ui/Button/Button"; // Assuming you have a Button component
import "./DesignCard.css"; // Assuming you have a CSS file for styling
import { calculateTurns, checkIfWireFits } from "../common/Utils";
import { useInductorDesign } from "../Context/InductorDesignContext";

interface CoreListProps {
  possibleCores: Core[];
  onExpandDesign?: (core: Core) => void;
  onSaveDesign?: (core: Core) => void;
}

const CoreList: React.FC<CoreListProps> = ({
  possibleCores,
  onExpandDesign,
  onSaveDesign,
}) => {
  const { inductance, peakCurrent, selectedWire, windingFactor } =
    useInductorDesign();
  if (possibleCores.length === 0) {
    return null;
  }

  return (
    <>
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
        return (
          <Card key={core.sku} header={<h4>Core: {core.sku}</h4>}>
            <div className="card-items">
              <ul className="core-specs">
                <li>
                  <span className="label">Core Area</span>
                  <span className="value">
                    {core.coreArea} <span className="unit">mm²</span>
                  </span>
                </li>
                <li>
                  <span className="label">Window Area</span>
                  <span className="value">
                    {core.windowArea} <span className="unit">mm²</span>
                  </span>
                </li>
                <li>
                  <span className="label">Area Product</span>
                  <span className="value">
                    {core.areaProduct} <span className="unit">mm³</span>
                  </span>
                </li>
                <li>
                  <span className="label">Mean Turn Length</span>
                  <span className="value">
                    {core.meanTurnLength} <span className="unit">mm</span>
                  </span>
                </li>
              </ul>

              {isValid && (
                <div className="button-group">
                  <Button
                    styleType={ButtonStyle.Primary}
                    onClick={() => onExpandDesign && onExpandDesign(core)}
                    label="Save Design"
                  />
                  <Button
                    styleType={ButtonStyle.Secondary}
                    onClick={() => onSaveDesign && onSaveDesign(core)}
                    label="Export Design"
                  />
                </div>
              )}
            </div>
          </Card>
        );
      })}
    </>
  );
};

export default CoreList;
