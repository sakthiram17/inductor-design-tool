import { useState } from "react";
import Card from "./ui/Card/Card";
import TextInput from "./ui/Inputs/TextInput";
import SliderInput from "./ui/Inputs/SliderInput";
import Dropdown from "./ui/Inputs/Dropdown";
import wiresList from "../common/Wires";
import "./InductorDesignForm.css";

const InductorDesignForm = () => {
  const [inductance, setInductance] = useState("");
  const [rmsCurrent, setRmsCurrent] = useState("");
  const [peakCurrent, setPeakCurrent] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [windingFactor, setWindingFactor] = useState(0.2);
  const [selectedWire, setSelectedWire] = useState("");
  return (
    <div className="inductor-design-form">
      <Card
        header={<h2>Choose Electrical Specifications</h2>}
        primaryBtn={{ label: "Show suitable cores", onClick: () => {} }}
      >
        <div className="card-items">
          <TextInput
            label="Inductance (H)"
            value={inductance}
            onChange={(value: string) => setInductance(value)}
            errorMessage="Inductance cannot be empty"
            validationFunction={(value: string) => value.length > 0}
          />
          <TextInput
            label="RMS Current (A)"
            value={rmsCurrent}
            onChange={(value: string) => setRmsCurrent(value)}
            errorMessage="RMS Current cannot be empty"
          />
          <TextInput
            label="Peak Current (A)"
            value={peakCurrent}
            onChange={(value: string) => setPeakCurrent(value)}
            errorMessage="RMS Current cannot be empty"
          />
          <TextInput
            label="Project Title (Optional)"
            value={projectTitle}
            onChange={(value: string) => setProjectTitle(value)}
          />
        </div>
      </Card>
      <Card header={<h2>Winding & Wire Selection</h2>}>
        <div className="card-items">
          <SliderInput
            label="Winding Factor"
            value={windingFactor}
            onChange={(value: number) => setWindingFactor(value)}
            min={0}
            max={1}
            showMinMax={true}
            step={0.05}
          />
          <Dropdown
            label="Select Wire"
            value={selectedWire}
            onChange={(value: string) => setSelectedWire(value)}
            options={wiresList.map((wire) => ({
              value: wire.name,
              label: `${wire.name} : ${wire.Current} A`,
            }))}
            placeholder="Choose a wire..."
          />
        </div>
      </Card>
    </div>
  );
};

export default InductorDesignForm;
