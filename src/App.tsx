import { useState } from "react";
import "./App.css";
import SliderInput from "./components/ui/Inputs/SliderInput";
import TextInput from "./components/ui/Inputs/TextInput";
import Dropdown from "./components/ui/Inputs/Dropdown";
import Card from "./components/ui/Card/Card";

function App() {
  const [name, setName] = useState("");
  const [fruit, setFruit] = useState("");
  const [count, setCount] = useState(0);

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
        <Card
          header={<h2>Demo Card Header</h2>}
    
          primaryBtn={{
            label: "Increment",
            onClick: () => setCount(count + 1),
            disabled: false,
          }}
          secondaryBtn={{
            label: "Reset",
            onClick: () => setCount(0),
            disabled: count === 0,
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
        </Card>
      </div>
    </>
  );
}

export default App;
