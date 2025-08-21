import React from "react";

interface IButtonProps {
  label: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
  ariaLabel?: string;
}

const Button: React.FC<IButtonProps> = ({
  label,
  type = "button",
  onClick,
  disabled = false,
  ariaLabel,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className="w-14 h-14 bg-lime-green text-black text-4xl rounded-lg flex items-center justify-center cursor-pointer disabled:opacity-70"
    >
      {label}
    </button>
  );
};

export default Button;
