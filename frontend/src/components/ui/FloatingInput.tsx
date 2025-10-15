import { useState } from "react";

interface FloatingInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => void; // Add this
  type?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  placeholder?: string;
  maxLength?: number;
  className?: string;
}

export function FloatingInput({
  label,
  name,
  value,
  onChange,
  onBlur,
  onFocus,
  type = "text",
  required = false,
  disabled = false,
  error,
  placeholder,
  maxLength,
  className = "",
}: FloatingInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const isFloating = isFocused || value !== "";

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setIsFocused(true);
    if (onFocus) {
      onFocus(e);
    }
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setIsFocused(false);
    onBlur(e);
  };

  return (
    <div className="relative">
      <label
        htmlFor={name}
        className={`absolute left-4 transition-all duration-200 pointer-events-none ${
          isFloating
            ? "top-2 text-xs text-primary-600 font-medium"
            : "top-4 text-sm text-gray-500"
        } ${error ? "text-red-500" : ""} ${disabled ? "text-gray-400" : ""}`}
      >
        {label} {required && "*"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        required={required}
        disabled={disabled}
        maxLength={maxLength}
        placeholder={isFocused ? placeholder : ""}
        className={`w-full pt-6 pb-2 px-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white text-gray-900 disabled:bg-gray-100 disabled:cursor-not-allowed ${className} ${
          error && !isFocused
            ? "border-red-500"
            : isFocused
            ? "border-primary-500"
            : "border-gray-300"
        }`}
      />
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
