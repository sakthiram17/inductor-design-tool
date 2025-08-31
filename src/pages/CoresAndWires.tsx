import Card from "../components/ui/Card/Card";
import InfoBubble from "../components/ui/info-card/InfoBubble";
import { coreList } from "../common/CoreData";
import wiresList from "../common/Wires";

const CoresAndWires: React.FC = () => {
  return (
    <div
      style={{
        display: "grid",
        gap: "2rem",
        padding: "2rem",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Cores and Wires</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
        }}
      >
        {coreList.map((core) => (
          <Card key={core.sku} header={<h3>{core.sku}</h3>}>
            <InfoBubble label="Core Area" value={core.coreArea} unit="mm²" />
            <InfoBubble
              label="Window Area"
              value={core.windowArea}
              unit="mm²"
            />
            <InfoBubble
              label="Area Product"
              value={core.areaProduct}
              unit="mm³"
            />
            <InfoBubble
              label="Mean Turn Length"
              value={core.meanTurnLength}
              unit="mm"
            />
          </Card>
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Card>
          {" "}
          <h2>Wires</h2>
          {wiresList.map((wire) => (
            <div
              key={wire.name}
              style={{
                display: "flex",
                gap: "1rem",
                paddingBottom: "0.5rem",
                marginBottom: "0.5rem",
              }}
            >
              <InfoBubble label="Name" value={wire.name} unit="" />
              <InfoBubble label="Current" value={wire.Current} unit="A" />
              <InfoBubble label="Area" value={wire.Area} unit="mm²" />
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
};

export default CoresAndWires;
