import { useState } from "react";
import "./App.css";
import Button from "./components/ui/Button/Button";
import SliderInput from "./components/ui/Inputs/SliderInput";
import TextInput from "./components/ui/Inputs/TextInput";
import Dropdown from "./components/ui/Inputs/Dropdown";

function App() {
  const [name, setName] = useState("");
  const [fruit, setFruit] = useState("");

  const options = [
    { value: "", label: "Select a fruit" },
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "orange", label: "Orange" },
  ];
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "stretch",
          gap: "20px",
        }}
      >
        <SliderInput
          value={0.5}
          errorMessage="limit exceeded"
          validationFunction={() => true}
          showMinMax={true}
          onChange={() => {}}
          min={0}
          step={0.1}
          max={10}
          label="Winding factor"
        ></SliderInput>{" "}
        <TextInput
          label="Name"
          value={name}
          onChange={(value) => setName(value)}
          errorMessage="Name cannot be empty"
          validationFunction={(name) => {
            return name.length > 4;
          }}
          placeholder="Enter your full name"
        />
        <Dropdown
          label="Favorite Fruit"
          value={fruit}
          onChange={setFruit}
          options={options}
          placeholder="Choose one..."
        />
        <Button label="Get cores"></Button>
        <Button label="Get cores" styleType="secondary"></Button>
        <Button label="Get cores" styleType="danger"></Button>
      </div>
    </>
  );
}

export default App;
