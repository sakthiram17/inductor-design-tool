import Card from "./ui/Card/Card";
import TextInput from "./ui/Inputs/TextInput";
import SliderInput from "./ui/Inputs/SliderInput";
import Dropdown from "./ui/Inputs/Dropdown";
import wiresList, { type Wire } from "../common/Wires";
import "./InductorDesignForm.css";
import { useInductorDesign } from "../Context/InductorDesignContext";
import { validator } from "../common/Validators";

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
        header={<h4>Choose Electrical Specifications</h4>}
        primaryBtn={{ label: "Show suitable cores", onClick: () => {} }}
      >
        <div className="card-items">
          <TextInput
            label="Inductance (H)"
            value={inductance}
            type="number"
            onChange={setInductance}
            errorMessage={validator.inductance(inductance) || ''}
            validationFunction={validator.inductance}
          />
          <TextInput
            label="RMS Current (A)"
            value={rmsCurrent}
            type="number"
            onChange={setRmsCurrent}
            errorMessage= {validator.rmsCurrent(rmsCurrent) || ''}
            validationFunction={validator.rmsCurrent}
          />
          <TextInput
            label="Peak Current (A)"
            value={peakCurrent}
            type="number"
            onChange={setPeakCurrent}
            errorMessage={validator.peakCurrent(peakCurrent) || ''}
            validationFunction={validator.peakCurrent}
          />
          <TextInput
            label="Project Title (Optional)"
            value={projectTitle}
            type="text"
            onChange={setProjectTitle}
          />
        </div>
      </Card>
      <Card header={<h4>Winding & Wire Selection</h4>}>
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
            onChange={(wire: string)=> {
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