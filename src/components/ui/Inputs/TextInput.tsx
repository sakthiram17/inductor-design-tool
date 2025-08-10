import React, { useState } from "react";
import "./TextInput.css";

type TextInputProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  validationFunction?: (value: string) => boolean;
  errorMessage?: string;
  placeholder?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  label,
  value,
  onChange,
  disabled = false,
  validationFunction,
  errorMessage = "",
  placeholder,
}) => {
  const [isTouched, setIsTouched] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsTouched(true);
    onChange(e.target.value);
  };

  return (
    <div className="text-input-container">
      {label && <label className="text-input-label">{label}</label>}
      <input
        type="text"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholder}
        className="text-input-field"
      />
      <div
        className={`text-input-error ${
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

export default TextInput;
