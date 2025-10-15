import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  className = '',
  ...props 
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-colors flex items-center gap-2';
  
  const variants = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 shadow-md hover:shadow-lg',
    secondary: 'bg-success-500 text-white hover:bg-success-600',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
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