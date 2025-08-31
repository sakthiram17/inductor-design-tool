import React, { useEffect } from "react";
import Card from "./ui/Card/Card";
import TextInput from "./ui/Inputs/TextInput";
import SliderInput from "./ui/Inputs/SliderInput";
import Dropdown from "./ui/Inputs/Dropdown";
import wiresList, { type Wire } from "../common/Wires";
import { useTransformerDesign } from "../Context/TransformerDesignContext";
import { validator } from "../common/Validators";
import { coreList } from "../common/CoreData";
import { calculateTransformerAreaProduct, formatIndianNumber } from "../common/Utils";
import TransformerDesignCard from "./TransformerDesignCard";
import InfoBubble from "./ui/info-card/InfoBubble";
import "./InductorDesignForm.css";

const TransformerDesignForm = () => {
  const {
    rmsCurrents,
    setRmsCurrents,
    voltages,
    setVoltages,
    windingFactor,
    setWindingFactor,
    selectedWire,
    setSelectedWire,
    frequency,
    setFrequency,
    projectTitle,
    setProjectTitle,
    possibleCores,
    setPossibleCores,
    isValid,
    setIsValid,
    areaProduct,
    setAreaProduct,
  } = useTransformerDesign();

  // Map wire from name string
  const mapSelectedWire = (wireName: string): Wire | undefined => {
    return wiresList.find((w) => w.name === wireName);
  };

  // Validate the whole form
  useEffect(() => {
    // validate rms currents and voltages array values
    const validRMS = rmsCurrents.every((curr) => !validator.rmsCurrent(curr));
    const validVoltages = voltages.every((volt) => !validator.voltage(volt));
    const validFreq = !validator.frequency(frequency);
    const validWF = !validator.windingFactor(windingFactor);
    const hasSelectedWire =
      selectedWire && selectedWire.length === rmsCurrents.length;

    const valid =
      validRMS && validVoltages && validFreq && validWF && hasSelectedWire;
    setIsValid && setIsValid(valid || false);

    if (valid) {
      // Approximate area product calc for transformers: sum(V*I)
      const Ap = calculateTransformerAreaProduct(
        voltages.map(Number),
        Math.max(...rmsCurrents.map(Number)),
        Number(frequency),
        windingFactor
      );
      setAreaProduct && setAreaProduct(Ap);
    }
  }, [
    rmsCurrents,
    voltages,
    frequency,
    windingFactor,
    selectedWire,
    setIsValid,
    setAreaProduct,
  ]);

  // Auto select wires if rmsCurrent changes
  useEffect(() => {
    // Always select the smallest suitable wire for each winding
    if (!selectedWire || selectedWire.length !== rmsCurrents.length) {
      const suitableWires = rmsCurrents.map((curr) => {
        const c = Number(curr);
        // Find the smallest wire that meets the current requirement
        const wire = wiresList
          .filter((w) => w.Current >= c)
          .sort((a, b) => a.Area - b.Area)[0] || wiresList[wiresList.length - 1];
        return wire;
      });
      setSelectedWire(suitableWires);
    }
  }, [rmsCurrents, wiresList]);

  // Reset possible cores if inputs change
  useEffect(() => {
    setPossibleCores([]);
  }, [rmsCurrents, voltages, windingFactor, frequency]);

  // Add or update winding count inputs
  const updateWindingCount = (count: number) => {
    // Add or remove rmsCurrents and voltages arrays length accordingly
    if (count < 1) return;
    if (rmsCurrents.length === count && voltages.length === count) return;

    const newRms = [...rmsCurrents];
    const newVolts = [...voltages];

    while (newRms.length < count) newRms.push("");
    while (newVolts.length < count) newVolts.push("");

    while (newRms.length > count) newRms.pop();
    while (newVolts.length > count) newVolts.pop();

    setRmsCurrents(newRms);
    setVoltages(newVolts);

    // Reset wires too
    setSelectedWire(null);
  };

  const coresSelector = () => {
    // Filter cores by some criteria (e.g. area product, core area)
    const suitableCores = coreList.filter(
      (core) => core.areaProduct >= (areaProduct || 0)
    );
    setPossibleCores(suitableCores);
  };

  return (
    <div className="inductor-design-root">
      <div className="inductor-design-form">
        <Card
          header={<p>Electrical Specifications</p>}
          primaryBtn={{
            label: "Compute Suitable Cores",
            disabled: !isValid,
            onClick: coresSelector,
          }}
        >
          <div className="card-items">
            <SliderInput
              label="Number of Windings"
              min={1}
              defaultValue={1}
              max={5}
              step={1}
              value={rmsCurrents.length}
              onChange={updateWindingCount}
            />
            {rmsCurrents.map((curr, idx) => (
              <React.Fragment key={idx}>
                <TextInput
                  label={`RMS Current Winding ${idx + 1} (A)`}
                  value={curr}
                  type="number"
                  onChange={(val) => {
                    const newRms = [...rmsCurrents];
                    newRms[idx] = val;
                    setRmsCurrents(newRms);
                  }}
                  errorMessage={validator.rmsCurrent(curr) || ""}
                  validationFunction={validator.rmsCurrent}
                />
                <TextInput
                  label={`Voltage Winding ${idx + 1} (V)`}
                  value={voltages[idx] || ""}
                  type="number"
                  onChange={(val) => {
                    const newVolts = [...voltages];
                    newVolts[idx] = val;
                    setVoltages(newVolts);
                  }}
                  errorMessage={validator.voltage(voltages[idx] || "") || ""}
                  validationFunction={validator.voltage}
                />
                <Dropdown
                  label={`Select Wire Winding ${idx + 1}`}
                  value={selectedWire?.[idx]?.name || ""}
                  onChange={(wire) => {
                    if (!selectedWire) return;
                    const newWires = [...selectedWire];
                    const mappedWire = mapSelectedWire(wire);
                    if (mappedWire) {
                      newWires[idx] = mappedWire;
                      setSelectedWire(newWires);
                    }
                  }}
                  options={wiresList.map((wire) => ({
                    value: wire.name,
                    label: `${wire.name} : ${wire.Current} A`,
                  }))}
                  placeholder="Choose wire..."
                />
              </React.Fragment>
            ))}

            <TextInput
              label="Frequency (Hz)"
              value={frequency}
              type="number"
              onChange={setFrequency}
              errorMessage={validator.frequency(frequency) || ""}
              validationFunction={validator.frequency}
            />

            <TextInput
              label="Project Title (Optional)"
              value={projectTitle}
              type="text"
              onChange={setProjectTitle}
            />
            <InfoBubble
              label="Area Product"
              value={formatIndianNumber(areaProduct || 0)}
              unit="mm³"
            />
          </div>
          <SliderInput
            label="Winding Factor"
            value={windingFactor}
            onChange={setWindingFactor}
            min={0.1}
            max={1}
            step={0.05}
            showMinMax
          />
        </Card>

        <TransformerDesignCard possibleCores={possibleCores} />
      </div>
    </div>
  );
};

export default TransformerDesignForm;
