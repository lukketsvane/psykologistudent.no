import React from 'react';

interface BentoGridProps {
  children: React.ReactNode;
  className?: string;
}

export const BentoGrid: React.FC<BentoGridProps> = ({ children, className = "" }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto p-4 md:p-8 ${className}`}>
      {children}
    </div>
  );
};

interface BentoItemProps {
  children: React.ReactNode;
  className?: string;
  colSpan?: 1 | 2 | 3 | 4;
  rowSpan?: 1 | 2 | 3;
  id?: string;
}

export const BentoItem: React.FC<BentoItemProps> = ({ 
  children, 
  className = "", 
  colSpan = 1, 
  rowSpan = 1,
  id
}) => {
  const colSpanClass = {
    1: "col-span-1",
    2: "col-span-1 md:col-span-2",
    3: "col-span-1 md:col-span-3",
    4: "col-span-1 md:col-span-3 lg:col-span-4",
  }[colSpan];

  const rowSpanClass = {
    1: "row-span-1",
    2: "row-span-1 md:row-span-2",
    3: "row-span-1 md:row-span-3",
  }[rowSpan];

  return (
    <div 
      id={id}
      className={`
        ${colSpanClass} ${rowSpanClass} 
        bg-white 
        rounded-3xl
        border border-stone-200
        p-8 relative group flex flex-col
        hover:border-orange-300
        transition-all duration-300 ease-out
        ${className}
      `}
    >
      {children}
    </div>
  );
};