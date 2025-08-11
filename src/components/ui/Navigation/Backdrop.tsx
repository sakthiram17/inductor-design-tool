import React from "react";
import "./Backdrop.css";

interface BackdropProps {
  on: boolean;
  off: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ on, off }) => {
  if (!on) return null; // cleaner than empty div

  return <div className="Backdrop" onClick={off} />;
};

export default Backdrop;
