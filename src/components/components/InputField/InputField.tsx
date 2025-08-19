import React, { useState } from "react";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password";
  showClearButton?: boolean;
  showPasswordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  showClearButton = false,
  showPasswordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputType = showPassword ? "text" : type;

  const handleClear = () => {
    if (onChange) {
      const event = { target: { value: "" } } as unknown as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  const baseClasses = `
    w-full rounded border p-2 outline-none
    ${variant === "filled" ? "bg-gray-100 border-gray-300" : ""}
    ${variant === "outlined" ? "border-gray-300" : ""}
    ${variant === "ghost" ? "border-none bg-transparent" : ""}
    ${invalid ? "border-red-500" : ""}
    ${size === "sm" ? "text-sm p-1" : size === "lg" ? "text-lg p-3" : "text-md p-2"}
    ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}
  `;

  return (
    <div className="flex flex-col w-full">
      {label && <label className="mb-1 font-medium">{label}</label>}
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={baseClasses}
        />
        {showClearButton && value && (
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={handleClear}
          >
            ✕
          </button>
        )}
        {showPasswordToggle && type === "password" && (
          <button
            type="button"
            className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>
      {helperText && !invalid && <span className="text-gray-500 text-sm mt-1">{helperText}</span>}
      {invalid && errorMessage && <span className="text-red-500 text-sm mt-1">{errorMessage}</span>}
    </div>
  );
};

export default InputField;
