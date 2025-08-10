import React from "react";
import "./Button.css";

export type ButtonStyle = "primary" | "secondary" | "danger";
export const ButtonStyle = {
  Primary: "primary" as ButtonStyle,
  Secondary: "secondary" as ButtonStyle,
  Danger: "danger" as ButtonStyle,
};

export interface ButtonProps {
  label: string;
  onClick?: () => void;
  styleType?: ButtonStyle;
  disabled?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  styleType = ButtonStyle.Primary,
  disabled = false,
  className = "",
}) => {
  const styleClass = `btn btn-${styleType}${
    disabled ? " btn-disabled" : ""
  } ${className}`.trim();

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={styleClass}
    >
      {label}
    </button>
  );
};

export default Button;
