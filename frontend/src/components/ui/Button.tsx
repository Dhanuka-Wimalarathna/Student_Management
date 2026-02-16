import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "danger";
  size?: "sm" | "md" | "lg";
}

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  ...props
}: ButtonProps) {
  const baseStyles =
    "font-medium rounded-lg transition-colors flex items-center gap-2";

  const variants = {
    primary:
      "bg-indigo-500 text-white hover:bg-indigo-600 shadow-md hover:shadow-lg ring-1 ring-indigo-300 transition-all duration-200",
    secondary:
      "bg-emerald-500 text-white hover:bg-emerald-600 shadow-sm hover:shadow-md ring-1 ring-emerald-300 transition-all duration-200",
    outline:
      "border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all duration-200",
    danger:
      "bg-rose-500 text-white hover:bg-rose-600 shadow-md hover:shadow-lg ring-1 ring-rose-300 transition-all duration-200",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
