import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  onClick?: () => void;
}

export const Button = ({
  label,
  onClick,
  children,
}: ButtonProps): React.ReactElement => (
  <button
    onClick={onClick}
    style={{
      display: "inline-block",
      outline: 0,
      cursor: "pointer",
      backgroundColor: "black",
      borderRadius: 4,
      padding: "8px 16px",
      fontSize: 16,
      fontWeight: 600,
      color: "rgb(43, 108, 176)",
      border: "1px solid rgb(66, 153, 225)",
      lineHeight: 1,
    }}
  >
    {label}
  </button>
);
