import React from "react";
import TransformerDesignForm from "../components/TransformerDesignForm";
import { TransformerDesignProvider } from "../Context/TransformerDesignContext";
const TransformerDesign: React.FC = () => (
  <TransformerDesignProvider>
    <TransformerDesignForm />
  </TransformerDesignProvider>
);

export default TransformerDesign;
