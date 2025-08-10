import "./App.css";
import Button from "./components/ui/Button/Button";

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
        <Button label="Get cores"></Button>
        <Button label="Get cores" styleType="secondary"></Button>
        <Button label="Get cores" styleType="danger"></Button>
      </div>
    </>
  );
}

export default App;
