import React from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";

interface TextInputProps {
  placeholder?: string;
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  registration,
  error,
}) => {
  return (
    <input
      type="text"
      placeholder={placeholder}
      {...registration}
      className={`w-full bg-add-task rounded-lg px-4 py-4 text-white text-base outline-none placeholder:text-text-gray
        ${error ? "border border-red-500" : "border border-transparent"}`}
    />
  );
};

export default TextInput;
