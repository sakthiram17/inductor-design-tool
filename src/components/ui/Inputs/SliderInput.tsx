import React, { useState } from "react";
import "./SliderInput.css";

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
  validationFunction?: (value: number) => boolean;
  errorMessage?: string;
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
          onChange={handleChange}
          disabled={disabled}
          className="slider-input-range"
        />
        {showMinMax && <div className="slider-max">{max}</div>}
      </div>
      <div className="slider-label-container">
        {label && <label className="slider-input-label">{label}</label>}
        {showValue && <span className="slider-input-value">{value}</span>}
      </div>
      <div
        className={`slider-input-error ${
          isTouched && validationFunction && !validationFunction(value)
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
