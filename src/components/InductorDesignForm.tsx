import Card from "./ui/Card/Card";
import TextInput from "./ui/Inputs/TextInput";
import SliderInput from "./ui/Inputs/SliderInput";
import Dropdown from "./ui/Inputs/Dropdown";
import wiresList, { type Wire } from "../common/Wires";
import "./InductorDesignForm.css";
import { useInductorDesign } from "../Context/InductorDesignContext";
import { validator } from "../common/Validators";
import { useEffect } from "react";
import { coreList } from "../common/CoreData";
import { calculateAreaProduct, convertToMM4 } from "../common/Utils";
import DesignCard from "./DesignCard";

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
    setIsValid,
    isValid,
    setPossibleCores,
    possibleCores,
    areaProduct,
    setAreaProduct,
  } = useInductorDesign();

  const mapSelectedWire = (wireName: string): Wire | undefined => {
    return wiresList.find((w) => w.name === wireName);
  };
  useEffect(() => {
    const valid =
      !validator.inductance(inductance) &&
      !validator.rmsCurrent(rmsCurrent) &&
      !validator.peakCurrent(peakCurrent) &&
      selectedWire !== undefined &&
      windingFactor >= 0 &&
      windingFactor <= 1;

    setIsValid && setIsValid(valid);
    if (valid) {
      setAreaProduct &&
        setAreaProduct(
          calculateAreaProduct(
            Number(inductance),
            Number(rmsCurrent),
            Number(peakCurrent)
          )
        );
    }
  }, [
    inductance,
    rmsCurrent,
    peakCurrent,
    windingFactor,
    selectedWire,
    setIsValid,
  ]);

  const coresSelector = () => {
    // This function can be used to filter or select cores based on the design parameters
    const Ap = calculateAreaProduct(
      Number(inductance),
      Number(rmsCurrent),
      Number(peakCurrent)
    );
    if (setAreaProduct) setAreaProduct(Ap);
    const suitableCores = coreList.filter((core) => core.areaProduct >= Ap);
    setPossibleCores(suitableCores);
  };

  return (
    <div className="inductor-design-form">
      <Card
        header={<h4>Choose Electrical Specifications</h4>}
        primaryBtn={{
          label: "Show suitable cores",
          disabled: !isValid,
          onClick: coresSelector,
        }}
      >
        <div className="card-items">
          <TextInput
            label="Inductance (µH)"
            value={inductance}
            type="number"
            onChange={setInductance}
            errorMessage={validator.inductance(inductance) || ""}
            validationFunction={validator.inductance}
          />
          <TextInput
            label="RMS Current (A)"
            value={rmsCurrent}
            type="number"
            onChange={setRmsCurrent}
            errorMessage={validator.rmsCurrent(rmsCurrent) || ""}
            validationFunction={validator.rmsCurrent}
          />
          <TextInput
            label="Peak Current (A)"
            value={peakCurrent}
            type="number"
            onChange={setPeakCurrent}
            errorMessage={validator.peakCurrent(peakCurrent) || ""}
            validationFunction={validator.peakCurrent}
          />
          <TextInput
            label="Project Title (Optional)"
            value={projectTitle}
            type="text"
            onChange={setProjectTitle}
          />
        </div>
        {areaProduct && (
          <p>
            <>
              <b>Area Product :</b>{" "}
              {convertToMM4(
                calculateAreaProduct(
                  Number(inductance),
                  Number(rmsCurrent),
                  Number(peakCurrent)
                )
              )}
            </>
            mm<sup>4</sup>
          </p>
        )}
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
            onChange={(wire: string) => {
              setSelectedWire(mapSelectedWire(wire) || wiresList[0]);
            }}
            options={wiresList
              .filter((wire) =>
                rmsCurrent ? wire.Current >= Number(rmsCurrent) : true
              )
              .map((wire) => ({
                value: wire.name,
                label: `${wire.name} : ${wire.Current} A`,
              }))}
            placeholder="Choose a wire..."
          />
        </div>
      </Card>
      <DesignCard possibleCores={possibleCores} />
    </div>
  );
};

export default InductorDesignForm;
