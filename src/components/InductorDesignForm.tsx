import Card from "./ui/Card/Card";
import TextInput from "./ui/Inputs/TextInput";
import SliderInput from "./ui/Inputs/SliderInput";
import Dropdown from "./ui/Inputs/Dropdown";
import wiresList, { type Wire } from "../common/Wires";
import "./InductorDesignForm.css";
import { useInductorDesign } from "../Context/InductorDesignContext";

const InductorDesignForm = () => {
  const {
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
    selectedWire,
    setSelectedWire,
  } = useInductorDesign();

  const mapSelectedWire = (wireName: string): Wire | undefined => {
    return wiresList.find((w) => w.name === wireName);
  };

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
            onChange={setInductance}
            errorMessage="Inductance cannot be empty"
            validationFunction={(value: string) => value.length > 0}
          />
          <TextInput
            label="RMS Current (A)"
            value={rmsCurrent}
            onChange={setRmsCurrent}
            errorMessage="RMS Current cannot be empty"
          />
          <TextInput
            label="Peak Current (A)"
            value={peakCurrent}
            onChange={setPeakCurrent}
            errorMessage="RMS Current cannot be empty"
          />
          <TextInput
            label="Project Title (Optional)"
            value={projectTitle}
            onChange={setProjectTitle}
          />
        </div>
      </Card>
      <Card header={<h2>Winding & Wire Selection</h2>}>
        <div className="card-items">
          <SliderInput
            label="Winding Factor"
            value={windingFactor}
            onChange={setWindingFactor}
            min={0}
            max={1}
            showMinMax={true}
            step={0.05}
          />
          <Dropdown
            label="Select Wire"
            value={selectedWire?.name ?? ""}
            onChange={(wire: string) => {
              setSelectedWire(mapSelectedWire(wire) || wiresList[0]);
            }}
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
