import React from "react";
import InductorDesignForm from "../components/InductorDesignForm";
import { InductorDesignProvider } from "../Context/InductorDesignContext";
const InductorDesign: React.FC = () => (
  <InductorDesignProvider>
    <InductorDesignForm />
  </InductorDesignProvider>
);

export default InductorDesign;
