import React from 'react';

interface TableRowProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const TableRow: React.FC<TableRowProps> = ({ 
  children, 
  className = '',
  hover = true,
  ...props 
}) => {
  return (
    <tr 
      className={`${hover ? 'hover:bg-gray-50 dark:hover:bg-gray-700' : ''} ${className}`}
      {...props}
    >
      {children}
    </tr>
  );
};

export default TableRow;
