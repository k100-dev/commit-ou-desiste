import React, { ReactNode } from 'react';

interface AnimatedCardProps {
  title: string;
  children: ReactNode;
  icon?: ReactNode;
  className?: string;
}

export const AnimatedCard = ({ title, children, icon, className = '' }: AnimatedCardProps) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden ${className}`}
    >
      <div className="bg-gradient-to-r from-violet-600 to-purple-500 px-6 py-4 flex items-center gap-2">
        {icon && <div className="text-white">{icon}</div>}
        <h3 className="text-xl font-semibold text-white">{title}</h3>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};