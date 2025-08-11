import React from "react";
import "./InfoBubble.css";

type InfoBubbleProps = {
  label: string;
  value?: string | number;
  unit?: string;
};

const InfoBubble: React.FC<InfoBubbleProps> = ({ label, value, unit }) => {
  return (
    <li className="info-bubble">
      <span className="label">{label}</span>
      {value !== undefined && (
        <span className="value">
          {value}
          {unit && <span className="unit"> {unit}</span>}
        </span>
      )}
    </li>
  );
};

export default InfoBubble;
