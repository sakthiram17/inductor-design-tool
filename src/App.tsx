import { useState } from "react";
import "./App.css";
import Navbar from "./components/ui/Navigation/Navbar";
import SideBar from "./components/ui/Navigation/SideBar";
import Backdrop from "./components/ui/Navigation/Backdrop";
import YourDesigns from "./pages/YourDesigns";

import InductorDesign from "./pages/InductorDesign";
import TransformerDesign from "./pages/TransformerDesign";

import {
  NavigationConstants,
  NavigationList,
  type PageName,
} from "./common/NavigationConstants";
import CoresAndWires from "./pages/CoresAndWires";

function App() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  const [pageName, setPageName] = useState<PageName>(
    NavigationConstants.InductorDesign
  );

  const offSideBar = () => setIsSideBarOpen(false);
  const turnOnSideBar = () => setIsSideBarOpen(true);

  const renderPage = () => {
    switch (pageName) {
      case NavigationConstants.InductorDesign:
        return <InductorDesign />;
      case NavigationConstants.TransformerDesign:
        return <TransformerDesign />;
      case NavigationConstants.CoresAndWires:
        return <CoresAndWires/>
      case NavigationConstants.YourDesigns:
        return <YourDesigns />;
      default:
        return <InductorDesign />;
    }
  };

  return (
    <>
      <Navbar
        setSmall={() => {}}
        first="Magnetrix"
        last="io"
        list={NavigationList}
        active={pageName}
        changePage={(page: PageName) => setPageName(page)}
        expand={turnOnSideBar}
        off={offSideBar}
      />

      <SideBar
        list={NavigationList}
        active={pageName}
        changePage={(page: PageName) => {
          setPageName(page);
          offSideBar();
        }}
        off={offSideBar}
        disabled={!isSideBarOpen}
      />

      <Backdrop on={isSideBarOpen} off={offSideBar} />

      <div className="page-container">{renderPage()}</div>
    </>
  );
}

export default App;
