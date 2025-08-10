import React from "react";
import Card from "./ui/Card/Card";
import { type Core } from "../common/CoreData";
import { Button, ButtonStyle } from "./ui/Button/Button"; // Assuming you have a Button component

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
  if (possibleCores.length === 0) {
    return null;
  }

  return (
    <>
      {possibleCores.map((core) => (
        <Card key={core.sku} header={<h4>Core: {core.sku}</h4>}>
          <div className="card-items">
            <p>
              Core Area: {core.coreArea} mm², Window Area: {core.windowArea}{" "}
              mm², Area Product: {core.areaProduct} mm³
            </p>
            <p>Mean Turn Length: {core.meanTurnLength} mm</p>

            <div className="button-group">
              <Button
                styleType={ButtonStyle.Primary}
                onClick={() => onExpandDesign && onExpandDesign(core)}
                label="Expand Design"
              />
              <Button
                styleType={ButtonStyle.Secondary}
                onClick={() => onSaveDesign && onSaveDesign(core)}
                label="Save Design"
              />
            </div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default CoreList;
