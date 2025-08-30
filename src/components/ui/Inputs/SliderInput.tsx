import React, { useState } from "react";
import "./SliderInput.css";
import InfoBubble from "../info-card/InfoBubble";

type SliderInputProps = {
  label?: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
  showMinMax?: boolean;
  showValue?: boolean;
  validationFunction?: (value: number) => string | null;
  errorMessage?: string;
  defaultValue?: number;
};

const SliderInput: React.FC<SliderInputProps> = ({
  label,
  min,
  max,
  step = 1,
  value,
  onChange,
  disabled = false,
  showMinMax = false,
  showValue = true,
  errorMessage = "",
  validationFunction,
  defaultValue,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
    setIsTouched(true);
  };
  const [isTouched, setIsTouched] = useState(false);

  return (
    <div className="slider-input-container">
      <div className="slider-input">
        {showMinMax && <div className="slider-min">{min}</div>}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          defaultValue={defaultValue}
          onChange={handleChange}
          disabled={disabled}
          className="slider-input-range"
        />
        {showMinMax && <div className="slider-max">{max}</div>}
      </div>
      <InfoBubble label={label || ""} value={showValue ? value : undefined} />
      <div
        className={`slider-input-error ${
          isTouched && validationFunction && validationFunction(value)
            ? "show"
            : ""
        }`}
      >
        {errorMessage}
      </div>
    </div>
  );
};

export default SliderInput;
