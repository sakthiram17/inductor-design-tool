import "./App.css";
import Button from "./components/ui/Button/Button";
import SliderInput from "./components/ui/Inputs/SliderInput";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
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
        ></SliderInput>
        <Button label="Get cores"></Button>
        <Button label="Get cores" styleType="secondary"></Button>
        <Button label="Get cores" styleType="danger"></Button>
      </div>
    </>
  );
}

export default App;
