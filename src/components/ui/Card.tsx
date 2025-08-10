import React from "react";

type CardProps = {
  header?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  primaryBtn: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  secondaryBtn?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  className?: string;
};

export const Card: React.FC<CardProps> = ({
  header,
  footer,
  children,
  className = "",
}) => (
  <div className={`card-primary ${className}`}>
    {header && <div className="card-header">{header}</div>}
    <div className="card-body">{children}</div>
    <div className="card-footer">{footer}</div>
  </div>
);

export default Card;
