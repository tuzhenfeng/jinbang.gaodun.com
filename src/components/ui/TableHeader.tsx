import React from 'react';

interface TableHeaderProps {
  children: React.ReactNode;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

const TableHeader: React.FC<TableHeaderProps> = ({ 
  children, 
  className = '',
  align = 'left',
  ...props 
}) => {
  const alignment = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  }[align];

  return (
    <th
      scope="col"
      className={`px-6 py-3 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${alignment} ${className}`}
      {...props}
    >
      {children}
    </th>
  );
};

export default TableHeader;
