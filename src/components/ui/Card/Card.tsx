import React from "react";
import Button, { ButtonStyle } from "../Button/Button";
import "./Card.css"
type ButtonProps = {
  label: string;
  onClick: () => void;
  disabled?: boolean;
};

type CardProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  primaryBtn: ButtonProps;
  secondaryBtn?: ButtonProps;
  className?: string;
};

export const Card: React.FC<CardProps> = ({
  header,
  footer,
  children,
  primaryBtn,
  secondaryBtn,
  className = "",
}) => {
  return (
    <div className={`card-primary ${className}`}>
      {header && <div className="card-header">{header}</div>}

      <div className="card-body">{children}</div>

      <div className="card-footer">
        <div className="card-buttons">
          {secondaryBtn && (
            <Button
              label={secondaryBtn.label}
              onClick={secondaryBtn.onClick}
              disabled={secondaryBtn.disabled}
              styleType={ButtonStyle.Secondary}
            />
          )}

          <Button
            label={primaryBtn.label}
            onClick={primaryBtn.onClick}
            disabled={primaryBtn.disabled}
            styleType={ButtonStyle.Primary}
          />
        </div>

        {footer && <div className="card-footer-content">{footer}</div>}
      </div>
    </div>
  );
};

export default Card;
