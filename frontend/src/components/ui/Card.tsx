interface CardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  trend?: string;
  variant?: 'default' | 'stat';
  description?: string;
}

export default function Card({ title, value, icon, trend, variant = 'default', description }: CardProps) {
  const baseStyles = "bg-white rounded-xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition-shadow";
  
  if (variant === 'stat') {
    return (
      <div className={`${baseStyles} text-white bg-gradient-to-br from-primary-500 to-primary-600`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-primary-100 text-sm font-medium">{title}</p>
            {description && <p className="text-primary-200 text-xs mt-0.5">{description}</p>}
            <p className="text-2xl font-bold mt-2">{value}</p>
            {trend && <p className="text-primary-200 text-xs font-medium mt-1">{trend}</p>}
          </div>
          {icon && <div className="p-3 bg-primary-400 rounded-lg">{icon}</div>}
        </div>
      </div>
    );
  }

  return (
    <div className={baseStyles}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          {description && <p className="text-gray-500 text-xs mt-0.5">{description}</p>}
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
          {trend && <p className="text-success-600 text-xs font-medium mt-1">{trend}</p>}
        </div>
        {icon && <div className="p-3 bg-gray-100 rounded-lg">{icon}</div>}
      </div>
    </div>
  );
}